import React from "react";
import GridContainer from "../../GridContainer";
import { AiFillStar } from "react-icons/ai";
import { Link } from "react-router-dom";
import RatingStar from "../RatingStar";
import { getPosters } from "../../utils/helper";

const trimTitle = (text = "") => {
  if (text.length <= 25) return text;
  return text.substring(0, 25) + "...";
};

export default function MovieList({ title, movies = [] }) {
  if (!movies.length) return null;
  return (
    <div>
      {title && (
        <h1 className="text-2xl dark:text-white text-secondary font-semibold mb-5">
          {title}
        </h1>
      )}
      <GridContainer>
        {movies.map((movie) => {
          return <ListItem movie={movie} key={movie.id} />;
        })}
      </GridContainer>
    </div>
  );
}

const ListItem = ({ movie }) => {
  const { poster, title, reviews, responsivePosters } = movie;
  return (
    <Link to={"/movie/" + movie.id}>
      <img
        className="aspect-video w-full object-cover"
        src={getPosters(responsivePosters) || poster}
        alt={title}
      />
      <h1
        className="text-lg dark:text-white text-secondary font-semibold"
        title={title}
      >
        {trimTitle(title)}
      </h1>
      {/* {reviews.ratingAvg ? (
        <p className="flex items-center space-x-1 text-highlight dark:text-highlight-dark">
          <span>{reviews?.ratingAvg}</span>
          <AiFillStar />
        </p>
      ) : (
        <p className="text-highlight dark:text-highlight-dark">No reviews</p>
      )} */}
      <RatingStar rating={reviews.ratingAvg} />
    </Link>
  );
};
