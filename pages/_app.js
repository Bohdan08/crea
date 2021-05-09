import React from "react";
import Header from "../components/Header";
import { Provider } from "react-redux";
import store from "../redux/store";

// styles
import "../styles/globals.scss";
import "tailwindcss/tailwind.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// aws
import Amplify from "aws-amplify";
import config from "../src/aws-exports";
Amplify.configure(config);

const App = ({ Component, pageProps }) => {
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
