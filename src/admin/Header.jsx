import React, { useState, useEffect, useRef } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { BsFillSunFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import AppSearchForm from "../components/form/AppSearchForm";
import { useTheme } from "../hooks";
function Header({ onAddMovieClick, onAddActorClick }) {
  const { toggleTheme } = useTheme();
  const [showOptions, setShowOptions] = useState(false);

  const navigate = useNavigate();

  const options = [
    { title: "Add Movie", onClick: onAddMovieClick },
    { title: "Add Actor", onClick: onAddActorClick },
  ];

  const handleSearchSubmit = (query) => {
    if (!query.trim()) return;
    navigate("/search?title=" + query);
  };
  return (
    <div className="flex items-center justify-between  p-5">
      <AppSearchForm
        placeholder="Search Movies.."
        onSubmit={handleSearchSubmit}
      />
      <div className="flex items-center space-x-3">
        <button
          onClick={toggleTheme}
          className="dark:text-white text-light-subtle"
        >
          <BsFillSunFill size={24} />
        </button>
        <div className="relative">
          <button
            onClick={(e) => {
              if (!showOptions) {
                e.stopPropagation();
                setShowOptions(true);
              }
            }}
            className="flex items-center space-x-2 dark:text-dark-subtle text-light-subtle dark:border-dark-subtle border-light-subtle border-2 border-secondary hover:border-primary text-secondary font-semibold text-lg hover:opacity-80 transition rounded px-3 py-1"
          >
            <span>Create</span>
            <AiOutlinePlus />
          </button>
          <CreateOptions
            visible={showOptions}
            onClose={() => setShowOptions(false)}
            options={options}
          />
        </div>
      </div>
    </div>
  );
}

const CreateOptions = ({ visible, onClose, options }) => {
  const container = useRef();

  const containerID = "option-container";
  useEffect(() => {
    const handleClose = (e) => {
      if (!visible) return;
      if (container.current && !container.current.contains(e.target)) {
        container.current.classList.remove("animate-scale");
        container.current.classList.add("animate-scale-reverse");
      }
    };
    document.addEventListener("click", handleClose);
    return () => {
      document.removeEventListener("click", handleClose);
    };
  }, [visible]);
  if (!visible) return null;
  const handleClick = (fn) => {
    fn();
    onClose();
  };
  return (
    <div
      id={containerID}
      ref={container}
      className="absolute animate-scale right-0 z-50 top-12 flex rounded flex-col space-y-3 p-5 dark:bg-secondary bg-white drop-shadow-lg whitespace-nowrap"
      onAnimationEnd={(e) => {
        if (e.target.classList.contains("animate-scale-reverse")) onClose();
        e.target.classList.remove("animate-scale");
      }}
    >
      {/* <Option>Add Movie</Option>
      <Option>Add Actor</Option> */}
      {options.map(({ title, onClick }, index) => {
        return (
          <Option key={index} onClick={() => handleClick(onClick)}>
            {title}
          </Option>
        );
      })}
    </div>
  );
};

const Option = ({ children, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="dark:text-white text-secondary hover:opacity-80"
    >
      {children}
    </button>
  );
};

export default Header;
