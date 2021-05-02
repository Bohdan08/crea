import Header from "../components/header";
import { UserProvider } from "@auth0/nextjs-auth0";

// styles
import "../styles/globals.scss";
import "tailwindcss/tailwind.css";

const App = ({ Component, pageProps }) => (
  <UserProvider>
    <div className="min-h-screen">
      <Header />
      <Component {...pageProps} />
    </div>
  </UserProvider>
);

export default App;
