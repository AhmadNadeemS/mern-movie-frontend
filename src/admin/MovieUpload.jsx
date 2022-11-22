import React, { useState } from "react";
import { AiOutlineCloudUpload, AiOutlinePlus } from "react-icons/ai";
import { FileUploader } from "react-drag-drop-files";
import { useAuth, useNotification } from "../hooks";
import MovieForm from "./MovieForm";
import ModalContainer from "../components/modals/ModalContainer";
export default function MovieUpload({ visible, onClose }) {
  const { updateNotification } = useNotification();
  const { uploadTrailer, uploadMovie } = useAuth();
  const [videoSelected, setVideoSelected] = useState(false);
  const [videoUploaded, setVideoUploaded] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [videoInfo, setVideoInfo] = useState({});
  const [busy, setBusy] = useState(false);
  const handleChange = (file) => {
    const formData = new FormData();
    formData.append("video", file);
    setVideoSelected(true);
    handleUploadTrailer(formData);
  };

  const resetState = () => {
    setVideoSelected(false);
    setVideoUploaded(false);
    setUploadProgress(0);
    setVideoInfo({});
  };

  const handleUploadTrailer = async (data) => {
    const { public_id, url, error } = await uploadTrailer(
      data,
      setUploadProgress
    );
    if (error) return updateNotification("error", error);
    setVideoUploaded(true);
    setVideoInfo({ url, public_id });
  };
  const handleTypeError = (error) => {
    updateNotification("error", error);
  };

  const getUploadProgressValue = () => {
    if (!videoUploaded && uploadProgress >= 100) {
      return "Processing";
    } else {
      return `Upload progress ${uploadProgress}%`;
    }
  };
  const handleSubmit = async (data) => {
    if (!videoInfo.url && videoInfo.public_id)
      return updateNotification("error", "Trailer is missing!");
    data.append("trailer", JSON.stringify(videoInfo));
    setBusy(true);
    const { error, movie } = await uploadMovie(data);
    setBusy(false);
    if (error) return updateNotification("error", error);
    updateNotification("error", "Movie added successfully.");
    resetState();
    onClose();
  };
  return (
    <ModalContainer visible={visible}>
      <div className="mb-5">
        <TrailerProgress
          visible={videoSelected && !videoUploaded}
          width={uploadProgress}
          message={getUploadProgressValue()}
        />
      </div>
      {!videoSelected ? (
        <>
          <UploadTrailer
            handleChange={handleChange}
            visible={!videoSelected}
            onTypeError={handleTypeError}
          />
        </>
      ) : (
        <MovieForm
          btnTitle="Upload"
          onSubmit={!busy ? handleSubmit : null}
          busy={busy}
        />
      )}
    </ModalContainer>
  );
}

const TrailerProgress = ({ visible, width, message }) => {
  if (!visible) return null;
  return (
    <div className="bg-white drop-shadow-lg rounded w-full p-3 pb-2">
      <div className="bg-light-subtle h-3 relative overflow-hidden">
        <div
          style={{ width: width + "%" }}
          className="left-0 absolute bg-secondary h-full"
        ></div>
      </div>
      <p className="mt-1 text-light-subtle font-semibold animate-pulse">
        {message}
      </p>
    </div>
  );
};

const UploadTrailer = ({ visible, handleChange }) => {
  if (!visible) return null;
  return (
    <div className="flex justify-center items-center h-full">
      <FileUploader types={["avi", "mp4"]} handleChange={handleChange}>
        <div className="border-dashed dashed border cursor-pointer w-48 h-48 rounded-full flex justify-center items-center border-light-subtle text-secondary flex-col">
          <AiOutlineCloudUpload size={80} />
          <p>Drop your files here!</p>
        </div>
      </FileUploader>
    </div>
  );
};
