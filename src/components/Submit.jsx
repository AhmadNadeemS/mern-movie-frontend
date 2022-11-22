// import React from "react";
// import { ImSpinner3 } from "react-icons/im";

// export default function Submit({ value, type, busy, onClick }) {
//   return (
//     <button
//       onClick={onClick}
//       className="bg-secondary w-full p-2 rounded text-white font-semibold text-lg h-10 flex items-center justify-center"
//       type={type || "submit"}
//     >
//       {busy ? <ImSpinner3 className="animate-spin" /> : value}
//     </button>
//   );
// }

import React from "react";
import { ImSpinner3 } from "react-icons/im";

export default function Submit({ value, busy, type, onClick }) {
  return (
    <button
      type={type || "submit"}
      className="w-full rounded dark:bg-white bg-secondary dark:text-secondary text-white hover:bg-opacity-90 transition font-semibold text-lg cursor-pointer h-10 flex items-center justify-center"
      onClick={onClick}
    >
      {busy ? <ImSpinner3 className="animate-spin" /> : value}
    </button>
  );
}
