import React, { useEffect, useState } from "react";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import Submit from "../Submit";

const createArray = (count) => {
  return new Array(count).fill("");
};

const ratings = createArray(10);
export default function RatingForm({ onSubmit, initialState, busy }) {
  const [selectedRatings, setSelectedRatings] = useState([]);
  const [content, setContent] = useState("");

  const handleMouseEnter = (index) => {
    const ratings = createArray(index + 1);
    setSelectedRatings([...ratings]);
  };

  const handleOnChange = (e) => {
    setContent(e.target.value);
  };

  const handleSubmit = (e) => {
    if (!selectedRatings.length) return;
    const data = {
      rating: selectedRatings.length,
      content,
    };
    onSubmit(data);
  };

  useEffect(() => {
    if (initialState) {
      setContent(initialState.content);
      setSelectedRatings(createArray(initialState.rating));
    }
  }, [initialState]);
  return (
    <div>
      <div className="p-5 dark:bg-primary bg-white rounded space-y-2">
        <div className="text-highlight dark:text-highlight-dark flex relative items-center">
          <StarsOutlined ratings={ratings} onMouseEnter={handleMouseEnter} />
          <div className="flex absolute items-center top-1/2 -translate-y-1/2">
            <StarsFilled
              ratings={selectedRatings}
              onMouseEnter={handleMouseEnter}
            />
          </div>
        </div>

        <textarea
          value={content}
          onChange={handleOnChange}
          className="w-full h-24 dark:text-white text-primary rounded bg-transparent border-2 resize-none outline-none p-2"
        ></textarea>
        <Submit busy={busy} value="Rate This Movie" onClick={handleSubmit} />
      </div>
    </div>
  );
}

const StarsOutlined = ({ ratings, onMouseEnter }) => {
  return ratings.map((_, index) => {
    return (
      <AiOutlineStar
        key={index}
        size={24}
        className="cursor-pointer"
        onMouseEnter={() => onMouseEnter(index)}
      />
    );
  });
};

const StarsFilled = ({ ratings, onMouseEnter }) => {
  return ratings.map((_, index) => {
    return (
      <AiFillStar
        key={index}
        size={24}
        className="cursor-pointer"
        onMouseEnter={() => onMouseEnter(index)}
      />
    );
  });
};
