import React, { useEffect, useState } from "react";
import genres from "../../utils/genres";
import Submit from "../Submit";
import ModalContainer from "./ModalContainer";

export default function GenresModal({
  visible,
  onClose,
  onSubmit,
  previousSelection,
}) {
  const [selectedGenre, setSelectedGenre] = useState([]);

  const handleGenreSelector = (gen) => {
    let newGenres = [];
    if (selectedGenre.includes(gen)) {
      newGenres = selectedGenre.filter((genre) => genre !== gen);
    } else {
      newGenres = [...selectedGenre, gen];
    }
    setSelectedGenre([...newGenres]);
  };
  //   console.log(selectedGenre);
  const handleSubmit = () => {
    onSubmit(selectedGenre);
    onClose();
  };
  const handleClose = () => {
    setSelectedGenre(previousSelection);
    onClose();
  };
  // useEffect(() => {
  //   console.log("effect");
  //   setSelectedGenre(previousSelection);
  // }, []);

  return (
    <ModalContainer visible={visible} onClose={handleClose}>
      <div className="h-full flex flex-col justify-between">
        <div>
          <h1 className="text-2xl dark:text-white text-primary font-semibold text-center">
            Select Genres
          </h1>
          <div className="space-y-3">
            {genres.map((gen, index) => {
              return (
                <Genre
                  key={gen}
                  onClick={() => handleGenreSelector(gen)}
                  selected={selectedGenre.includes(gen)}
                >
                  {gen}
                </Genre>
              );
            })}
          </div>
        </div>
        <div className="w-56 self-end">
          <Submit value="select" onClick={handleSubmit} />
        </div>
      </div>
    </ModalContainer>
  );
}

const Genre = ({ children, selected, onClick }) => {
  const getSelectedStyle = () => {
    return selected
      ? "bg-light-subtle dark:bg-dark-subtle border-primary text-white dark:text-primary"
      : " dark:text-white text-primary";
  };
  return (
    <button
      onClick={onClick}
      className={
        getSelectedStyle() +
        " border-2 dark:border-dark-subtle border-light-subtle p-1 rounded mr-3"
      }
    >
      {children}
    </button>
  );
};
