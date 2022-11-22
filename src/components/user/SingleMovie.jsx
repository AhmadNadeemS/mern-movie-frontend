import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getSingleMovie } from "../../api/movie";
import { useAuth, useNotification } from "../../hooks";
import { convertReviewCount } from "../../utils/helper";
import Container from "../Container";
import CustomButtonLink from "../CustomButtonLink";
import AddRatingModal from "../modals/AddRatingModal";
import ProfileModal from "../modals/ProfileModal";
import RatingStar from "../RatingStar";
import RelatedMovies from "../RelatedMovies";

export default function SingleMovie() {
  const [movie, setMovie] = useState({});
  //   le.log(movie);
  const [ready, setReady] = useState(false);
  const [showRatingModal, setShowRatingModal] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [selectedProfile, setSelectedProfile] = useState({});
  const { movieId } = useParams();
  const { updateNotification } = useNotification();
  const { user } = useAuth();
  const navigate = useNavigate();
  const fetchMovie = async () => {
    setReady(false);
    const { error, movie } = await getSingleMovie(movieId);
    if (error) return updateNotification("error", error);
    setReady(true);
    setMovie(movie);
  };

  //   console.log(movie);

  useEffect(() => {
    if (movieId) fetchMovie();
  }, [movieId]);

  const convertDate = (date) => {
    return date.split("T")[0];
  };

  const handleOnRateMovie = () => {
    if (!user) return navigate("/auth/sign-in");
    setShowRatingModal(true);
  };

  const hideRatingModal = () => {
    setShowRatingModal(false);
  };

  const handleProfileModal = () => {
    setShowProfileModal(true);
  };

  const handleProfileClick = (profile) => {
    setSelectedProfile(profile);
    setShowProfileModal(true);
  };
  const hideProfileModal = () => {
    setShowProfileModal(false);
  };

  const handleOnRatingSuccess = (reviews) => {
    setMovie({ ...movie, reviews: { ...reviews } });
  };
  if (!ready)
    return (
      <div className="h-screen flex justify-center items-center bg-white dark:bg-primary">
        <p className="text-light-subtle dark:text-dark-subtle animate-pulse">
          Please Wait...
        </p>
      </div>
    );
  const {
    id,
    storyLine,
    trailer,
    poster,
    title,
    reviews = {},
    director = {},
    writers = [],
    cast = [],
    genres = [],
    language,
    releaseDate,
    type,
  } = movie;

  //   console.log(movie);
  return (
    <div className="dark:bg-primary bg-white min-h-screen pb-10">
      <Container className="xl:px-0 px-2">
        <video poster={poster} controls src={trailer}></video>
        <div className="flex justify-between">
          <h1 className="xl:text-4xl lg:3xl text-2xl text-highlight dark:text-highlight-dark font-semibold py-3">
            {title}
          </h1>
          <div className="flex flex-col items-end">
            <RatingStar rating={reviews.ratingAvg} />
            <CustomButtonLink
              label={convertReviewCount(reviews.reviewCount) + " Reviews"}
              onClick={() => navigate("/movie/reviews/" + id)}
            />
            <CustomButtonLink
              label="Rate The Movie"
              onClick={handleOnRateMovie}
            />
            {/* <Link
              className="hover:underline text-highlight dark:text-highlight-dark"
              to={"movie/reviews/" + id}
            >
              {convertReviewCount(reviews.reviewCount)} Reviews{" "}
            </Link> */}
            {/* <button
              type="button"
              onClick={handleOnRateMovie}
              className="hover:underline text-highlight dark:text-highlight-dark"
            >
              Rate The Movie
            </button> */}
          </div>
        </div>
        <div className="space-y-3">
          <p className="text-light-subtle dark:text-dark-subtle">{storyLine}</p>
          {/* <div className="flex space-x-2">
            <p className="text-light-subtle dark:text-dark-subtle font-semibold">
              Director:
            </p>
            <p className="hover:underline text-highlight dark:text-highlight-dark cursor-pointer">
              {director.name}
            </p>
          </div> */}
          <ListWithLabel label="Director:">
            <CustomButtonLink
              label={director.name}
              onClick={() => handleProfileClick(w)}
            />
          </ListWithLabel>
          {/* <div className="flex">
            <p className="text-light-subtle dark:text-dark-subtle font-semibold mr-2">
              Writers:
            </p>
            <div className="flex space-x-2">
              {writers.map((w) => {
                return (
                  <p
                    className="hover:underline text-highlight dark:text-highlight-dark cursor-pointer"
                    key={w.id}
                  >
                    {w.name}
                  </p>
                );
              })}
            </div>
          </div> */}
          <ListWithLabel label="Writers:">
            {writers.map((w) => (
              <CustomButtonLink
                onClick={() => handleProfileClick(w)}
                label={w.name}
                key={w.id}
              />
            ))}
          </ListWithLabel>

          {/* <div className="flex">
            <p className="text-light-subtle dark:text-dark-subtle font-semibold mr-2">
              Cast:
            </p>
            <div className="flex space-x-2">
              {cast.map((c) => {
                return c.leadActor ? (
                  <p
                    className="hover:underline text-highlight dark:text-highlight-dark cursor-pointer"
                    key={c.profile.id}
                  >
                    {c.profile.name}
                  </p>
                ) : null;
              })}
            </div>
          </div> */}

          <ListWithLabel label="Cast:">
            {cast.map(({ id, profile, leadActor }) => {
              return leadActor ? (
                <CustomButtonLink key={id} label={profile.name} />
              ) : null;
            })}
          </ListWithLabel>

          {/* <div className="flex space-x-2">
            <p className="text-light-subtle dark:text-dark-subtle font-semibold">
              Language:
            </p>
            <div className="space-x-2">
              <p className="hover:underline text-highlight dark:text-highlight-dark ">
                {language}
              </p>
            </div>
          </div> */}

          <ListWithLabel label="Language:">
            <CustomButtonLink label={language} clickable={false} />
          </ListWithLabel>
          {/*
          <div className="flex space-x-2">
            <p className="text-light-subtle dark:text-dark-subtle font-semibold">
              Release Date:
            </p>
            <div className="space-x-2">
              <p className="hover:underline text-highlight dark:text-highlight-dark ">
                {convertDate(releaseDate)}
              </p>
            </div>
          </div> */}

          <ListWithLabel label="Release Date:">
            <CustomButtonLink label={convertDate(releaseDate)} />
          </ListWithLabel>

          {/* <div className="flex">
            <p className="text-light-subtle dark:text-dark-subtle font-semibold mr-2">
              Genre:
            </p>
            <div className="flex space-x-2">
              {genres.map((g, index) => {
                return (
                  <p
                    className="hover:underline text-highlight dark:text-highlight-dark cursor-pointer"
                    key={index}
                  >
                    {g}
                  </p>
                );
              })}
            </div>
          </div> */}

          <ListWithLabel label="Genre:">
            {genres.map((g, index) => {
              return (
                <CustomButtonLink key={index} label={g}></CustomButtonLink>
              );
            })}
          </ListWithLabel>

          {/* <div className="flex space-x-2">
            <p className="text-light-subtle dark:text-dark-subtle font-semibold">
              Type:
            </p>
            <div className="space-x-2">
              <p className="hover:underline text-highlight dark:text-highlight-dark ">
                {type}
              </p>
            </div>
                  </div> */}

          <ListWithLabel label="Type:">
            <CustomButtonLink label={type} />
          </ListWithLabel>

          {/* <div className="mt-5">
            <h1 className="text-light-subtle dark:text-dark-subtle font-semibold text-2xl">
              Cast:
            </h1>
            <div className="flex flex-wrap space-x-4">
              {cast.map((c) => {
                return c.leadActor ? (
                  <div
                    key={c.profile.id}
                    className="flex flex-col items-center  basis-28 text-center mb-4
                    "
                  >
                    <img
                      className="w-24 h-24 aspect-square object-cover rounded-full"
                      src={c.profile.avatar}
                    />
                    <p className="hover:underline text-highlight dark:text-highlight-dark cursor-progress-pointer">
                      {c.profile.name}
                    </p>
                    <span className="text-light-subtle dark:text-dark-subtle font text-sm">
                      as
                    </span>
                    <p className="text-light-subtle dark:text-dark-subtle">
                      {c.roleAs}
                    </p>
                  </div>
                ) : null;
              })}
            </div>
          </div> */}
          <CastProfiles cast={cast} />
          <RelatedMovies movieId={id} />
        </div>
        {/* <div className="mt-3">
          <RelatedMovies movieId={id} />
        </div> */}
      </Container>
      <ProfileModal
        visible={showProfileModal}
        onClose={hideProfileModal}
        profileId={selectedProfile.id}
      />
      <AddRatingModal
        onClose={hideRatingModal}
        visible={showRatingModal}
        onSuccess={handleOnRatingSuccess}
      />
    </div>
  );
}

const ListWithLabel = ({ label, children }) => {
  return (
    <div className="flex space-x-2">
      <p className="text-light-subtle dark:text-dark-subtle font-semibold">
        {label}
      </p>
      {children}
    </div>
  );
};

const CastProfiles = ({ cast }) => {
  return (
    <div className="">
      <h1 className="text-light-subtle dark:text-dark-subtle font-semibold text-2xl">
        Cast:
      </h1>
      <div className="flex flex-wrap space-x-4 pt-2">
        {cast.map(({ roleAs, profile, id }) => {
          // return leadActor ? (
          return (
            <div
              key={id}
              className="flex flex-col items-center  basis-28 text-center "
            >
              <img
                className="w-24 h-24 aspect-square object-cover rounded-full"
                src={profile.avatar}
              />
              {/* <p className="hover:underline text-highlight dark:text-highlight-dark cursor-progress-pointer">
              {c.profile.name}
            </p> */}
              <CustomButtonLink clickable="false" label={profile.name} />
              <span className="text-light-subtle dark:text-dark-subtle font text-sm">
                as
              </span>
              <p className="text-light-subtle dark:text-dark-subtle">
                {roleAs}
              </p>
            </div>
          );
          // ) : null;
        })}
      </div>
    </div>
  );
};
