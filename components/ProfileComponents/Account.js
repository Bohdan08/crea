import { API, Auth } from "aws-amplify";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  ProfileSvgWrapper,
  SaveChangesButton,
  CancelChangesButton,
  ErrorMessage,
  ProfileInputContainer,
} from "./ProfileElements";
import { MIN_PASSWORD_LENGTH } from "../../shared/constants";
import { updateUser } from "../../src/graphql/mutations";
import { setUser } from "../../redux/slices/userSlice";

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
  const [currentPassword, setCurrentPassword] = useState("");
  const [passwordAPIError, setPasswordAPIError] = useState("");
  const [passwordValidationError, setPasswordValidationError] = useState("");
  const [passwordUpdateSuccessMessage, setPasswordSuccessMessage] = useState(
    ""
  );

  /* EMAIL handlers */
  const onUpdateEmail = async () => {
    if (user?.data?.email?.toLowerCase() === currentEmailValue.toLowerCase()) {
      setEmailValidationError("Please enter a new email.");
    } else if (!currentEmailValue?.includes("@")) {
      setEmailValidationError("Please enter a valid email.");
    } else {
      try {
        const authUser = await Auth.currentAuthenticatedUser();

        const updateUserEmail = await Auth.updateUserAttributes(authUser, {
          email: currentEmailValue,
        });

        if (updateUserEmail === "SUCCESS") {
          setConfrimationCodeSent(true);
        }
      } catch (error) {
        setEmailAPIError(error?.message);
      }
    }
  };

  const confirmSignUp = async () => {
    try {
      const confirm = await Auth.verifyCurrentUserAttributeSubmit(
        "email",
        confirmationCodeValue
      );

      if (confirm === "SUCCESS") {
        modifiyUser("email", currentEmailValue);
      }
    } catch (error) {
      setEmailAPIError(error?.message);
    }
  };

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
        setEmailUpdateSuccessMessage("Email has been changed successfully!");
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

  const onChangeEmailInput = (event) => {
    if (event.target.value?.includes("@") && emailValidationError) {
      setEmailValidationError(false);
    }
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

  /* Password Handlers */
  const onUpdatePassword = async () => {
    if (
      newPassword?.length < MIN_PASSWORD_LENGTH ||
      currentPassword?.length < MIN_PASSWORD_LENGTH
    ) {
      setPasswordValidationError("Password should be at least 6 characters");
      return;
    } else if (newPassword !== repeatedNewPassword) {
      setPasswordValidationError("Passwords don't match");
      return;
    } else {
      return Auth.currentAuthenticatedUser()
        .then((user) => Auth.changePassword(user, currentPassword, newPassword))
        .then(() => {
          setPasswordSuccessMessage("Password has been changed successfully!");
          setNewPassword("");
          setRepeatedNewPassword("");
          setCurrentPassword("");
          setChangePassword(false);
        })
        .catch((error) => {
          const { message = "" } = error;

          if (
            message.toLowerCase().includes("incorrect username or password")
          ) {
            setPasswordAPIError("Current password is invalid");
          } else {
            setPasswordAPIError(message);
          }
        });
    }
  };

  const onSetNewPasswordInput = (event) => {
    setNewPassword(event.target.value);
  };

  const onSetNewRepeatedPasswordInput = (event) => {
    setRepeatedNewPassword(event.target.value);
  };

  const onSetCurrentPassword = (event) => {
    setCurrentPassword(event.target.value);
  };

  const cancelPasswordChanges = () => {
    // reset all changes
    setChangePassword(false);
    setNewPassword("");
    setRepeatedNewPassword("");
    setCurrentPassword("");
    setPasswordAPIError("");
    setPasswordValidationError("");
  };

  return (
    <>
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
          <ErrorMessage
            message={emailAPIError}
            onErrorHide={() => setEmailAPIError("")}
          />
        ) : confirmationCodeSent && !emailAPIError ? (
          <div className="my-4 bg-blue-500 text-white p-2 rounded w-full">
            Check your E-Mails (Spam folder included) for a confirmation code.
          </div>
        ) : null}
        {!changeEmail ? (
          <>
            <div className="my-2 text-xl mt-3"> {currentEmailValue}</div>
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
            <ProfileInputContainer
              id="newEmail"
              iconName="envelope"
              labelName="New Email"
              type="email"
              required
              value={currentEmailValue}
              validationError={emailValidationError}
              onChangeInput={onChangeEmailInput}
            />

            <div className="float-right mt-2">
              <CancelChangesButton onClick={cancelEmailChanges} style="mr-5" />
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

      <div className="mt-8">
        <div className="flex flex-row">
          <p className="font-light text-xl font-semibold">
            {!changePassword ? "Password" : "Change Password"}
          </p>
          {!changePassword && (
            <button
              type="button"
              className="text-lg text-indigo-700 ml-2 focus:outline-none hover:underline"
              onClick={() => {
                setChangePassword(!changePassword);
                setPasswordSuccessMessage("");
              }}
            >
              Change
            </button>
          )}
        </div>
        {passwordAPIError && (
          <ErrorMessage
            message={passwordAPIError}
            onErrorHide={() => setPasswordAPIError("")}
          />
        )}

        <div className="mt-3">
          Make sure it’s at least 6 characters. We recommend you to use a mix of
          upper and lower case characters, includes at least 1 number, 1 special
          character, and does not use common words like “password”, “123456” or
          “qwerty”.
        </div>
        {!changePassword ? (
          <>
            <div className="my-2 text-xl mt-5"> ●●●●●●</div>
            {passwordUpdateSuccessMessage ? (
              <div className="my-4 bg-green-600 text-white p-2 rounded w-full">
                {passwordUpdateSuccessMessage}
                <button
                  type="button"
                  className="float-right"
                  onClick={() => setPasswordSuccessMessage("")}
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
            <ProfileInputContainer
              id="newPassword"
              iconName="lock"
              labelName="New Password"
              inputType="password"
              required
              value={newPassword}
              validationError={passwordValidationError}
              onChangeInput={onSetNewPasswordInput}
            />
            <div className="pt-5">
              <ProfileInputContainer
                id="confirmNewPassword"
                iconName="lock"
                labelName="Confirm New Password"
                inputType="password"
                required
                value={repeatedNewPassword}
                validationError={passwordValidationError}
                onChangeInput={onSetNewRepeatedPasswordInput}
              />
            </div>
            <div className="pt-5">
              <ProfileInputContainer
                id="currentPassword"
                iconName="lock"
                labelName="Current Password"
                inputType="password"
                required
                value={currentPassword}
                validationError={passwordValidationError}
                onChangeInput={onSetCurrentPassword}
              />
            </div>
            <div className="float-right mt-2">
              <CancelChangesButton
                onClick={cancelPasswordChanges}
                style="mr-5"
              />
              <SaveChangesButton onClick={onUpdatePassword} />
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Account;
