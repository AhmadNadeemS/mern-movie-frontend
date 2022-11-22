import React, { forwardRef, useEffect, useRef, useState } from "react";
import { commonInputClasses } from "../utils/theme";

export default function LiveSearch({
  results = [],
  renderItem = null,
  resultContainerStyle,
  selectedResultStyle,
  onChange = null,
  name = "",
  value = "",
  placeholder = "",
  onSelect = null,
  inputStyle,
  visible,
}) {
  const [displaySearch, setDisplaySearch] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState(-1);

  const handleOnFocus = () => {
    if (results.length) setDisplaySearch(true);
  };
  const handleOnBlur = () => {
    setTimeout(() => {
      closeSearch();
    }, 100);
  };

  const closeSearch = () => {
    setDisplaySearch(false);
    setFocusedIndex(-1);
  };

  const handleSelection = (selection) => {
    if (selection) onSelect(selection);
    closeSearch();
  };
  const handleKeyDown = ({ key }) => {
    let nextCount;

    const keys = ["ArrowUp", "ArrowDown", "Enter", "Escape"];
    if (!keys.includes(key)) return;

    if (key === "ArrowUp") {
      if (focusedIndex === -1) {
        return setFocusedIndex(results.length - 1);
      }
      nextCount = (focusedIndex + results.length - 1) % results.length;
    }
    if (key === "ArrowDown") {
      nextCount = (focusedIndex + 1) % results.length;
    }
    if (key === "Enter") {
      return handleSelection(results[focusedIndex]);
      //   return setDisplaySearch(false);
    }
    if (key === "Escape") return closeSearch();
    setFocusedIndex(nextCount);
  };
  const getInputStyle = () => {
    return inputStyle
      ? inputStyle
      : commonInputClasses + " border-2 rounded p-1 text-xl";
  };

  useEffect(() => {
    if (results.length) return setDisplaySearch(true);
    setDisplaySearch(false);
  }, [results.length]);
  //     if (visible) return setDisplaySearch(visible);
  //     setDisplaySearch(false);
  //   }, [visible]);
  return (
    <div className="relative">
      <input
        id={name}
        name={name}
        className={getInputStyle()}
        onFocus={handleOnFocus}
        onBlur={handleOnBlur}
        onKeyDown={handleKeyDown}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        autoComplete="off"
      />
      <SearchResults
        visible={displaySearch}
        results={results}
        focusedIndex={focusedIndex}
        onSelect={handleSelection}
        renderItem={renderItem}
        resultContainerStyle={resultContainerStyle}
        selectedResultStyle={selectedResultStyle}
      />
    </div>
  );
}

const SearchResults = ({
  visible,
  results = [],
  focusedIndex,
  onSelect,
  renderItem,
  resultContainerStyle,
  selectedResultStyle,
  //   renderItem,
}) => {
  const resultContainer = useRef();
  useEffect(() => {
    resultContainer.current?.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  }, [focusedIndex]);
  if (!visible) return null;
  return (
    <div className="absolute z-50 bg-white shadow-md top-10 left-0 right-0 p-2 overflow-auto max-h-64 space-y-2 custom-scroll-bar mt-1">
      {results.map((result, index) => {
        const getSelectedClass = () => {
          console.log(selectedResultStyle);
          return selectedResultStyle
            ? selectedResultStyle
            : "dark:bg-dark-subtle bg-light-subtle";
        };
        return (
          <ResultCard
            ref={index === focusedIndex ? resultContainer : null}
            key={result.id}
            item={result}
            renderItem={renderItem}
            resultContainerStyle={resultContainerStyle}
            selectedResultStyle={
              index === focusedIndex ? getSelectedClass() : ""
            }
            onClick={() => onSelect(result)}
          />
        );
      })}
    </div>
  );
};

const ResultCard = forwardRef((props, ref) => {
  const {
    item,
    renderItem,
    resultContainerStyle,
    selectedResultStyle,
    onClick,
  } = props;
  const getClasses = () => {
    if (resultContainerStyle) {
      return resultContainerStyle + " " + selectedResultStyle;
    }
    return (
      selectedResultStyle +
      " cursor-pointer rounded overflow-hidden hover:bg-light-subtle flex space-x-2"
    );
  };
  return (
    <div ref={ref} onClick={onClick} className={getClasses()}>
      {renderItem(item)}
    </div>
  );
});

{
  /* <img
          src={avatar}
          alt="avatar"
          className="w-16 h-16 object-cover rounded"
        />
        <p className="font-semibold">{name}</p> */
}
