import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { API, Auth, graphqlOperation } from "aws-amplify";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import _ from "lodash";
import usePlacesAutocomplete from "use-places-autocomplete";
import Swal from "sweetalert2";
import { setUser } from "../redux/slices/userSlice";
import {
  ACCOUNT,
  PREFERENCES,
  PROFILE_FIELDS_BY_CURRENT_SELECTION,
  PROFILE_FIELD_TYPES,
  PROFILE_SELECTIONS,
  REGIONS_MAPPING,
} from "../shared/constants";
import { updateUser } from "../src/graphql/mutations";
import { removeNullsInObject } from "../shared/utils";

// styles
import styles from "./profile.module.scss";
import Account from "../components/ProfileComponents/Account";

const StyledUserInfoContainer = styled.div`
  width: 700px;
`;

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
  <div className="flex flex-row w-full pt-5">
    <div className="text-lg flex flex-col justify-center">
      <p className="font-light text-xl">{fieldName}</p>
      <div className="flex flex-row mt-2 ">
        <div className="flex flex-row border p-2 rounded-sm focus:outline-none">
          {icon}
          <ProfileSvgWrapper path={icon} />
          <input
            value={inputValue}
            className={`w-96 bg-white ${
              !isEdit ? "cursor-not-allowed text-gray-600" : null
            }`}
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
  const [saveChangesError, setSaveChangesError] = useState(() => {
    let initErrorMessagesBySelectionValue = {};
    PROFILE_SELECTIONS.map((selection) => ({ [selection]: "" }));

    return initErrorMessagesBySelectionValue;
  });

  const [emailChanged, setEmailChanged] = useState(false);
  const [confirmationCodeValue, setConfirmationCodeValue] = useState("");

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
    console.log(userValues, "userValues");
    try {
      /* check if users email has been changed */

      /* if (user?.data?.email !== userValues.email) { */

      {
        /* console.log(userValues.email, "userValues"); */
      }
      const authUser = await Auth.currentAuthenticatedUser();

      /*  email: "bodya.martynyuck@yandex.ua",, */
      {
        /* bohdan.martyniuk08@gmail.com */
      }
      const updatedUserAttributes = await Auth.updateUserAttributes(authUser, {
        email: "bodya.martynyuck@yandex.ua",
      });

      /* console.log(userValues.emai, "userValues.emai"); */

      console.log(updatedUserAttributes, "updatedUserAttributes");

      if (updatedUserAttributes === "SUCCESS") {
        setEmailChanged(true);
      }
      /* } */

      {
        /* const updatedUserValues = await API.graphql(
        graphqlOperation(updateUser, {
          input: userValues,
        })
      );

      dispatch(setUser(removeNullsInObject(updatedUserValues))); */
      }
      setSaveChangesError({ [currentProfileFields]: "" });
    } catch (error) {
      console.log(error, "error");
      setSaveChangesError({ [currentProfileFields]: error.message });

      /* throw Error(error.message); */
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

  async function confirmSignUp() {
    console.log(userValues, "userValues");
    try {
      /* "bohdan.martyniuk08@gmail.com", */
      const confirm = await Auth.verifyCurrentUserAttributeSubmit(
        "email",
        confirmationCodeValue
      );
    } catch (error) {
      console.log(error, "error");
      setSaveChangesError({ [currentProfileFields]: error.message });
      {
        /* setError(err); */
      }
    }
  }

  const isSaveDisabled = _.isEqual(userValues, user.data);

  const generateSaveProgressModalMessage = () =>
    Swal.fire({
      title: "Are you sure?",
      text:
        userValues.geographicPreference !== user.data.geographicPreference
          ? `You won't have full access to ${user.data.geographicPreference} anymore`
          : false,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

  return (
    <div>
      {user ? (
        <div className="my-10 flex flex-row justify-center">
          <div className="bg-white rounded shadow-xl w-72 mr-5 border-black">
            <div className="flex flex-col pt-5">
              {PROFILE_SELECTIONS.map((profileSelection) => (
                <button
                  key={profileSelection}
                  className="text-2xl text-left font-light cursor-pointer my-5"
                  onClick={() => setCurrentProfileFields(profileSelection)}
                >
                  {profileSelection}
                </button>
              ))}
            </div>
          </div>
          <StyledUserInfoContainer className="bg-white rounded shadow-xl p-10">
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
            {/* {PROFILE_FIELDS_BY_CURRENT_SELECTION[
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
            )} */}
            <Account />
            {/* {currentProfileFields === PREFERENCES && (
              <div className="flex flex-row">
                <label className="mx-2 pt-1 text-black text-lg">
                  I vote in
                </label>
                <div>
                  <input
                    className={`p-1 w-96 border rounded ${
                      !isEdit || !userValues.geographicPreference
                        ? "cursor-not-allowed text-gray-600"
                        : ""
                    }`}
                    value={userValues.voteLocation}
                    onChange={handleInputLocation}
                    disabled={!ready}
                    placeholder="Your location"
                    disabled={!isEdit || !userValues.geographicPreference}
                  /> */}
                  {/* We can use the "status" to decide whether we should display the dropdown or not */}
                  {/* {status === "OK" && isEdit && (
                    <ul className="absolute mt-1 w-96 bg-white rounded border">
                      {renderSuggestions()}
                    </ul>
                  )}
                </div>
              </div> */}
            {/* )} */}
            {currentProfileFields === ACCOUNT && emailChanged && (
              <>
                <div className="flex flex-row w-full pt-5">
                  <div className="text-lg flex flex-col justify-center">
                    <p className="font-light text-xl">Confirmation Code</p>
                    <div className="flex flex-row mt-2 ">
                      <div
                        className={`flex flex-row border p-2 rounded-sm focus:outline-none ${
                          !isEdit ? "cursor-now-allowed" : ""
                        }`}
                      >
                        {/* {icon} */}
                        {/* <ProfileSvgWrapper path={icon} /> */}
                        <input
                          value={confirmationCodeValue}
                          className="w-96 bg-white"
                          onChange={(event) =>
                            setConfirmationCodeValue(event.target.value)
                          }
                          disabled={!isEdit}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <button
                  onClick={(event) => {
                    event.preventDefault();
                    confirmSignUp();
                  }}
                  className="text-white w-96 mt-4 bg-pink-600 p-3 rounded"
                >
                  Send Confirmation Code
                </button>
              </>
            )}

            {isEdit && (
              <>
                <button
                  className={`bg-green-600 text-white py-2 px-3 rounded-sm mt-5 ${
                    isSaveDisabled ? "cursor-not-allowed opacity-70" : ""
                  }`}
                  disabled={isSaveDisabled}
                  onClick={() => {
                    generateSaveProgressModalMessage().then(
                      ({ isConfirmed }) => isConfirmed && updateUserData()
                    );
                  }}
                >
                  Save
                </button>
                {saveChangesError[currentProfileFields] && (
                  <div className="bg-red-300 border-red-700 border-2 mt-5 p-2 w-5/12 rounded">
                    {saveChangesError[currentProfileFields]}
                  </div>
                )}
              </>
            )}
          </StyledUserInfoContainer>
        </div>
      ) : null}
    </div>
  );
};

export default Profile;
