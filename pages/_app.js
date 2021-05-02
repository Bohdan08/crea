import { Provider } from "next-auth/client";
import Header from "../components/header";

// styles
import "../styles/globals.scss";
import "tailwindcss/tailwind.css";

const App = ({ Component, pageProps }) => (
  <Provider session={pageProps.session}>
    <div className="min-h-screen">
      <Header />
      <Component {...pageProps} />
    </div>
  </Provider>
);

export default App;
