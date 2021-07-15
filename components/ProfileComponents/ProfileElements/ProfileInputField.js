import React from "react";

const ProfileSvgWrapper = ({
  path,
  style = "h-5 w-5 mt-1 mr-2",
  stroke = "currentColor",
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={style}
    fill="none"
    viewBox="0 0 24 24"
    stroke={stroke}
  >
    {path}
  </svg>
);

const ProfileInputField = ({
  inputKey,
  inputValue,
  inputName,
  icon,
  onChangeField,
}) => (
  <div className="flex flex-row w-full pt-5">
    <div className="text-lg flex flex-col justify-center">
      <p className="font-light text-xl">{inputName}</p>
      <div className="flex flex-row mt-2 ">
        <div className="flex flex-row border p-2 rounded-sm focus:outline-none">
          {icon}
          <ProfileSvgWrapper path={icon} />
          <input
            value={inputValue}
            className="w-96 bg-white focus:outline-none"
            /* onChange={(event) => onChangeField(inputKey, event.target.value)} */
            onChange={onChangeField}
          />
        </div>
      </div>
    </div>
  </div>
);

export default ProfileInputField;
