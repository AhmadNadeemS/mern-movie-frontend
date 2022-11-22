import React, { useEffect, useState } from "react";
import { BsTrash, BsPencilSquare } from "react-icons/bs";
import { useParams } from "react-router-dom";
import { deleteReview, getReviewByMovie } from "../../api/review";
import { useAuth, useNotification } from "../../hooks";
import Container from "../Container";
import CustomButtonLink from "../CustomButtonLink";
import ConfirmModal from "../modals/ConfirmModal";
import EditRatingModal from "../modals/EditRatingModal";
import NotFoundText from "../NotFoundText";
import RatingStar from "../RatingStar";

const getNameInitial = (name = "") => {
  return name[0].toUpperCase();
};

export default function MovieReviews() {
  const { movieId } = useParams();
  const { updateNotification } = useNotification();
  const [reviews, setReviews] = useState([]);
  const [movieTitle, setMovieTitle] = useState("");
  const [profileOwnerReview, setProfileOwnerReview] = useState(null);
  const [selectedReview, setSelectedReview] = useState(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [busy, setBusy] = useState(false);
  const { user } = useAuth();
  const profileId = user?.id;

  const fetchReviews = async () => {
    const { error, movie } = await getReviewByMovie(movieId);
    if (error) return updateNotification("error", error);
    setReviews([...movie.reviews]);
    setMovieTitle(movie.title);
  };
  const getUserReview = () => {
    if (profileOwnerReview) return setProfileOwnerReview(null);
    const matched = reviews.find(({ owner }) => owner.id === profileId);
    if (!matched)
      return updateNotification("error", "You don't have any review!");
    setProfileOwnerReview(matched);
  };
  const displayConfirmModal = () => {
    setShowConfirmModal(true);
  };

  const hideConfirmModal = () => {
    setShowConfirmModal(false);
  };

  const handleOnEditClick = () => {
    const { id, rating, content } = profileOwnerReview;
    setSelectedReview({
      id,
      content,
      rating,
    });
    setShowEditModal(true);
  };

  const handleOnReviewUpdate = (review) => {
    const updatedReview = {
      ...profileOwnerReview,
      content: review.content,
      rating: review.rating,
    };
    setProfileOwnerReview({ ...updatedReview });
    const newReviewList = reviews.map((review) => {
      if (review.id === updatedReview.id) {
        return updatedReview;
      } else {
        return review;
      }
    });

    setReviews([...newReviewList]);
  };
  const hideEditModal = () => {
    setShowEditModal(false);
  };

  const handleDeleteConfirm = async () => {
    setBusy(true);
    const { error, message } = await deleteReview(profileOwnerReview.id);
    setBusy(false);
    if (error) return updateNotification("error", error);
    updateNotification("success", message);
    const updatedReviews = reviews.filter(
      (r) => r.id !== profileOwnerReview.id
    );
    setReviews([...updatedReviews]);
    setProfileOwnerReview(null);
    hideConfirmModal();
  };

  useEffect(() => {
    if (movieId) fetchReviews();
  }, [movieId]);
  return (
    <div className="bg-white min-h-screen pb-10 dark:bg-primary">
      <Container className="xl:px-0 px-2">
        <div className="flex justify-between items-center">
          <h1 className="font-semibold text-2xl dark:text-white text-secondary">
            <span className="text-light-subtle dark:text-dark-subtle font-normal">
              Reviews for:
            </span>{" "}
            {movieTitle}
          </h1>
          {user && (
            <CustomButtonLink
              onClick={getUserReview}
              label={profileOwnerReview ? "View All" : "Find my reviews"}
            />
          )}
        </div>

        <NotFoundText text="No Reviews !" visible={!reviews.length} />

        {profileOwnerReview ? (
          <div>
            <ReviewCard review={profileOwnerReview} />
            <div className="flex space-x-3 dark:text-white text-primary text-xl p-3">
              <button type="button" onClick={displayConfirmModal}>
                <BsTrash />
              </button>
              <button type="button">
                <BsPencilSquare onClick={handleOnEditClick} />
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-3 mt-3">
            {reviews.map((review) => {
              return <ReviewCard review={review} key={review.id} />;
            })}
          </div>
        )}
      </Container>
      <ConfirmModal
        visible={showConfirmModal}
        onCancel={hideConfirmModal}
        onConfirm={handleDeleteConfirm}
        busy={busy}
        title="Are you sure?"
        subTitle="This action will remove this review permanently."
      />
      <EditRatingModal
        visible={showEditModal}
        onClose={hideEditModal}
        initialState={selectedReview}
        onSuccess={handleOnReviewUpdate}
      />
    </div>
  );
}

const ReviewCard = ({ review }) => {
  if (!review) return null;
  const { owner, content, rating } = review;
  return (
    <div className="flex space-x-3">
      <div className="flex items-center justify-center w-14 h-14 rounded-full bg-light-subtle dark:bg-dark-subtle text-white text-xl select-none">
        {getNameInitial(owner.name)}
      </div>
      <div>
        <h1 className="dark:text-white text-secondary font-semibold text-lg">
          {owner.name}
        </h1>
        <RatingStar rating={rating} />
        <p className="text-light-subtle dark:text-dark-subtle">{content}</p>
      </div>
    </div>
  );
};
