import React from "react";

const ProfileDropDownContainer = ({
  fieldId,
  fieldName,
  options,
  onChangeField,
  selectedOption,
  required,
  containerStyles = "",
  disabled,
}) => (
  <div className={containerStyles}>
    <div className="text-lg flex flex-col justify-center">
      <div className="flex">
        <div className="rounded-sm disabled">
          <form onChange={onChangeField}>
            <fieldset disabled={disabled}>
              <label
                className={`mr-4 ${required ? "required" : ""} ${
                  disabled ? "opacity-60" : ""
                }`}
                htmlFor={fieldId}
              >
                {fieldName}
              </label>
              <select
                className="border p-1 rounded"
                name={fieldName}
                id={fieldId}
                className={`border p-1 rounded ${
                  disabled ? "cursor-not-allowed" : ""
                }`}
              >
                <option
                  className="text-gray-400"
                  selected={!selectedOption}
                  disabled
                >
                  Select your option
                </option>
                {options?.map(({ key, value }) => (
                  <option
                    key={key}
                    value={value}
                    selected={!!selectedOption && value === selectedOption}
                  >
                    {value}
                  </option>
                ))}
              </select>
            </fieldset>
          </form>
        </div>
      </div>
    </div>
  </div>
);

export default ProfileDropDownContainer;
