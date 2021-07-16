import React, { useEffect } from "react";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope, faLock, faUser, faExclamationCircle } from "@fortawesome/free-solid-svg-icons";
import Header from "../components/Header";
import { Provider } from "react-redux";
import store from "../redux/store";

// icons
library.add(fab, faUser, faLock, faEnvelope, faExclamationCircle);

// styles
import "../styles/globals.scss";
import "tailwindcss/tailwind.css";
import "sweetalert2/src/sweetalert2.scss";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// aws
import Amplify from "aws-amplify";
import config from "../src/aws-exports";
import Head from "next/head";
Amplify.configure(config);

const App = ({ Component, pageProps }) => {
  // useEffect(() => {
  //   checkUser();
  // }, []);

  // // const dispatch = useDispatch();

  // const route = useRouter();

  // async function checkUser() {
  //   console.log("checking user...");
  //   try {
  //     // setUiState("loading");
  //     await Auth.currentAuthenticatedUser();
  //     // dispatch(setUser(userValues?.attributes || {}));
  //     route.push("/");
  //   } catch (err) {
  //     console.log(err, "err");
  //   }
  // }

  return (
    <Provider store={store}>
      <Head>
        <script
          async
          defer
          src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDdbxYCdWwJJynWZsnsyB0baAvOA6UiK5A&libraries=places"
        ></script>
      </Head>
      <div className="min-h-screen">
        <Header />
        <Component {...pageProps} />
      </div>
    </Provider>
  );
};

export default App;
