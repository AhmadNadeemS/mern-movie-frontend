import React, { useEffect, useState } from "react";
import { useNotification, useSearch } from "../hooks";
import CastForm from "../components/form/CastForm";
import CastModal from "../components/modals/CastModal";
import ModalContainer from "../components/modals/ModalContainer";
import WritersModal from "../components/modals/WritersModal";
import Submit from "../components/Submit";
import { commonInputClasses } from "../utils/theme";
import LiveSearch from "./LiveSearch";
import TagsInput from "./TagsInput";
import PosterSelector from "./PosterSelector";
import GenresSelector from "./GenresSelector";
import GenresModal from "../components/modals/GenresModal";
import genres from "../utils/genres";
import Selector from "../components/Selector";
import { languageOptions, statusOptions, typeOptions } from "../utils/options";
import { searchActor } from "../api/actor";
import { renderItem } from "../utils/helper";
import DirectorSelector from "../components/DirectorSelector";
import WritersSelector from "../components/WritersSelector";
import Label from "../components/Label";
import LabelWithBadge from "../components/LabelWithBadge";
import ViewAllBtn from "../components/ViewAllButton";
import { validateMovie } from "../utils/validator";

// export const results = [
//   {
//     id: "1",
//     avatar:
//       "https://images.unsplash.com/photo-1643713303351-01f540054fd7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&q=80",
//     name: "John Doe",
//   },
//   {
//     id: "2",
//     avatar:
//       "https://images.unsplash.com/photo-1643883135036-98ec2d9e50a1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&q=80",
//     name: "Chandri Anggara",
//   },
//   {
//     id: "3",
//     avatar:
//       "https://images.unsplash.com/photo-1578342976795-062a1b744f37?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&q=80",
//     name: "Amin RK",
//   },
//   {
//     id: "4",
//     avatar:
//       "https://images.unsplash.com/photo-1564227901-6b1d20bebe9d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&q=80",
//     name: "Edward Howell",
//   },
//   {
//     id: "5",
//     avatar:
//       "https://images.unsplash.com/photo-1578342976795-062a1b744f37?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&q=80",
//     name: "Amin RK",
//   },
//   {
//     id: "6",
//     avatar:
//       "https://images.unsplash.com/photo-1564227901-6b1d20bebe9d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&q=80",
//     name: "Edward Howell",
//   },
// ];

const defaultMovieInfo = {
  title: "",
  storyLine: "",
  tags: [],
  cast: [],
  director: {},
  writers: [],
  releaseDate: "",
  poster: null,
  genres: [],
  type: "",
  language: "",
  status: "",
};

