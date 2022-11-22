import React from "react";
import { ImSpinner3 } from "react-icons/im";
import ModalContainer from "./ModalContainer";

export default function ConfirmModal({
  visible,
  onClose,
  busy,
  onConfirm,
  onCancel,
  title,
  subTitle,
}) {
  const commonClass = "px-3 py-1 text-white";
  if (!visible) return null;
  return (
    <ModalContainer visible={visible} onClose={onClose} ignoreContainer>
      <div className="dark:bg-primary bg-white rounded p-3">
        <h1 className="text-red-400 font-semibold text-2xl">{title}</h1>
        <p className="text-secondary dark:text-white text-sm">{subTitle}</p>

        <div className="flex items-center space-x-3 mt-3">
          {busy ? (
            <p className="flex items-center space-x-2 dark:text-white">
              <ImSpinner3 className="animate-spin" />
              <span>Please wait</span>
            </p>
          ) : (
            <>
              <button
                onClick={onConfirm}
                type="button"
                className={commonClass + " bg-red-400"}
              >
                Confirm
              </button>
              <button
                onClick={onCancel}
                type="button"
                className={commonClass + " bg-blue-400"}
              >
                Cancel
              </button>
            </>
          )}
        </div>
      </div>
    </ModalContainer>
  );
}
