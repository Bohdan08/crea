import React, { useEffect } from "react";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope, faLock, faUser } from "@fortawesome/free-solid-svg-icons";
import Header from "../components/Header";
import { Provider, } from "react-redux";
import store from "../redux/store";

// icons
library.add(fab, faUser, faLock, faEnvelope);

// styles
import "../styles/globals.scss";
import "tailwindcss/tailwind.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// aws
import Amplify, { Auth } from "aws-amplify";
import config from "../src/aws-exports";
import { useRouter } from "next/router";
Amplify.configure(config);

const App = ({ Component, pageProps }) => {
  useEffect(() => {
    checkUser();
  }, []);

  // const dispatch = useDispatch();

  const route = useRouter();

  async function checkUser() {
    console.log("checking user...");
    try {
      // setUiState("loading");
      await Auth.currentAuthenticatedUser();
      // dispatch(setUser(userValues?.attributes || {}));
      route.push("/");
    } catch (err) {
      console.log(err, "err");
    }
  }

  return (
    <Provider store={store}>
      <div className="min-h-screen">
        <Header />
        <Component {...pageProps} />
      </div>
    </Provider>
  );
};

export default App;
