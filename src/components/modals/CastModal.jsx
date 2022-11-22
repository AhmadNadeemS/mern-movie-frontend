import React from "react";
import { AiOutlineCheck, AiOutlineClose } from "react-icons/ai";
import ModalContainer from "./ModalContainer";

export default function CastModal({
  casts = [],
  onClose,
  onRemoveClick,
  visible,
}) {
  return (
    <ModalContainer ignoreContainer onClose={onClose} visible={visible}>
      <div className="space-y-2 max-w-[30rem] max-h-[30rem] dark:bg-primary bg-white rounded overflow-auto p-2 custom-scroll-bar">
        {casts.map(({ profile, roleAs, leadActor }) => {
          const { id, name, avatar } = profile;
          return (
            <div
              key={id}
              className="flex space-x-3 drop-shadow-lg dark:bg-secondary bg-white rounded"
            >
              <img
                className="w-16 h-16 object-cover rounded aspect-square"
                src={avatar}
                alt={name}
              />
              <div className="flex flex-col justify-between w-full">
                <div>
                  <p className="font-semibold dark:text-white text-primary">
                    {name}
                  </p>
                  <p className="text-sm dark:text-dark-subtle text-light-subtle">
                    {roleAs}
                  </p>
                  {leadActor && (
                    <AiOutlineCheck className="text-light-subtle dark:text-dark-subtle" />
                  )}
                </div>
              </div>
              <button
                className="dark:text-white text-primary  hover:opacity-80 transition p-2"
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
