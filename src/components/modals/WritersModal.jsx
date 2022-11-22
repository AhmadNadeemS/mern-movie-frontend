import React from "react";
import { AiOutlineClose } from "react-icons/ai";
import ModalContainer from "./ModalContainer";

export default function WritersModal({
  profiles = [],
  visible,
  onClose,
  onRemoveClick,
}) {
  return (
    <ModalContainer ignoreContainer onClose={onClose} visible={visible}>
      <div className="space-y-2 max-w-[30rem] max-h-[30rem] bg-white rounded overflow-auto p-2 custom-scroll-bar">
        {profiles.map(({ id, name, avatar }) => {
          return (
            <div key={id} className="flex space-x-3">
              <img
                className="w-16 h-16 object-cover rounded aspect-square"
                src={avatar}
                alt={name}
              />
              <p className="font-semibold text-primary w-full flex items-center">
                {name}
              </p>
              <button
                className="text-primary  hover:opacity-80 transition p-2"
                onClick={() => onRemoveClick(id)}
              >
                <AiOutlineClose />
              </button>
            </div>
          );
        })}
      </div>
    </ModalContainer>
  );
}
