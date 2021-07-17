import { API, Auth } from "aws-amplify";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";
import {
  ProfileSvgWrapper,
  SaveChangesButton,
  CancelChangesButton,
} from "./ProfileElements";
import { MIN_PASSWORD_LENGTH } from "../../shared/constants";
import { updateUser } from "../../src/graphql/mutations";
import { setUser } from "../../redux/slices/userSlice";

const InputContainer = ({
  id,
  iconName,
  onChangeInput,
  validationError,
  labelName,
  value,
}) => {
  return (
    <div>
      <label className="required" htmlFor={id}>
        {labelName}
      </label>
      <div
        className={`flex flex-row justify-between border p-2 rounded-sm focus:outline-none mt-1 mb-2 ${
          validationError ? "border-red-600" : ""
        }`}
        id={id}
      >
        <div>
          <FontAwesomeIcon
            className="h-5 w-5 mt-1 mr-2 text-gray-400"
            icon={iconName}
          />
          <input
            value={value}
            className="w-96 bg-white border-red-600 focus:outline-none"
            onChange={onChangeInput}
            aria-invalid={validationError}
          />
        </div>
        {validationError && (
          <FontAwesomeIcon
            className="h-5 w-5 mt-1 text-red-400 float-right"
            icon="exclamation-circle"
          />
        )}
      </div>
      {validationError && (
        <span className="text-red-600 text-sm">{validationError}</span>
      )}
    </div>
  );
};

