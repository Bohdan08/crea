import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";

const StyledInputContainer = styled.div`
  height: 40px;
`;

const ProfileInputContainer = ({
  id,
  iconName,
  onChangeInput,
  validationError,
  labelName,
  value,
  inputType,
  required,
  disabled,
  containerStyles = "",
  maxLength,
}) => {
  return (
    <div
      className={`text-lg  ${containerStyles} ${disabled ? "opacity-60" : ""} `}
    >
      <label className={`${required ? "required" : ""}`} htmlFor={id}>
        {labelName}
      </label>
      <StyledInputContainer
        className={`flex flex-row justify-between border rounded-sm mt-1 mb-2 ${
          validationError ? "border-red-600" : ""
        }`}
        id={id}
      >
        <FontAwesomeIcon
          className="h-5 w-5 mt-2 ml-2 text-gray-600 absolute"
          icon={iconName}
        />
        <input
          value={value}
          className={`w-full bg-white pl-8 border-red-600 ${
            disabled ? "cursor-not-allowed" : ""
          }`}
          onChange={onChangeInput}
          aria-invalid={validationError}
          type={inputType}
          required={required}
          disabled={disabled}
          maxLength={maxLength}
        />
        {validationError && (
          <FontAwesomeIcon
            className="h-5 w-5 mt-2 mr-2 text-red-400 float-right"
            icon="exclamation-circle"
          />
        )}
      </StyledInputContainer>
      {validationError && (
        <span className="text-red-600 text-sm">{validationError}</span>
      )}
    </div>
  );
};

export default ProfileInputContainer;
