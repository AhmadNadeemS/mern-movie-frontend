import React from "react";
import { createContext, useState } from "react";

export const NotificationContext = createContext();

let timeoutId;
const NotificationProvider = ({ children }) => {
  const [classes, setClasses] = useState("");
  const [notification, setNotification] = useState("");
  const updateNotification = (type, value) => {
    if (timeoutId) clearTimeout(timeoutId);
    switch (type) {
      case "error":
        setClasses("bg-red-500");
        break;
      case "success":
        setClasses("bg-green-500");
        break;
      default:
        setClasses("bg-red-500");
    }
    setNotification(value);
    timeoutId = setTimeout(() => {
      setNotification("");
    }, 3000);
  };
  return (
    <NotificationContext.Provider value={{ updateNotification }}>
      {children}
      {notification && (
        <div className="fixed top-24 left-1/2  -translate-x-1/2 ">
          <div className="shadow-md shadow-gray-400 rounded">
            <p
              className={
                classes + " px-4 py-2 font-semibold text-white   rounded"
              }
            >
              {notification}
            </p>
          </div>
        </div>
      )}
      {/* )} */}
    </NotificationContext.Provider>
  );
};

export default NotificationProvider;
