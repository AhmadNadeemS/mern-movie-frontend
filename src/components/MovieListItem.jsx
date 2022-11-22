import { useState } from "react";
import { BsBoxArrowUpRight, BsPencilSquare, BsTrash } from "react-icons/bs";
import { getMovieForUpdate } from "../api/actor";
import { useNotification } from "../hooks";
import { getPosters } from "../utils/helper";
import ConfirmModal from "./modals/ConfirmModal";
import UpdateMovie from "./modals/UpdateMovie";

const MovieListItem = ({ movie, afterDelete, afterUpdate }) => {
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [selectedMovieId, setSelectedMovieId] = useState(null);
  const [busy, setBusy] = useState(false);
  const { updateNotification } = useNotification();

  const handleOnDeleteConfirm = async () => {
    setBusy(true);
    const { message, error } = await deleteMovie(movie.id);
    setBusy(false);
    if (error) return updateNotification("error", error);
    hideConfirmModal();
    updateNotification("success", message);
    afterDelete(movie);
    // fetchMovies(currentPageNo);
  };
  //   const handleOnEditClick = () => {
  //     setShowUpdateModal(true);
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

  const handleOnEditClick = () => {
    setShowUpdateModal(true);
    setSelectedMovieId(movie.id);
  };
  const displayConfirmModal = () => {
    setShowConfirmModal(true);
  };
  const hideConfirmModal = () => setShowConfirmModal(false);

  const hideUpdateForm = () => setShowUpdateModal(false);

  const handleOnUpdate = (movie) => {
    afterUpdate(movie);
    setShowUpdateModal(false);
    setSelectedMovieId(null);
  };
  return (
    <>
      <MovieCard
        movie={movie}
        onDeleteClick={displayConfirmModal}
        onEditClick={handleOnEditClick}
      />
      <div className="p-0">
        <ConfirmModal
          visible={showConfirmModal}
          onClose={hideConfirmModal}
          onConfirm={handleOnDeleteConfirm}
          onCancel={handleOnCancelConfirm}
          busy={busy}
          title="Are you sure?"
          subTitle="This action will remove this movie permanently"
        />
        <UpdateMovie
          movieId={selectedMovieId}
          visible={showUpdateModal}
          onSuccess={handleOnUpdate}
          //   onClose={hideUpdateForm}
        />
      </div>
    </>
  );
};

const MovieCard = ({ movie, onDeleteClick, onEditClick, onOpenClick }) => {
  const { poster, title, genres = [], status, responsivePosters } = movie;

  return (
    <table className="w-full border-b">
      <tbody>
        <tr>
          <td>
            {" "}
            <div className="w-24">
              <img
                className="w-full aspect-video object-cover"
                src={getPosters(responsivePosters) || poster}
                alt=""
              />
            </div>
          </td>
          <td className="w-full pl-5">
            <div>
              <h1 className="text-lg text-primary dark:text-white font-semibold font-serif">
                {title}
              </h1>
              <div className="space-x-1">
                {genres.map((g, index) => {
                  return (
                    <span
                      key={g + index}
                      className="text-primary dark:text-white text-xs"
                    >
                      {g}
                    </span>
                  );
                })}
                {/* <span className="text-primary dark:text-white text-xs">
                  Drama
                </span> */}
              </div>
            </div>
          </td>
          <td className="px-5">
            <p className="text-primary dark:text-white">{status}</p>
          </td>
          <td>
            <div className="flex items-center space-x-3">
              <button
                onClick={onDeleteClick}
                type="button"
                className="text-primary dark:text-white"
              >
                <BsTrash />
              </button>
              <button
                onClick={onEditClick}
                type="button"
                className="text-primary dark:text-white"
              >
                <BsPencilSquare />
              </button>
              <button
                onClick={onOpenClick}
                type="button"
                className="text-primary dark:text-white"
              >
                <BsBoxArrowUpRight />
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default MovieListItem;
