import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { API, graphqlOperation } from "aws-amplify";
import { useDispatch, useSelector } from "react-redux";
import _ from "lodash";
import { changeUserSingleField, setUser } from "../redux/slices/userSlice";
import {
  PROFILE_FIELDS_BY_CURRENT_SELECTION,
  PROFILE_FIELD_TYPES,
  PROFILE_SELECTIONS,
} from "../shared/constants";
import { updateUser } from "../src/graphql/mutations";
import { listUsers } from "../src/graphql/queries";

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
  <div className="flex flex-row w-full pb-5">
    <div className="text-lg flex flex-col justify-center">
      <div className="flex mt-2">
        <div className="p-2 rounded-sm disabled">
          <form
            onChange={(event) => onChangeField(optionName, event.target.value)}
          >
            <fieldset disabled={!isEdit}>
              <label className="mr-2" htmlFor={fieldName}>
                {fieldName}
              </label>
              <select
                className={`border mt-2 p-1 rounded ${
                  isEdit ? "" : "cursor-not-allowed"
                }`}
                name={fieldName}
                id={fieldName}
              >
                <option className="text-gray-400" selected={!selectedOption}>
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
  const { user, region } = useSelector((state) => state);

  const dispatch = useDispatch();

  const router = useRouter();

  useEffect(() => {
    if (!user.data) {
      router.push("/auth");
    }
  }, []);

  useEffect(() => {
    if (
      !Object.entries(userValues).length &&
      Object.entries(user.data).length
    ) {
      setUserValues(user.data);
    }
  }, [userValues, user.data]);

  /* else {
      setUserValues(user);
    } *
    
  }, []);

  /* useEffect(() => {
    checkUser();
  }, []); */

  /* async function checkUser() {
    try {
      const userValues = await Auth.currentAuthenticatedUser();
      dispatch(setUser(userValues?.attributes || {}));
      setAuthInfo("signedIn");
    } catch (err) {
      console.log(err, "err");
      setAuthInfo(err?.message);
    }
  } */

  const updateUserData = async () => {
    console.log(userValues, "userValues");

    try {
      const updatedUserValues = await API.graphql(
        graphqlOperation(updateUser, {
          input: userValues,
        })
      );
      dispatch(setUser(removeNullsInObject(updatedUserValues)));
    } catch (error) {
      console.log(error, "error");
    }
  };

  const fetchUserData = async () => {
    try {
      const userData = await API.graphql(graphqlOperation(listUsers));
      console.log(userData, "userData");
      // dispatch(setUser(userData.data.listUsers.items[0]));
      // setIsAuthenticated(true);
    } catch (error) {
      {
        /* setIsAuthenticated(false); */
      }
      console.log(error, "error");
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
            {PROFILE_FIELDS_BY_CURRENT_SELECTION[currentProfileFields].map(
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
                  <>
                    {console.log(userValues, "userValues", value, "value")}
                    <ProfileDropDownField
                      key={name}
                      fieldName={name}
                      optionName={value}
                      selectedOption={userValues[value]}
                      options={
                        geographyDependent
                          ? options[region.currentRegion || "usa"]
                          : options
                      }
                      icon={iconPath}
                      isEdit={isEdit}
                      onChangeField={onChangeField}
                    />
                  </>
                )
            )}

            {isEdit && (
              <button
                className={`bg-green-600 text-white py-2 px-3 rounded-sm mt-1 ${
                  isSaveDisabled ? "cursor-not-allowed opacity-70" : ""
                }`}
                disabled={isSaveDisabled}
                onClick={() => updateUserData()}
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
