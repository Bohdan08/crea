/* old auth */

// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { API, Auth } from "aws-amplify";
// import { withAuthenticator, AmplifySignOut } from "@aws-amplify/ui-react";
// import { useRouter } from "next/router";
// import { listUsers } from "../src/graphql/queries";
// import { updateUser } from "../src/graphql/mutations";
// import { setUser } from "../redux/slices/userSlice";

// const AuthComponent = () => {
//   const { user } = useSelector((state) => state.user);
//   const route = useRouter();
//   // console.log(user, "user");
//   const dispatch = useDispatch();
//   // const [user, ]
//   // const [user, setUser] = useState(null);
//   const [posts, setPosts] = useState([]);
// useEffect(() => {
//   //
//   // updateUser();
//   if (!user || !Object.entries(user).length) {
//     checkUser();
//   } else {
//     route.push("/profile");
//   }
// }, []);

//   async function checkUser() {
//     let formattedUserPayload = {};

//     const userData = await Auth.currentAuthenticatedUser();

//     // set user to redux if one exists
//     if (userData) {
//       Object.entries(userData).forEach(([key, value]) => {
//         if (key === "username") {
//           formattedUserPayload["username"] = value;
//         } else if (key === "attributes") {
//           formattedUserPayload = { ...formattedUserPayload, ...value };
//         }
//       });

//       dispatch(setUser(formattedUserPayload));

//       // redirect user to their profile
//       route.push("/profile");
//     }
//   }

//   async function updateUserFunc() {
//     console.log("confirmSignUp");
//     const user = await Auth.currentAuthenticatedUser();
//     await Auth.updateUserAttributes(user, {
//       address: "Brand new Adress ",
//       email: "bodya.martynyuck@yandex.com",
//       ["custom:Example"]: "Example",
//     });

//     // console.log("success");

//     // console.log(user, "useruser");
//     modifiyUser();
//     console.log("updated");
//   }

//   useEffect(() => {
//     fetchPosts();
//   }, []);

//   async function fetchPosts() {
//     const postData = await API.graphql({
//       query: listUsers,
//     });
//     setPosts(postData.data.listUsers);
//   }

//   async function modifiyUser() {
//     // console.log(updateUser, "updateUser");
//     // const postData = await API.graphql({
//     //   query: updateUser,
//     // });
//     console.log("update success");
//     // console.log("USER UPDATE");
//     const updateUserConst = await API.graphql({
//       query: updateUser,
//       variables: {
//         // createdAt: "Some Date",
//         input: {
//           id: "716ab367-c737-4521-bb1b-fe32c00901fe",
//           username: "username",
//           email: "bodya.martynyuck@yandex.com",
//           // createdAt: "created",
//           // updatedAt: "2021-05-08T17:21:42.104Z",
//         },
//       },
//       authMode: "AMAZON_COGNITO_USER_POOLS",
//     });

//     console.log("h");
//   }

//   // console.log(user, "user");
//   // console.log(posts, "useruser");

//   return (
//     <div>
//       Home
//       <p> google </p>
//       <p> Add or Update My Info </p>
//       <button
//         onClick={() => {
//           console.log("update User");
//           updateUserFunc();
//           checkUser();
//         }}
//       >
//         Update me
//       </button>
//       {/* <AmplifySignOut className="background-red-400" /> */}
//       <button type="submit" onClick={() => Auth.signOut()}>
//         Sign out
//       </button>
//     </div>
//   );
// };

// export default withAuthenticator(AuthComponent);

// | import "../src/configureAmplify";
import "../src/aws-exports";
import { useEffect, useState } from "react";
import { Auth } from "aws-amplify";
import styled from "styled-components";
import Profile from "../components/Profile";
import {
  ConfirmSignUp,
  ForgotPasswordSubmit,
  ForgotPassword,
  SignUp,
  SignIn,
} from "../components/FormComponents";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/slices/userSlice";
import { useRouter } from "next/router";

const StyledForm = styled.form`
  width: 500px !important;
`;

const App = () => {
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

  useEffect(() => {
    checkUser();
  }, []);

  useEffect(() => {
    if (uiState === "signedIn") {
      route.push("/profile");
    }
  }, [uiState]);

  async function checkUser() {
    console.log("checking user...");
    try {
      setUiState("loading");
      let userValues = await Auth.currentAuthenticatedUser();
      setUiState("signedIn");
      dispatch(setUser(userValues?.attributes || {}));
    } catch (err) {
      console.log(err, "err");
      setUiState("signIn");
    }
  }

  const onChange = ({ target: { name, value } }) =>
    setFormState({ ...formState, [name]: value });

  async function signUp() {
    if (password !== repeatedPassword) {
      setError({ message: "Passwords don't match" });
      return;
    }
    try {
      await Auth.signUp({ username: email, password, attributes: { email } });
      setUiState("confirmSignUp");
    } catch (err) {
      setError(err);
    }
  }

  async function confirmSignUp() {
    try {
      await await Auth.confirmSignUp(email, authCode);
      const userValues = await Auth.signIn(email, password);
      dispatch(setUser(userValues?.attributes || {}));
      setUiState("signedIn");
    } catch (err) {
      setError(err);
    }
  }

  async function signIn() {
    try {
      await Auth.signIn(email, password);
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
          <StyledForm className="bg-white py-14 px-16 border-gray-500  shadow rounded">
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

export default App;
