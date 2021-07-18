import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import ProfileSvgWrapper from "./ProfileSvgWrapper";

const ErrorMessage = ({ message, onErrorHide }) => (
  <div className="mt-4 bg-red-500 text-white p-2 rounded w-full">
    <FontAwesomeIcon
      className="h-5 w-5 mt-1 mr-3 text-white"
      icon="minus-circle"
    />
    <span className="relative -top-0.5">{message}</span>
    {onErrorHide && (
      <button type="button" className="float-right" onClick={onErrorHide}>
        <ProfileSvgWrapper
          stroke="white"
          path={<path strokeWidth={2} d="M6 18L18 6M6 6l12 12" />}
        />
      </button>
    )}
  </div>
);

export default ErrorMessage;
