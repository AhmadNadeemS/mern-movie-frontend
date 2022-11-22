import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { searchPublicMovies } from "../../api/movie";
import { useNotification } from "../../hooks";
import Container from "../Container";
import NotFoundText from "../NotFoundText";
import MovieList from "./MovieList";
// import MovieListItem from "../components/MovieListItem";

export default function SearchMovies() {
  const [searchParams] = useSearchParams();
  const [movies, setMovies] = useState([]);
  const [resultNotFound, setResultNotFound] = useState(false);
  const query = searchParams.get("title");
  //   console.log(query);
  const { updateNotification } = useNotification();
  //   const { handleSearch, resetSearch, resultNotFound } = useSearch();
  const SearchMovies = async (val) => {
    // handleSearch(searchMovieForAdmin, val, setMovies);
    const { results, error } = await searchPublicMovies(val);
    if (error) return updateNotification("error", error);
    if (!results.length) {
      setResultNotFound(true);
      return setMovies([]);
    }
    setResultNotFound(false);
    setMovies([...results]);
  };

  useEffect(() => {
    if (query.trim()) {
      SearchMovies(query);
    }
  }, [query]);

  return (
    <div className="dark:bg-primary bg-white min-h-screen py-8">
      <Container className="px-2 xl:p-0">
        <NotFoundText text="Result Not Found!" visible={resultNotFound} />
        <MovieList movies={movies} />
      </Container>
    </div>
  );
}
