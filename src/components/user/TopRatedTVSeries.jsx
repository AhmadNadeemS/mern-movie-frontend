import React, { useEffect, useState } from "react";
import MovieList from "./MovieList";
import { useNotification } from "../../hooks";
import { getTopRatedMovies } from "../../api/movie";

function TopRatedTVSeries() {
  const { updateNotification } = useNotification();
  const [movies, setMovies] = useState([]);
  const fetchMovies = async () => {
    const { movies, error } = await getTopRatedMovies("Web Series");
    if (error) return updateNotification("error", error);
    setMovies([...movies]);
  };
  useEffect(() => {
    fetchMovies();
  }, []);
  return <MovieList movies={movies} title="Viewers Choice (Web Series)" />;
}

export default TopRatedTVSeries;
