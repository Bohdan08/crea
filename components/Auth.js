// import "../src/aws-exports";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { API, Auth } from "aws-amplify";
import styled from "styled-components";
import {
  ConfirmSignUp,
  ForgotPasswordSubmit,
  ForgotPassword,
  SignUp,
  SignIn,
} from "./FormComponents";
import { fetchUserFromDbById } from "../redux/slices/userSlice";
import { useRouter } from "next/router";
import { MIN_PASSWORD_LENGTH } from "../shared/constants";

const StyledForm = styled.form`
  width: 500px !important;
`;

const AuthComponent = () => {
  const { user } = useSelector((store) => store);

  const [uiState, setUiState] = useState(user.data ? "signedIn" : "signIn");

  const [error, setError] = useState(null);
  const [formState, setFormState] = useState({
    email: "",
    password: "",
    repeatedPassword: "",
    authCode: "",
  });

  const { email, password, repeatedPassword, authCode } = formState;

  const dispatch = useDispatch();
  const route = useRouter();

  useEffect(() => {
    if (uiState === "signedIn") {
      route.push("/");
    }
  }, [uiState]);

  const onChange = ({ target: { name, value } }) =>
    setFormState({ ...formState, [name]: value });

  async function signUp() {
    if (password?.length < MIN_PASSWORD_LENGTH) {
      setError({ message: "Password should have at least 6 characters" });
      return;
    } else if (password !== repeatedPassword) {
      setError({ message: "Passwords don't match" });
      return;
    } else {
      try {
        await Auth.signUp({ username: email, password, attributes: { email } });
        setError(null);
        setUiState("confirmSignUp");
      } catch (err) {
        setError(err);
      }
    }
  }

  async function confirmSignUp() {
    try {
      await Auth.confirmSignUp(email, authCode);
      const userValues = await Auth.signIn(email, password);
      dispatch(fetchUserFromDbById(userValues?.attributes?.sub));
      if (user.message) {
        setError(user.message);
      } else {
        setError(null);
        setUiState("signedIn");
        route.push("/");
      }
    } catch (err) {
      setError(err);
    }
  }

  async function signIn() {
    try {
      const userValues = await Auth.signIn(email, password);
      dispatch(fetchUserFromDbById(userValues?.attributes?.sub));
      setError(null);
      setUiState("signedIn");
      route.push("/");
    } catch (err) {
      setError(err);
    }
  }
  async function forgotPassword() {
    try {
      await Auth.forgotPassword(email);
      setUiState("forgotPasswordSubmit");
    } catch (err) {
      setError(err);
    }
  }
  async function forgotPasswordSubmit() {
    try {
      await Auth.forgotPasswordSubmit(email, authCode, password);
      setUiState("signIn");
    } catch (err) {
      setError(err);
    }
  }

  return (
    <div className="bg-gray-50 min-h-screen text-lg">
      <div className="flex flex-col items-center">
        <div className="mt-14">
          <div className="mb-8">
            {error && (
              <div className="bg-red-300 text-red-900 rounded shadow p-2">
                {error.message}
              </div>
            )}
          </div>
          <StyledForm className="bg-white py-14 px-16 border-gray-500 shadow rounded">
            {!uiState ||
              (uiState === "loading" && (
                <p className="font-bold">Loading ...</p>
              ))}
            {/* {uiState === "signedIn" && (
              <Profile setUiState={setUiState} onChange={onChange} />
            )} */}

            {uiState === "signUp" && (
              <SignUp
                setUiState={setUiState}
                onChange={onChange}
                signUp={signUp}
                setError={setError}
              />
            )}
            {uiState === "confirmSignUp" && (
              <ConfirmSignUp
                setUiState={setUiState}
                onChange={onChange}
                confirmSignUp={confirmSignUp}
                setError={setError}
              />
            )}
            {uiState === "signIn" && (
              <SignIn
                setUiState={setUiState}
                onChange={onChange}
                signIn={signIn}
                setError={setError}
              />
            )}
            {uiState === "forgotPassword" && (
              <ForgotPassword
                setUiState={setUiState}
                onChange={onChange}
                forgotPassword={forgotPassword}
                setError={setError}
              />
            )}
            {uiState === "forgotPasswordSubmit" && (
              <ForgotPasswordSubmit
                setUiState={setUiState}
                onChange={onChange}
                forgotPasswordSubmit={forgotPasswordSubmit}
              />
            )}
          </StyledForm>
        </div>
      </div>
    </div>
  );
};

export default AuthComponent;
