import React from "react";
import { useParams } from "react-router-dom";
import { addReview } from "../../api/review";
import { useNotification } from "../../hooks";
import RatingForm from "../form/RatingForm";
import ModalContainer from "./ModalContainer";

export default function AddRatingModal({ visible, onClose, onSuccess }) {
  const { updateNotification } = useNotification();
  const { movieId } = useParams();

  const handleSubmit = async (data) => {
    const { message, reviews, error } = await addReview(movieId, data);
    console.log(error);
    if (error) return updateNotification("error", error);
    updateNotification("success", message);
    onSuccess(reviews);
    onClose();
  };

  return (
    <ModalContainer visible={visible} onClose={onClose} ignoreContainer>
      <RatingForm onSubmit={handleSubmit} />
    </ModalContainer>
  );
}
