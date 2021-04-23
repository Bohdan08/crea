import "../styles/globals.scss";
import "tailwindcss/tailwind.css";
import Header from "../components/header";

function MyApp({ Component, pageProps }) {
  return (
    <div className="min-h-screen">
      <Header />
      <div className="px-10">
        <Component {...pageProps} />
      </div>
    </div>
  );
}

export default MyApp;
