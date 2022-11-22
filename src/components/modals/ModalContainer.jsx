import React from "react";

export default function ModalContainer({
  children,
  visible,
  onClose,
  ignoreContainer,
}) {
  const handleClick = (e) => {
    if (e.target.id === "modal-container") onClose && onClose();
  };
  const renderChildren = () => {
    if (ignoreContainer) return children;
    return (
      <div className="w-[35rem] h-[30rem] dark:bg-primary bg-white rounded overflow-auto p-2 custom-scroll-bar space-x-4">
        {children}
      </div>
    );
  };

  if (!visible) return null;
  return (
    <div
      id="modal-container"
      onClick={handleClick}
      className="inset-0 fixed justify-center items-center flex backdrop-blur-sm  bg-primary dark:bg-white dark:bg-opacity-50 bg-opacity-80"
    >
      {renderChildren()}
    </div>
  );
}
