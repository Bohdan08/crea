import React, { useEffect, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { API, graphqlOperation } from "aws-amplify";
import { useDispatch, useSelector } from "react-redux";
import _ from "lodash";
import usePlacesAutocomplete from "use-places-autocomplete";
import { setUser } from "../redux/slices/userSlice";
import {
  PROFILE_FIELDS_BY_CURRENT_SELECTION,
  PROFILE_FIELD_TYPES,
  PROFILE_SELECTIONS,
  REGIONS_MAPPING,
} from "../shared/constants";
import { updateUser } from "../src/graphql/mutations";
import { removeNullsInObject } from "../shared/utils";

// styles
import styles from "./profile.module.scss";

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
  fieldName,
  inputValue,
  inputName,
  icon,
  onChangeField,
  isEdit,
}) => (
  <div className="flex flex-row w-full pb-5">
    <div className="text-lg flex flex-col justify-center">
      <p className="font-light text-xl">{fieldName}</p>
      <div className="flex flex-row mt-2 ">
        <div className="flex flex-row border p-2 rounded-sm">
          {icon}
          <ProfileSvgWrapper path={icon} />
          <input
            value={inputValue}
            className="w-96 bg-white"
            onChange={(event) => onChangeField(inputName, event.target.value)}
            disabled={!isEdit}
          />
        </div>
      </div>
    </div>
  </div>
);

