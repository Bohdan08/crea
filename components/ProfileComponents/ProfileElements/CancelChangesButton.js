import React from "react";

const CancelChangesButton = ({ onClick, style }) => (
  <button
    className={`bg-blue-700 text-white py-2 px-3 rounded-sm w-24 hover:bg-blue-600 ${style}`}
    onClick={onClick}
  >
    Cancel
  </button>
);

export default CancelChangesButton;
