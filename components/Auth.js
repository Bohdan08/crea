// import "../src/aws-exports";
import { useEffect, useState } from "react";
// import { Auth } from "aws-amplify";
import styled from "styled-components";
import {
  ConfirmSignUp,
  ForgotPasswordSubmit,
  ForgotPassword,
  SignUp,
  SignIn,
} from "./FormComponents";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/slices/userSlice";
import { useRouter } from "next/router";

const StyledForm = styled.form`
  width: 500px !important;
`;

const AuthComponent = () => {
  const [uiState, setUiState] = useState("signIn");
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

  // useEffect(() => {
  //   checkUser();
  // }, []);

  // useEffect(() => {
  //   if (uiState === "signedIn") {
  //     route.push("/");
  //   }
  // }, [uiState]);

  // async function checkUser() {
  //   console.log("checking user...");
  //   try {
  //     setUiState("loading");
  //     const userValues = await Auth.currentAuthenticatedUser();
  //     dispatch(setUser(userValues?.attributes || {}));
  //     setUiState("signedIn");
  //   } catch (err) {
  //     console.log(err, "err");
  //     setUiState("signIn");
  //   }
  // }

  const onChange = ({ target: { name, value } }) =>
    setFormState({ ...formState, [name]: value });

  async function signUp() {
    console.log(password, "password");
    console.log(repeatedPassword, "repeatedPassword");
    if (password !== repeatedPassword) {
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
      dispatch(setUser(userValues?.attributes || {}));
      setError(null);
      setUiState("signedIn");
    } catch (err) {
      setError(err);
    }
  }

  async function signIn() {
    try {
      const userValues = await Auth.signIn(email, password);
      dispatch(setUser(userValues?.attributes || {}));
      setUiState("signedIn");
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
  console.log(uiState, "uiState");
  console.log(error, "error");
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
