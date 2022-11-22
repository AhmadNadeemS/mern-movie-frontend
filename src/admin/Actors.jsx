import React, { useEffect, useState } from "react";
import { BsBoxArrowUpRight, BsPencilSquare, BsTrash } from "react-icons/bs";
import { ImSpinner3 } from "react-icons/im";
import { useNavigate } from "react-router-dom";
import { deleteActor, getActors, searchActor } from "../api/actor";
import AppSearchForm from "../components/form/AppSearchForm";
import ConfirmModal from "../components/modals/ConfirmModal";
import UpdateActor from "../components/modals/UpdateActor";
import NextAndPrevButton from "../components/NextAndPrevButton";
import NotFoundText from "../components/NotFoundText";
import { useNotification, useSearch } from "../hooks";

let currentPageNo = 0;
let limit = 10;
export default function Actors() {
  const [actors, setActors] = useState([]);
  const [results, setResults] = useState([]);
  const [busy, setBusy] = useState(false);
  const [reachedToEnd, setReachedToEnd] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [selectedProfile, setSelectedProfile] = useState(null);
  const { handleSearch, resetSearch, resultNotFound } = useSearch();
  const { updateNotification } = useNotification();
  const navigate = useNavigate();

  const fetchActors = async (pageNo) => {
    const { profiles, error } = await getActors(pageNo, limit);
    if (error) return updateNotification("error", error);
    // if (!profiles.length) {
    if (!profiles.length && currentPageNo !== 0) {
      currentPageNo = pageNo - 1;
      return setReachedToEnd(true);
    }
    setActors([...profiles]);
  };

  const handleOnNextClick = () => {
    if (reachedToEnd) return;
    currentPageNo += 1;
    fetchActors(currentPageNo);
  };
  const handleOnPrevClick = () => {
    if (currentPageNo <= 0) return;
    if (reachedToEnd) setReachedToEnd(false);
    currentPageNo -= 1;
    fetchActors(currentPageNo);
  };
  const handleOnEditClick = (profile) => {
    setShowUpdateModal(true);
    setSelectedProfile(profile);
  };
  const handleOnDeleteClick = (profile) => {
    setShowConfirmModal(true);
    setSelectedProfile(profile);
  };
  const hideUpdateModal = () => {
    setShowUpdateModal(false);
  };
  const hideConfirmModal = () => {
    setShowConfirmModal(false);
  };
  const handleOnActorUpdate = (profile) => {
    const updatedActors = actors.map((actor) => {
      if (profile.id === actor.id) {
        return profile;
      }
      return actor;
      // fetchActors(currentPageNo);
    });

    setActors([...updatedActors]);
  };
  const handleOnSearch = (value) => {
    handleSearch(searchActor, value, setResults);
    // navigate("/search?title");
  };
  const handleSearchReset = () => {
    resetSearch();
    setResults([]);
  };
  const handleOnDeleteConfirm = async () => {
    setBusy(true);
    const { message, error } = await deleteActor(selectedProfile.id);
    setBusy(false);
    if (error) return updateNotification("error", error);
    updateNotification("success", message);
    hideConfirmModal();
    fetchActors(currentPageNo);
    // const updatedActors = actors.filter(
    //   (actor) => actor.id !== selectedProfile.id
    // );

    // setActors([...updatedActors]);
  };
  const handleOnCancelConfirm = () => {
    // resetSearch();
    //   setResults([]);
    hideConfirmModal();
  };
  useEffect(() => {
    fetchActors(currentPageNo);
  }, []);
  return (
    <>
      <div className="p-5">
        <div className="flex justify-end mb-5">
          <AppSearchForm
            placeholder="Search Actors.."
            onSubmit={handleOnSearch}
            showResetIcon={results.length || resultNotFound}
            onReset={handleSearchReset}
          />
        </div>

        <NotFoundText text="Record Not Found" visible={resultNotFound} />

        <div className="grid grid-cols-4 gap-5">
          {results.length || resultNotFound
            ? results.map((actor) => (
                <ActorProfile
                  profile={actor}
                  key={actor.id}
                  onEditClick={() => handleOnEditClick(actor)}
                  onDeleteClick={() => handleOnDeleteClick(actor)}
                />
              ))
            : actors.map((actor) => (
                <ActorProfile
                  profile={actor}
                  key={actor.id}
                  onEditClick={() => handleOnEditClick(actor)}
                  onDeleteClick={() => handleOnDeleteClick(actor)}
                />
              ))}
        </div>

        {!results.length && !resultNotFound ? (
          <NextAndPrevButton
            className="mt-5"
            onNextClick={handleOnNextClick}
            onPrevClick={handleOnPrevClick}
          />
        ) : null}
      </div>
      <ConfirmModal
        visible={showConfirmModal}
        onClose={hideConfirmModal}
        title="Are you sure?"
        subTitle="This action will remove this profile permanently"
        busy={busy}
        onConfirm={handleOnDeleteConfirm}
        onCancel={handleOnCancelConfirm}
      />
      <UpdateActor
        visible={showUpdateModal}
        onClose={hideUpdateModal}
        initialState={selectedProfile}
        onSuccess={handleOnActorUpdate}
      />
    </>
  );
}

const ActorProfile = ({ profile, onEditClick, onDeleteClick }) => {
  if (!profile) return null;
  const [showOptions, setShowOptions] = useState(false);

  const handleOnMouseEnter = () => {
    setShowOptions(true);
  };
  const handleOnMouseLeave = () => {
    setShowOptions(false);
  };
  let acceptedNameLength = 15;
  const getName = (name) => {
    if (name.length <= acceptedNameLength) return name;
    return name.substring(0, acceptedNameLength) + "...";
  };
  //   const [loading, setLoading] = useState(true);

  const { name, avatar, about = "" } = profile;
  return (
    <div className="bg-white dark:bg-secondary shadow dark:shadow rounded h-20 overflow-hidden">
      <div
        onMouseEnter={handleOnMouseEnter}
        onMouseLeave={handleOnMouseLeave}
        className="flex cursor-pointer items-start relative"
      >
        {/* <div style={{ display: loading ? "block" : "none" }}>
          {
            <ImSpinner3
              className="animate-spin text-yellow-400 mt-5 ml-1"
              size={40}
            />
          }
        </div> */}
        {/* <div style={{ display: loading ? "none" : "block" }}> */}
        <img
          //   onLoad={() => setLoading(false)}
          src={avatar}
          alt={name}
          className="w-20 aspect-square object-cover"
        />
        {/* </div> */}
        <div className="px-2 flex-1">
          <h1 className="text-xl text-primary dark:text-white whitespace-nowrap">
            {getName(name)}
          </h1>
          <p className="text-primary dark:text-white opacity-70">
            {about.substring(0, 43)}
          </p>
        </div>
        <Options
          visible={showOptions}
          onEditClick={onEditClick}
          onDeleteClick={onDeleteClick}
        />
      </div>
    </div>
  );
};

const Options = ({ visible, onEditClick, onDeleteClick }) => {
  if (!visible) return null;

  return (
    <div className="absolute inset-0 bg-primary bg-opacity-25 backdrop-blur-sm flex justify-center items-center space-x-5">
      {" "}
      <button
        onClick={onDeleteClick}
        type="button"
        className="text-primary  bg-white p-2 rounded-full hover:opacity-80 transition"
      >
        <BsTrash />
      </button>
      <button
        onClick={onEditClick}
        type="button"
        className="text-primary p-2 rounded-full bg-white hover:opacity-80 transition"
      >
        <BsPencilSquare />
      </button>
    </div>
  );
};
