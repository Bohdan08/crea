import { Auth } from "aws-amplify";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { ProfileSvgWrapper, SaveChangesButton } from "./ProfileElements";
// import ProfileInputField from "./ProfileElements/ProfileInputField";

const AccountInputField = ({ inputValue, inputName, icon, onChangeField }) => {
  const [changeState, setChangeState] = useState(false);

  return (
    <div className="flex flex-row w-full pt-5">
      <div className="text-lg flex flex-col justify-center">
        <div className="flex flex-row">
          <p className="font-light text-lg font-semibold">{inputName}</p>
          {!changeState && (
            <button
              type="button"
              className="text-base text-indigo-700 ml-4 focus:outline-none hover:underline"
              onClick={() => setChangeState(!changeState)}
            >
              Change
            </button>
          )}
        </div>
        <div className="flex flex-row">
          {!changeState ? (
            <div> {inputValue}</div>
          ) : (
            <div className="flex flex-row border p-2 rounded-sm focus:outline-none my-2">
              {icon}
              <ProfileSvgWrapper path={icon} />
              <input
                value={inputValue}
                className="w-96 bg-white focus:outline-none"
                onChange={onChangeField}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const Account = () => {
  /* Redux */
  const { user } = useSelector((state) => state);

  /* States */
  const [currentEmailValue, setCurrentEmailValue] = useState(user?.data?.email);
  const [changeEmail, setChangeEmail] = useState(false);
  const [confirmationCodeSent, setConfrimationCodeSent] = useState(false);
  const [confirmationCodeValue, setConfirmationCodeValue] = useState("");
  const [emailError, setEmailError] = useState("");

  const onUpdateEmail = async () => {
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
      setEmailError(error?.message);
    }
  };

  async function confirmSignUp() {
    try {
      const confirm = await Auth.verifyCurrentUserAttributeSubmit(
        "email",
        confirmationCodeValue
      );

      console.log(confirm, "confirm");
    } catch (error) {
      console.log(error, "error");
      setEmailError(error?.message);
    }
  }

  const isEmailUpdateDisabled =
    user?.data?.email === currentEmailValue ||
    !currentEmailValue?.includes("@");
  return (
    <div>
      {/* <AccountInputField
        inputName="Email"
        inputKey="email"
        inputValue={currentEmailValue}
        icon={
          <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        }
        onChangeField={onChangeEmail}
      /> */}
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
                onClick={() => setChangeEmail(!changeEmail)}
              >
                Change
              </button>
            )}
          </div>

          {emailError ? (
            <div className="my-4 bg-red-500 text-white p-2 rounded w-full">
              {emailError}
              <button
                type="button"
                className="float-right"
                onClick={() => setEmailError("")}
              >
                <ProfileSvgWrapper
                  stroke="white"
                  path={<path strokeWidth={2} d="M6 18L18 6M6 6l12 12" />}
                />
              </button>
            </div>
          ) : confirmationCodeSent && !emailError ? (
            <div className="my-4 bg-blue-500 text-white p-2 rounded w-full">
              Check your E-Mails (Spam folder included) for a confirmation code.
            </div>
          ) : null}
          {!changeEmail ? (
            <div className="my-2 text-xl"> {currentEmailValue}</div>
          ) : (
            <div className="my-5">
              <label className="required"> New Email </label>
              <div className="flex flex-row border p-2 rounded-sm focus:outline-none mt-1 mb-2">
                <ProfileSvgWrapper
                  path={
                    <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  }
                />
                <input
                  value={currentEmailValue}
                  className="w-96 bg-white focus:outline-none"
                  onChange={(event) => setCurrentEmailValue(event.target.value)}
                />
              </div>
              <SaveChangesButton
                style="float-right"
                onClick={onUpdateEmail}
                disabled={isEmailUpdateDisabled}
              />
            </div>
          )}

          {confirmationCodeSent && (
            <>
              <div className="w-full mt-5">
                <div className="text-lg flex flex-col justify-center">
                  <label className="required">Confirmation Code </label>
                  <div className="flex flex-row border p-2 w-full mt-1 mb-2 rounded-sm focus:outline-none">
                    <input
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
      </div>
    </div>
  );
};

export default Account;