export default function MovieForm({ onSubmit, busy, initialState, btnTitle }) {
  const [movieInfo, setMovieInfo] = useState({
    ...defaultMovieInfo,
  });
  const [showWritersModal, setShowWritersModal] = useState(false);
  const [showCastModal, setShowCastModal] = useState(false);
  const [showGenresModal, setShowGenresModal] = useState(false);
  const [selectedPosterForUI, setSelectedPosterForUI] = useState("");
  const [writerName, setWriterName] = useState("");
  const [directorProfile, setDirectorProfile] = useState([]);
  const [writerProfile, setWriterProfile] = useState([]);
  const { updateNotification } = useNotification();
  const { handleSearch, searching, results, resetSearch } = useSearch();
  const updatePosterForUI = (file) => {
    const url = URL.createObjectURL(file);
    setSelectedPosterForUI(url);
  };

  const handleChange = ({ target }) => {
    const { name, value, files } = target;
    if (name === "poster") {
      const file = files[0];
      updatePosterForUI(file);
      return setMovieInfo({ ...movieInfo, poster: file });
    }

    setMovieInfo({ ...movieInfo, [name]: value });
  };

  const updateTags = (tags) => {
    //   const { name } = target;
    setMovieInfo({ ...movieInfo, tags });
  };

  const updateDirector = (profile) => {
    setMovieInfo({ ...movieInfo, director: profile });
  };

  const updateWriters = (profile) => {
    const { writers } = movieInfo;
    for (let writer of writers) {
      if (writer.id === profile.id) {
        return updateNotification(
          "warning",
          "This profile is already selected!"
        );
      }
    }
    setMovieInfo({
      ...movieInfo,
      writers: [...writers, profile],
    });
  };

  const updateCast = (castInfo) => {
    const { cast } = movieInfo;
    setMovieInfo({ ...movieInfo, cast: [...cast, castInfo] });
  };

  const updateGenre = (genres) => {
    // const { genres } = movieInfo;
    setMovieInfo({ ...movieInfo, genres });
  };

  const displayWritersModal = () => {
    setShowWritersModal(true);
  };

  const hideWritersModal = () => {
    setShowWritersModal(false);
  };

  const displayCastModal = () => {
    setShowCastModal(true);
  };

  const hideCastModal = () => {
    setShowCastModal(false);
  };

  const displayGenresModal = () => {
    setShowGenresModal(true);
  };

  const hideGenresModal = () => {
    setShowGenresModal(false);
  };

  const handleWriterRemove = (profileId) => {
    const { writers } = movieInfo;
    const newWriters = writers.filter(({ id }) => id !== profileId);
    if (!newWriters.length) hideWritersModal();
    setMovieInfo({ ...movieInfo, writers: [...newWriters] });
  };

  const handleCastRemove = (profileId) => {
    const { cast } = movieInfo;
    const newCast = cast.filter(({ profile }) => profile.id !== profileId);
    if (!newCast.length) hideCastModal();
    setMovieInfo({ ...movieInfo, cast: [...newCast] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { error } = validateMovie(movieInfo);
    if (error) return updateNotification("error", error);
    const { tags, genres, cast, writers, director } = movieInfo;
    const formData = new FormData();
    const finalMovieInfo = { ...movieInfo };
    finalMovieInfo.genres = JSON.stringify(genres);
    finalMovieInfo.tags = JSON.stringify(tags);
    if (writers.length) {
      const finalWriters = writers.map((w) => w.id);
      finalMovieInfo.writers = JSON.stringify(finalWriters);
    }
    if (director.id) {
      finalMovieInfo.director = director.id;
    }
    const finalCast = cast.map((c) => ({
      actor: c.profile.id,
      roleAs: c.roleAs,
      leadActor: c.leadActor,
    }));
    finalMovieInfo.cast = JSON.stringify(finalCast);
    for (let key in movieInfo) {
      formData.append(key, finalMovieInfo[key]);
    }
    onSubmit(formData);
  };

  const handleProfileChange = ({ target }) => {
    const { name, value } = target;
    if (name === "director") {
      setMovieInfo({ ...movieInfo, director: { name: value } });
      handleSearch(searchActor, value, setDirectorProfile);
    }
    if (name === "writers") {
      setWriterName(value);
      handleSearch(searchActor, value, setWriterProfile);
    }
  };

  useEffect(() => {
    if (initialState) {
      setMovieInfo({
        ...initialState,
        releaseDate: initialState.releaseDate.split("T")[0],
        poster: null,
      });
      setSelectedPosterForUI(initialState.poster);
    }
  }, [initialState]);

  const {
    title,
    storyLine,
    director,
    writers,
    cast,
    genres,
    type,
    language,
    status,
    tags,
    releaseDate,
  } = movieInfo;
  return (
    <>
      <div className="flex space-x-3">
        <div className="w-[70%] space-y-5">
          <div>
            <Label htmlFor="title">Title</Label>
            <input
              name="title"
              onChange={handleChange}
              value={title}
              type="text"
              className={
                commonInputClasses + " border-b-2  font-semibold text-xl"
              }
              placeholder="Titanic"
            />
          </div>
          <div>
            <Label htmlFor="storyLine">Story Line</Label>
            <textarea
              name="storyLine"
              onChange={handleChange}
              value={storyLine}
              className={commonInputClasses + " resize-none border-b-2 h-24"}
            ></textarea>
          </div>
          <div>
            <Label htmlFor="tags">Tags</Label>
            <TagsInput name="tags" onChange={updateTags} value={tags} />
          </div>
          <DirectorSelector onSelect={updateDirector} values={director.name} />
          <div>
            <div className="flex justify-between">
              <LabelWithBadge htmlFor="writers" badge={writers.length}>
                Writers
              </LabelWithBadge>
              <ViewAllBtn
                visible={writers.length}
                onClick={displayWritersModal}
              >
                View All
              </ViewAllBtn>
            </div>
            <WritersSelector onSelect={updateWriters} />
          </div>
          <div>
            <div className="flex justify-between">
              <LabelWithBadge htmlFor="writers" badge={cast.length}>
                Add Cast & Crew
              </LabelWithBadge>
              <ViewAllBtn visible={cast.length} onClick={displayCastModal}>
                View All
              </ViewAllBtn>
            </div>
            <CastForm onSubmit={updateCast} />
          </div>
          <input
            type="date"
            name="releaseDate"
            value={releaseDate}
            onChange={handleChange}
            className={commonInputClasses + " border-2 rounded p-1 w-auto"}
          />
          <Submit
            value={btnTitle}
            onClick={handleSubmit}
            type="button"
            busy={busy}
          />
        </div>
        <div className="w-[30%] space-y-5">
          <PosterSelector
            name="poster"
            label="Select poster"
            onChange={handleChange}
            selectedPoster={selectedPosterForUI}
            accept="image/jpg ,image/jpeg, image/png"
          />
          <GenresSelector onClick={displayGenresModal} badge={genres.length} />
          <Selector
            onChange={handleChange}
            options={typeOptions}
            label="Type"
            name="type"
            value={type}
          />
          <Selector
            onChange={handleChange}
            options={languageOptions}
            label="Language"
            name="language"
            value={language}
          />
          <Selector
            onChange={handleChange}
            options={statusOptions}
            label="Status"
            name="status"
            value={status}
          />
        </div>
      </div>
      <WritersModal
        visible={showWritersModal}
        onClose={hideWritersModal}
        onRemoveClick={handleWriterRemove}
        profiles={writers}
      />
      <CastModal
        visible={showCastModal}
        onClose={hideCastModal}
        onRemoveClick={handleCastRemove}
        casts={cast}
      />
      <GenresModal
        visible={showGenresModal}
        onClose={hideGenresModal}
        onSubmit={updateGenre}
        previousSelection={genres}
      />
    </>
  );
}
