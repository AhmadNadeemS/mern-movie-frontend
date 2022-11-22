import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { searchMovieForAdmin } from "../api/actor";
import MovieListItem from "../components/MovieListItem";
import NotFoundText from "../components/NotFoundText";
import { useNotification, useSearch } from "../hooks";

export default function SearchMovies() {
  const [searchParams] = useSearchParams();
  const [movies, setMovies] = useState([]);
  const [resultNotFound, setResultNotFound] = useState(false);
  const query = searchParams.get("title");
  const { updateNotification } = useNotification();
  //   const { handleSearch, resetSearch, resultNotFound } = useSearch();
  const SearchMovies = async (val) => {
    // handleSearch(searchMovieForAdmin, val, setMovies);
    const { results, error } = await searchMovieForAdmin(val);
    if (error) return updateNotification("error", error);
    if (!results.length) {
      setResultNotFound(true);
      return setMovies([]);
    }
    setResultNotFound(false);
    setMovies([...results]);
  };

  const handleAfterDelete = () => {
    const updatedMovies = movies.filter((m) => {
      if (m.id !== movie.id) return m;
    });
    setMovies([...updatedMovies]);
  };
  const handleAfterUpdate = (movie) => {
    const updatedMovies = movies.filter((m) => {
      if (m.id === movie.id) return movie;
      return m;
    });
    setMovies([...updatedMovies]);
  };

  useEffect(() => {
    if (query.trim()) SearchMovies(query);
  }, [query]);

  return (
    <div className="p-5 space-y-3">
      <NotFoundText text="Result Not Found!" visible={resultNotFound} />
      {!resultNotFound &&
        movies.map((movie) => {
          return (
            <MovieListItem
              movie={movie}
              key={movie.id}
              afterDelete={handleAfterDelete}
              afterUpdate={handleAfterUpdate}
            />
          );
        })}
    </div>
  );
}
