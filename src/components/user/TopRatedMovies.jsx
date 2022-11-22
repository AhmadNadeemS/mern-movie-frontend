import React, { useEffect, useState } from "react";

import { getTopRatedMovies } from "../../api/movie";

import MovieList from "./MovieList";

import { useNotification } from "../../hooks";
function TopRatedMovies() {
  const { updateNotification } = useNotification();
  const [movies, setMovies] = useState([]);
  const fetchMovies = async () => {
    const { movies, error } = await getTopRatedMovies();
    if (error) return updateNotification("error", error);
    setMovies([...movies]);
    console.log(movies);
  };
  useEffect(() => {
    fetchMovies();
  }, []);
  return <MovieList movies={movies} title="Viewers Choice (Movies)" />;
}

export default TopRatedMovies;
