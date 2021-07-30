import React from "react";
import Head from "next/head";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import {
  faEnvelope,
  faLock,
  faUser,
  faExclamationCircle,
  faMinusCircle,
  faSearchLocation,
  faTimes,
  faInfo,
  faEdit,
  faArrowRight,
  faThumbsUp,
  faThumbsDown,
} from "@fortawesome/free-solid-svg-icons";
import Header from "../components/Header";
import { Provider } from "react-redux";
import store from "../redux/store";

// icons
library.add(
  fab,
  faUser,
  faLock,
  faEnvelope,
  faExclamationCircle,
  faMinusCircle,
  faSearchLocation,
  faTimes,
  faInfo,
  faEdit,
  faArrowRight,
  faThumbsUp,
  faThumbsDown
);

// styles
import "../styles/globals.scss";
import "tailwindcss/tailwind.css";
import "sweetalert2/src/sweetalert2.scss";

// AWS
import Amplify from "aws-amplify";
import config from "../src/aws-exports";

Amplify.configure(config);

const App = ({ Component, pageProps }) => {
  //  Prod Link
  // `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GEO_LOCATION_API}&libraries=places`;
  // AIzaSyDdbxYCdWwJJynWZsnsyB0baAvOA6UiK5A

  return (
    <Provider store={store}>
      <Head>
        <script
          async
          defer
          src={`https://maps.googleapis.com/maps/api/js?key=AIzaSyDdbxYCdWwJJynWZsnsyB0baAvOA6UiK5A&libraries=places`}
        ></script>
      </Head>
      <div className="min-h-screen">
        <Header />
        <Component {...pageProps} className="px-10" />
      </div>
    </Provider>
  );
};

export default App;
