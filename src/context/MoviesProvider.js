import React, { createContext, useState } from "react";
import { getMovies } from "../api/actor";
import { useNotification } from "../hooks";

export const MovieContext = createContext();

const limit = 10;
let currentPageNo = 0;

const MoviesProvider = ({ children }) => {
  const [movies, setMovies] = useState([]);
  const [latestUploads, setLatestUploads] = useState([]);
  const [reachedToEnd, setReachedToEnd] = useState(false);
  const { updateNotification } = useNotification();

  const fetchMovies = async (pageNo = currentPageNo) => {
    const { movies, error } = await getMovies(pageNo, limit);
    if (error) updateNotification("error", error);
    if (!movies.length && currentPageNo !== 0) {
      currentPageNo = pageNo - 1;
      return setReachedToEnd(true);
    }
    setMovies([...movies]);
  };

  const fetchLatestUploads = async (qty = 5) => {
    const { error, movies } = await getMovies(0, qty);
    if (error) return updateNotification("error", error);
    setLatestUploads([...movies]);
  };

  const fetchNextPage = () => {
    if (reachedToEnd) return;
    currentPageNo += 1;
    fetchMovies(currentPageNo);
  };
  const fetchPrevPage = () => {
    if (currentPageNo <= 0) return;
    if (reachedToEnd) setReachedToEnd(false);
    currentPageNo -= 1;
    fetchMovies(currentPageNo);
  };

  return (
    <MovieContext.Provider
      value={{
        movies,
        fetchMovies,
        fetchNextPage,
        fetchPrevPage,
        fetchLatestUploads,
        latestUploads,
      }}
    >
      {children}
    </MovieContext.Provider>
  );
};

export default MoviesProvider;
