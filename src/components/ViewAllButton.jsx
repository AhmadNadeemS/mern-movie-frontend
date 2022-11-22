const ViewAllBtn = ({ visible, children, onClick }) => {
  if (!visible) return null;
  return (
    <button
      type="button"
      onClick={onClick}
      className="text-primary dark:text-white"
    >
      {children}
    </button>
  );
};

export default ViewAllBtn;
