import React, { useEffect, useState } from "react";
import { deleteMovie, getMovieForUpdate, getMovies } from "../api/actor";
import { useMovies, useNotification } from "../hooks";
import ConfirmModal from "./modals/ConfirmModal";
import UpdateMovie from "./modals/UpdateMovie";
import MovieListItem from "./MovieListItem";

const pageNo = 0;
const limit = 5;

export default function LatestUploads() {
  const [movies, setMovies] = useState([]);
  const [busy, setBusy] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const { updateNotification } = useNotification();
  const { fetchLatestUploads, latestUploads, fetchNextPage, fetchPrevPage } =
    useMovies();
  //   const fetchLatestUploads = async () => {
  //     const { error, movies } = await getMovies(pageNo, limit);
  //     if (error) return updateNotification("error", error);
  //     setMovies([...movies]);
  //   };
  const handleOnDeleteClick = (movie) => {
    setSelectedMovie(movie);
    setShowConfirmModal(true);
  };
  const hideConfirmModal = () => {
    setShowConfirmModal(false);
  };
  const hideUpdateModal = () => {
    setShowUpdateModal(false);
  };
  const handleOnEditClick = async ({ id }) => {
    const { movie, error } = await getMovieForUpdate(id);
    if (error) return updateNotification("error", error);
    setSelectedMovie(movie);
    setShowUpdateModal(true);
  };
  //   const handleOnDeleteConfirm = async () => {
  //     setBusy(true);
  //     const { error, message } = await deleteMovie(selectedMovie.id);
  //     setBusy(false);
  //     if (error) return updateNotification("error", error);
  //     updateNotification("success", message);
  //     fetchLatestUploads();
  //     hideConfirmModal();
  //   };

  const handleOnUpdate = async (movie) => {
    const updatedMovies = movies.map((m) => {
      if (m.id === movie.id) return movie;
      return m;
    });
    setMovies([...updatedMovies]);
  };

  const handleUIUpdate = () => {
    fetchLatestUploads();
  };

  const handleAfterDelete = () => {
    fetchLatestUploads();
  };

  useEffect(() => {
    fetchLatestUploads();
  }, []);
  return (
    <>
      <div className="dark:bg-secondary bg-white shadow dark:shadow p-5 col-span-2 rounded">
        <h1 className="text-primary dark:text-white mb-2 font-semibold text-2xl">
          Recent Uploads
        </h1>
        <div className="space-y-3">
          {latestUploads.map((movie) => {
            return (
              <MovieListItem
                movie={movie}
                key={movie.id}
                afterDelete={handleUIUpdate}
                afterUpdate={handleUIUpdate}
                // onDeleteClick={() => handleOnDeleteClick(movie)}
                // onEditClick={() => handleOnEditClick(movie)}
              />
            );
          })}
        </div>
        {/* <MovieListItem */}
        {/* // movie={{
        //   poster:
        //     "https://images.unsplash.com/photo-1658507165836-19ba97c737d3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&q=80",
        //   title: "Lorem ipsum dolor sit amet.",
        //   status: "public",
        //   genres: ["Action", "Comedy"],
        // }}
    //   /> */}
      </div>
      {/* <ConfirmModal
        visible={showConfirmModal}
        onClose={hideConfirmModal}
        title="Are you sure?"
        subTitle="This action will remove this movie permanently"
        busy={busy}
        onConfirm={handleOnDeleteConfirm}
      /> */}
      {/* <UpdateMovie
        visible={showUpdateModal}
        onClose={hideUpdateModal}
        initialState={selectedMovie}
        onSuccess={handleOnUpdate}
      /> */}
    </>
  );
}

// "https://images.unsplash.com/photo-1658507165836-19ba97c737d3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&q=80"