const ProfileDropDownField = ({
  fieldName,
  optionName,
  options,
  onChangeField,
  selectedOption,
  isEdit,
}) => (
  <div className="flex flex-row w-full mb-4">
    <div className="text-lg flex flex-col justify-center">
      <div className="flex">
        <div className="p-2 rounded-sm disabled">
          <form
            onChange={(event) => onChangeField(optionName, event.target.value)}
          >
            <fieldset disabled={!isEdit}>
              <label className="mr-2" htmlFor={fieldName}>
                {fieldName}
              </label>
              <select
                className={`border p-1 rounded ${
                  isEdit ? "" : "cursor-not-allowed"
                }`}
                name={fieldName}
                id={fieldName}
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

const Profile = () => {
  /* States */
  const [isEdit, setEdit] = useState(false);
  const [userValues, setUserValues] = useState({});
  const [currentProfileFields, setCurrentProfileFields] = useState(
    PROFILE_SELECTIONS[0]
  );

  /* Redux */
  const { user } = useSelector((state) => state);

  /* Geo Location */
  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    requestOptions: {
      /* Define search scope here */
    },
    debounce: 300,
  });

  const handleInputLocation = (event) => {
    setValue(event.target.value);
    setUserValues({ ...userValues, voteLocation: event.target.value });
  };

  const handleSelectLocation = ({ description }) => () => {
    // When user selects a place, we can replace the keyword without request data from API
    // by setting the second parameter to "false"
    setValue(description, false);
    setUserValues({ ...userValues, voteLocation: description });
    clearSuggestions();
  };

  const renderSuggestions = () => {
    /* show data only according to selected region */
    const filteredData = data?.filter((initialSuggestion) =>
      initialSuggestion.description
        ?.toLowerCase()
        .includes(REGIONS_MAPPING[userValues.geographicPreference])
    );

    return filteredData.length ? (
      filteredData.map((suggestion) => {
        const {
          place_id,
          structured_formatting: { main_text, secondary_text },
        } = suggestion;

        return (
          <li
            key={place_id}
            className="cursor-pointer px-2 hover:bg-gray-50"
            onClick={handleSelectLocation(suggestion)}
          >
            <strong>{main_text}</strong> <small>{secondary_text}</small>
          </li>
        );
      })
    ) : (
      <li className="px-2"> No results found... </li>
    );
  };

  const dispatch = useDispatch();

  const router = useRouter();

  /* Use Effects */
  useEffect(() => {
    if (!user.data) {
      router.push("/auth");
    }
  }, []);

  useEffect(() => {
    if (
      !Object.entries(userValues).length &&
      Object.entries(user.data || {}).length
    ) {
      setUserValues(user.data);
    }
  }, [userValues, user.data]);

  /* Handlers */
  const updateUserData = async () => {
    try {
      const updatedUserValues = await API.graphql(
        graphqlOperation(updateUser, {
          input: userValues,
        })
      );
      dispatch(setUser(removeNullsInObject(updatedUserValues)));
    } catch (error) {
      throw Error(error);
    }
  };

  const onChangeField = (field, value) =>
    setUserValues({ ...userValues, [field]: value });

  const handleEditProgress = (editValue) => {
    setEdit(editValue);

    if (!editValue) {
      setUserValues(user.data);
    }
  };

  const isSaveDisabled = _.isEqual(userValues, user.data);

  return (
    <div>
      {user ? (
        <div className="w-12/12 h-full px-5 py-10 flex flex-row items-stretch">
          <div className="w-3/12 mr-5 bg-white rounded shadow-xl">
            <div className="flex flex-col pt-5">
              {PROFILE_SELECTIONS.map((profileSelection) => (
                <button
                  className="text-2xl font-light cursor-pointer mb-5"
                  onClick={() => setCurrentProfileFields(profileSelection)}
                >
                  {profileSelection}
                </button>
              ))}
            </div>
          </div>
          <div className="w-9/12 bg-white rounded shadow-xl p-5">
            <div
              className={`${styles.tooltip} absolute right-0 mr-10 text-sm p-0`}
            >
              <span className={styles.tooltiptext}>
                {isEdit ? "Cancel Progress" : "Edit Profile"}
              </span>
              <button type="button" onClick={() => handleEditProgress(!isEdit)}>
                {!isEdit ? (
                  <ProfileSvgWrapper
                    stroke="orange"
                    path={
                      <path
                        strokeWidth={2}
                        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                      />
                    }
                  />
                ) : (
                  <ProfileSvgWrapper
                    stroke="red"
                    path={<path strokeWidth={2} d="M6 18L18 6M6 6l12 12" />}
                  />
                )}
              </button>
            </div>
            {PROFILE_FIELDS_BY_CURRENT_SELECTION[
              currentProfileFields
            ].map(
              ({ name, value, iconPath, options, type, geographyDependent }) =>
                type === PROFILE_FIELD_TYPES.INPUT ? (
                  <ProfileInputField
                    key={name}
                    fieldName={name}
                    inputName={value}
                    inputValue={userValues[value]}
                    icon={iconPath}
                    isEdit={isEdit}
                    onChangeField={onChangeField}
                  />
                ) : (
                  <ProfileDropDownField
                    key={name}
                    fieldName={name}
                    optionName={value}
                    selectedOption={userValues[value]}
                    options={
                      geographyDependent
                        ? options[
                            REGIONS_MAPPING[userValues.geographicPreference]
                          ]
                        : options
                    }
                    icon={iconPath}
                    isEdit={isEdit}
                    onChangeField={onChangeField}
                  />
                )
            )}
            {currentProfileFields === "Preferences" && (
              <div className="flex flex-row">
                <label className="mx-2 pt-1 text-black text-lg">
                  I vote in
                </label>
                <div>
                  <input
                    className={`p-1 w-96 border rounded ${
                      !isEdit || !userValues.geographicPreference
                        ? "cursor-not-allowed"
                        : ""
                    }`}
                    value={userValues.voteLocation}
                    onChange={handleInputLocation}
                    disabled={!ready}
                    placeholder="Your location"
                    disabled={!isEdit || !userValues.geographicPreference}
                  />
                  {/* We can use the "status" to decide whether we should display the dropdown or not */}
                  {status === "OK" && (
                    <ul className="absolute mt-1 w-96 bg-white rounded border">
                      {renderSuggestions()}
                    </ul>
                  )}
                </div>
              </div>
            )}

            {isEdit && (
              <button
                className={`bg-green-600 text-white py-2 px-3 rounded-sm mt-5 ${
                  isSaveDisabled ? "cursor-not-allowed opacity-70" : ""
                }`}
                disabled={isSaveDisabled}
                onClick={() => {
                  updateUserData();
                }}
              >
                Save Progress
              </button>
            )}
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default Profile;
