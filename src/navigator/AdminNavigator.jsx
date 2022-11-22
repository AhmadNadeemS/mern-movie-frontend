import { useState } from "react";
import { Route } from "react-router-dom";
import { Routes } from "react-router-dom";
import Actors from "../admin/Actors";
import Dashboard from "../admin/Dashboard";
import Header from "../admin/Header";
import Movies from "../admin/Movies";
import MovieUpload from "../admin/MovieUpload";
import Navbar from "../admin/Navbar";
import SearchMovies from "../admin/SearchMovies";
import ActorUpload from "../components/modals/ActorUpload";
import NotFound from "../components/NotFound";

function AdminNavigator() {
  const [showMovieUploadModal, setShowMovieUploadModal] = useState(false);
  const [showActorUploadModal, setShowActorUploadModal] = useState(false);

  const displayMovieUploadModal = () => {
    setShowMovieUploadModal(true);
  };

  const hideMovieUploadModal = () => {
    setShowMovieUploadModal(false);
  };

  const displayActorUploadModal = () => {
    setShowActorUploadModal(true);
  };

  const hideActorUploadModal = () => {
    setShowActorUploadModal(false);
  };
  return (
    <>
      <div className="flex dark:bg-primary bg-white">
        <Navbar />
        <div className="flex-1 max-w-screen-xl  border-2 border-red-400">
          <Header
            onAddActorClick={displayActorUploadModal}
            onAddMovieClick={displayMovieUploadModal}
          />
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/movies" element={<Movies />} />
            <Route path="/actors" element={<Actors />} />
            <Route path="/search" element={<SearchMovies />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </div>
      <MovieUpload
        visible={showMovieUploadModal}
        onClose={hideMovieUploadModal}
      />
      <ActorUpload
        visible={showActorUploadModal}
        onClose={hideActorUploadModal}
      />
    </>
  );
}

export default AdminNavigator;