const Account = () => {
  /* Redux */
  const { user } = useSelector((state) => state);

  const dispatch = useDispatch();

  /* States */

  // Email states
  const [currentEmailValue, setCurrentEmailValue] = useState(user?.data?.email);
  const [changeEmail, setChangeEmail] = useState(false);
  const [confirmationCodeSent, setConfrimationCodeSent] = useState(false);
  const [confirmationCodeValue, setConfirmationCodeValue] = useState("");
  const [emailAPIError, setEmailAPIError] = useState("");
  const [emailValidationError, setEmailValidationError] = useState("");
  const [emailUpdateSuccessMessage, setEmailUpdateSuccessMessage] = useState(
    ""
  );

  // Password states
  const [changePassword, setChangePassword] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [repeatedNewPassword, setRepeatedNewPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");

  /* AWS handlers */

  const onUpdateEmail = async () => {
    if (user?.data?.email?.toLowerCase() === currentEmailValue.toLowerCase()) {
      setEmailValidationError("Please enter a new email.");
    } else if (!currentEmailValue?.includes("@")) {
      setEmailValidationError("Please enter a valid email.");
    } else {
      try {
        const authUser = await Auth.currentAuthenticatedUser();

        const updateUserEmail = await Auth.updateUserAttributes(authUser, {
          // email: "bodya.martynyuck@yandex.ua",
          email: currentEmailValue,
        });

        console.log(updateUserEmail, "updateUserEmail");
        if (updateUserEmail === "SUCCESS") {
          setConfrimationCodeSent(true);
        }
      } catch (error) {
        console.log(error, "error");
        setEmailAPIError(error?.message);
      }
    }
  };

  async function confirmSignUp() {
    try {
      const confirm = await Auth.verifyCurrentUserAttributeSubmit(
        "email",
        confirmationCodeValue
      );

      // console.log(confirm, "confirm");

      if (confirm === "SUCCESS") {
        modifiyUser("email", currentEmailValue);
      }
    } catch (error) {
      console.log(error, "error");
      setEmailAPIError(error?.message);
    }
  }

  const modifiyUser = async (key, value) => {
    try {
      const updateUsersEmailInTable = await API.graphql({
        query: updateUser,
        variables: {
          input: {
            ...user.data,
            [key]: value,
          },
        },
        authMode: "AMAZON_COGNITO_USER_POOLS",
      });

      // update redux
      if (updateUsersEmailInTable.data?.updateUser) {
        dispatch(setUser(updateUsersEmailInTable.data?.updateUser));
        setEmailUpdateSuccessMessage("Email has been changed successfully");
        setConfrimationCodeSent(false);
        setConfirmationCodeValue("");
        setCurrentEmailValue(updateUsersEmailInTable.data?.updateUser?.email);
        // setChangeEmail(false);
      } else {
        setEmailAPIError("Email address hasn't been saved to the Database.");
      }
    } catch (error) {
      setEmailAPIError(error?.message);
    }
  };

  const onUpdatePassword = async () => {
    try {
      const authUser = await Auth.currentAuthenticatedUser();

      const updateUserEmail = await Auth.updateUserAttributes(authUser, {
        // email: "bodya.martynyuck@yandex.ua",
        email: currentEmailValue,
      });

      //   console.log(updateUserEmail, "updateUserEmail");
      //   if (updateUserEmail === "SUCCESS") {
      //     setConfrimationCodeSent(true);
      //   }
    } catch (error) {
      setPasswordError(error?.message);
    }
  };

  /* Local Handlers */

  const onChangeEmailInput = (event) => {
    setEmailValidationError(false);
    setCurrentEmailValue(event.target.value);
  };

  const cancelEmailChanges = () => {
    // reset all
    setEmailAPIError("");
    setEmailValidationError("");
    setConfirmationCodeValue("");
    setEmailUpdateSuccessMessage("");
    setChangeEmail(false);
    setConfrimationCodeSent(false);
    setCurrentEmailValue(user?.data?.email);
  };

  const cancelPasswordChanges = () => setChangePassword(false);

  const passwordUpdateDisabled =
    currentPassword?.length < MIN_PASSWORD_LENGTH ||
    newPassword?.repeatedNewPassword < MIN_PASSWORD_LENGTH ||
    newPassword !== repeatedNewPassword;

  return (
    <div>
      <div className="w-full pt-5">
        <div className="text-lg flex flex-col justify-center">
          <div className="flex flex-row">
            <p className="font-light text-xl font-semibold">
              {!changeEmail ? "Email" : "Change Email"}
            </p>
            {!changeEmail && (
              <button
                type="button"
                className="text-lg text-indigo-700 ml-2 focus:outline-none hover:underline"
                onClick={() => {
                  setChangeEmail(!changeEmail);
                  setEmailUpdateSuccessMessage("");
                }}
              >
                Change
              </button>
            )}
          </div>

          {emailAPIError ? (
            <div className="my-4 bg-red-500 text-white p-2 rounded w-full">
              {emailAPIError}
              <button
                type="button"
                className="float-right"
                onClick={() => setEmailAPIError("")}
              >
                <ProfileSvgWrapper
                  stroke="white"
                  path={<path strokeWidth={2} d="M6 18L18 6M6 6l12 12" />}
                />
              </button>
            </div>
          ) : confirmationCodeSent && !emailAPIError ? (
            <div className="my-4 bg-blue-500 text-white p-2 rounded w-full">
              Check your E-Mails (Spam folder included) for a confirmation code.
            </div>
          ) : null}
          {!changeEmail ? (
            <>
              <div className="my-2 text-xl mt-5"> {currentEmailValue}</div>
              {emailUpdateSuccessMessage ? (
                <div className="my-4 bg-green-600 text-white p-2 rounded w-full">
                  {emailUpdateSuccessMessage}
                  <button
                    type="button"
                    className="float-right"
                    onClick={() => setEmailUpdateSuccessMessage("")}
                  >
                    <ProfileSvgWrapper
                      stroke="white"
                      path={<path strokeWidth={2} d="M6 18L18 6M6 6l12 12" />}
                    />
                  </button>
                </div>
              ) : null}
            </>
          ) : (
            <div className="my-5">
              <InputContainer
                id="newEmail"
                iconName="envelope"
                labelName="New Email"
                value={currentEmailValue}
                validationError={emailValidationError}
                onChangeInput={onChangeEmailInput}
              />

              <div className="float-right mt-2">
                <CancelChangesButton
                  onClick={cancelEmailChanges}
                  style="mr-5"
                />
                <SaveChangesButton onClick={onUpdateEmail} />
              </div>
            </div>
          )}

          {confirmationCodeSent && (
            <>
              <div className="w-full mt-5">
                <div className="text-lg flex flex-col justify-center">
                  <label className="required" htmlFor="confirmationCode">
                    Confirmation Code{" "}
                  </label>
                  <div className="flex flex-row border p-2 w-full mt-1 mb-2 rounded-sm focus:outline-none">
                    <input
                      id="confirmationCode"
                      value={confirmationCodeValue}
                      className="w-full bg-white focus:outline-none"
                      onChange={(event) =>
                        setConfirmationCodeValue(event.target.value)
                      }
                    />
                  </div>
                </div>
                <button
                  onClick={(event) => {
                    event.preventDefault();
                    confirmSignUp();
                  }}
                  className="text-white w-24 mt-4 bg-pink-600 p-3 rounded float-right"
                >
                  Send
                </button>
              </div>
            </>
          )}
        </div>

        <div className="pt-5">
          <div className="flex flex-row">
            <p className="font-light text-xl font-semibold">
              {!changePassword ? "Password" : "Change Password"}
            </p>
            {!changePassword && (
              <button
                type="button"
                className="text-lg text-indigo-700 ml-2 focus:outline-none hover:underline"
                onClick={() => setChangePassword(!changePassword)}
              >
                Change
              </button>
            )}
          </div>
          <div className="pt-5">
            Make sure it’s at least 6 characters, uses a mix of upper and lower
            case characters, includes at least 1 number, 1 special character,
            and does not use common words like “password”, “123456” or “qwerty”.
          </div>
          {!changePassword ? (
            <div className="my-2 text-xl mt-5"> ●●●●●●</div>
          ) : (
            <div className="my-5">
              <InputContainer
                id="newPassword"
                iconName="lock"
                labelName="New Password"
                value={currentEmailValue}
                validationError={emailValidationError}
                onChangeInput={onChangeEmailInput}
              />
              <div className="pt-5">
                <label className="required" htmlFor="confirmNewPassword">
                  Confirm New Password
                </label>
                <div className="flex flex-row border p-2 w-full mt-1 mb-2 rounded-sm focus:outline-none">
                  <FontAwesomeIcon
                    className="h-5 w-5 mt-1 mr-2 text-gray-400"
                    icon="lock"
                  />
                  <input
                    id="confirmNewPassword"
                    className="w-96 bg-white focus:outline-none"
                    required
                  />
                </div>
              </div>
              <div className="pt-5">
                <label className="required" htmlFor="currentPassword">
                  Current Password
                </label>
                <div className="flex flex-row border p-2 w-full mt-1 mb-2 rounded-sm focus:outline-none">
                  <FontAwesomeIcon
                    className="h-5 w-5 mt-1 mr-2 text-gray-400"
                    icon="lock"
                  />
                  <input
                    id="currentPassword"
                    className="w-96 bg-white focus:outline-none"
                    required
                  />
                </div>
              </div>
              <div className="float-right mt-2">
                <CancelChangesButton
                  onClick={cancelPasswordChanges}
                  style="mr-5"
                />
                <SaveChangesButton
                  onClick={onUpdateEmail}
                  disabled={passwordUpdateDisabled}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Account;
