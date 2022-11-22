import React from "react";

const commonPosterUI =
  "flex items-center justify-center border-dashed border aspect-video cursor-pointer border-light-subtle rounded";
export default function PosterSelector({
  name,
  selectedPoster,
  onChange,
  accept,
  className,
  label,
}) {
  return (
    <div>
      <input
        accept={accept}
        onChange={onChange}
        id={name}
        name={name}
        type="file"
        hidden
      />
      <label htmlFor={name}>
        {selectedPoster ? (
          <img
            className={commonPosterUI + " object-cover " + className}
            src={selectedPoster}
          />
        ) : (
          <PosterUI label={label} className={className} />
        )}
      </label>
    </div>
  );
}

const PosterUI = ({ label, className }) => {
  return (
    <div className={commonPosterUI + " " + className}>
      <span className="text-light-subtle">{label}</span>
    </div>
  );
};
