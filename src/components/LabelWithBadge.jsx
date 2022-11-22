const LabelWithBadge = ({ children, htmlFor, badge }) => {
  const renderBadge = () => {
    if (!badge) return null;
    return (
      <span
        className="absolute text-white dark:bg-dark-subtle bg-light-subtle rounded-full w-5 h-5 top-0 right-0 flex justify-center text-xs items-center translate-x-3
        -translate-y-1"
      >
        {badge <= 9 ? badge : "9+"}
      </span>
    );
  };

  return (
    <div className="relative">
      <label
        htmlFor={htmlFor}
        className="text-light-subtle  dark:text-dark-subtle font-semibold "
      >
        {children}
      </label>
      {renderBadge()}
    </div>
  );
};

export default LabelWithBadge;
