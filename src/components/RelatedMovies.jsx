import React, { useEffect, useState } from "react";
import { getRelatedMovies } from "../api/movie";
import { useNotification } from "../hooks";
import MovieList from "./user/MovieList";

export default function RelatedMovies({ movieId }) {
  const { updateNotification } = useNotification();
  const [movies, setMovies] = useState([]);

  const fetchRelatedMovies = async () => {
    const { error, movies } = await getRelatedMovies(movieId);
    console.log(movies);
    if (error) return updateNotification("error", error);
    setMovies([...movies]);
  };

  useEffect(() => {
    if (movieId) fetchRelatedMovies();
  }, [movieId]);
  return <MovieList title="Related Movies" movies={movies} />;
}
