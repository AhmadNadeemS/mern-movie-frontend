import React, { useEffect, useState } from "react";
import { deleteMovie, getMovieForUpdate, getMovies } from "../api/actor";
import ConfirmModal from "../components/modals/ConfirmModal";
import UpdateMovie from "../components/modals/UpdateMovie";
import MovieListItem from "../components/MovieListItem";
import NextAndPrevButton from "../components/NextAndPrevButton";
import { useMovies, useNotification } from "../hooks";

const limit = 10;
let currentPageNo = 0;

export default function Movies() {
  const [movies, setMovies] = useState([]);
  const [reachedToEnd, setReachedToEnd] = useState(false);
  const [busy, setBusy] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const { updateNotification } = useNotification();
  const {
    fetchMovies,
    movies: newMovies,
    fetchNextPage,
    fetchPrevPage,
  } = useMovies();
  //   const fetchMovies = async (pageNo) => {
  //     const { movies, error } = await getMovies(pageNo, limit);
  //     if (!movies.length && currentPageNo !== 0) {
  //       currentPageNo = pageNo - 1;
  //       return setReachedToEnd(true);
  //     }
  //     setMovies([...movies]);
  //   };

  //   const handleOnNextClick = () => {
  //     if (reachedToEnd) return;
  //     currentPageNo += 1;
  //     fetchMovies(currentPageNo);
  //   };
  //   const handleOnPrevClick = () => {
  //     if (currentPageNo <= 0) return;
  //     if (reachedToEnd) setReachedToEnd(false);
  //     currentPageNo -= 1;
  //     fetchMovies(currentPageNo);
  //   };

  //   const handleOnEditClick = async (profile) => {
  //     const { movie, error } = await getMovieForUpdate(profile.id);
  //     if (error) return updateNotification("error", error);
  //     setSelectedMovie(movie);
  //     setShowUpdateModal(true);
  //   };

  //   const handleOnDeleteClick = (movie) => {
  //     setSelectedMovie(movie);
  //     setShowConfirmModal(true);
  //   };

  const handleOnUpdate = (movie) => {
    const updatedMovies = movies.map((m) => {
      if (m.id === movie.id) return movie;
      return m;
    });
    setMovies([...updatedMovies]);
  };

  //   const handleOnDeleteConfirm = async () => {
  //     setBusy(true);
  //     const { message, error } = await deleteMovie(selectedMovie.id);
  //     setBusy(false);
  //     if (error) return updateNotification("error", error);
  //     updateNotification("success", message);
  //     hideConfirmModal();
  //     fetchMovies(currentPageNo);
  //   };
  const handleOnCancelConfirm = async () => {
    hideConfirmModal();
    // setBusy(true);
    // const { message, error } = await deleteMovie(selectedMovie.id);
    // setBusy(false);
    // if (error) return updateNotification("error", error);
    // updateNotification("success", message);
    // hideConfirmModal();
    // fetchMovies(currentPageNo);
  };

  const hideUpdateForm = () => setShowUpdateModal(false);

  const hideConfirmModal = () => {
    setShowConfirmModal(false);
  };
  const handleUIUpdate = () => {
    fetchMovies();
  };
  const handleAfterUpdate = () => {
    fetchMovies();
  };
  useEffect(() => {
    fetchMovies();
  }, []);
  return (
    <>
      <div className="space-y-3 p-5 ">
        {newMovies.map((movie) => {
          return (
            <MovieListItem
              key={movie.id}
              movie={movie}
              afterDelete={handleUIUpdate}
              afterUpdate={handleUIUpdate}
              //   onEditClick={() => handleOnEditClick(movie)}
              //   onDeleteClick={() => handleOnDeleteClick(movie)}
            />
          );
        })}
        <NextAndPrevButton
          onPrevClick={fetchPrevPage}
          onNextClick={fetchNextPage}
        />
      </div>
      {/* <ConfirmModal
        visible={showConfirmModal}
        onClose={hideConfirmModal}
        onConfirm={handleOnDeleteConfirm}
        onCancel={handleOnCancelConfirm}
        busy={busy}
        title="Are you sure?"
        subTitle="This action will remove this movie permanently"
      /> */}
      {/* <UpdateMovie
        visible={showUpdateModal}
        initialState={selectedMovie}
        onSuccess={handleOnUpdate}
        onClose={hideUpdateForm}
      /> */}
    </>
  );
}
