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
  faFlagCheckered,
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
  faThumbsDown,
  faFlagCheckered
);

// styles
import "../styles/globals.scss";
import "tailwindcss/tailwind.css";
import "sweetalert2/src/sweetalert2.scss";

// AWS
import Amplify from "aws-amplify";
import config from "../src/aws-exports";

Amplify.configure(config);

const App = ({ Component, pageProps }) => (
  <Provider store={store}>
    <Head>
      <script
        async
        defer
        src={`https://maps.googleapis.com/maps/api/js?key=${process.env.GEO_LOCATION_API}&libraries=places`}
      />
    </Head>
    <div className="min-h-screen">
      <Header />
      <Component {...pageProps} className="px-10" />
    </div>
  </Provider>
);

export default App;
