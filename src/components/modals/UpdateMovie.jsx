import React, { useEffect, useState } from "react";
import MovieForm from "../../admin/MovieForm";
import { getMovieForUpdate, updateMovie } from "../../api/actor";
import { useNotification } from "../../hooks";
import ModalContainer from "./ModalContainer";

export default function UpdateMovie({ visible, onSuccess, movieId }) {
  const [busy, setBusy] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [ready, setReady] = useState(false);

  const { updateNotification } = useNotification();

  const fetchMoviesToUpdate = async () => {
    const { movie, error } = await getMovieForUpdate(movieId);
    if (error) return updateNotification("error", error);
    setSelectedMovie(movie);
    setReady(true);
  };

  useEffect(() => {
    if (movieId) fetchMoviesToUpdate();
  }, [movieId]);

  const handleSubmit = async (data) => {
    setBusy(true);
    const { error, movie, message } = await updateMovie(movieId, data);
    if (error) return updateNotification("error", error);
    updateNotification("success", message);
    setBusy(false);
    onSuccess(movie);
    // onClose();
  };
  return (
    <ModalContainer visible={visible}>
      {ready ? (
        <MovieForm
          initialState={selectedMovie}
          btnTitle="Update"
          onSubmit={!busy ? handleSubmit : null}
          busy={busy}
        />
      ) : (
        <div className="w-full h-full justify-center items-center flex ">
          <p className="text-light-subtle dark:text-dark-subtle animate-pulse text-xl">
            Please wait...
          </p>
        </div>
      )}
    </ModalContainer>
  );
}
