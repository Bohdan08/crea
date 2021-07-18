import React from "react";

const SaveChangesButton = ({ onClick, disabled, style }) => (
  <button
    className={`bg-green-700 text-white py-2 px-3 rounded-sm w-24 hover:bg-green-600  ${style} ${
      disabled ? "cursor-not-allowed opacity-70 hover:bg-green-700" : ""
    }`}
    disabled={disabled}
    onClick={onClick}
  >
    Save
  </button>
);

export default SaveChangesButton;
