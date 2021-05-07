import Head from "next/head";
import Link from "next/link";
import Slider from "react-slick";
import { useDispatch } from "react-redux";
import { setRegion } from "../redux/slices/regionSlice";

// style
import styles from "./index.module.scss";

import { withAuthenticator, AmplifySignOut } from "@aws-amplify/ui-react";

function Home() {
  return (
    <div>
      {" "}
      Home
      <AmplifySignOut />
    </div>
  );
}

export default withAuthenticator(Home);
// const Container = ({ backgroundSelector }) => {
//   const dispatch = useDispatch();
//   return (
//     <div className={`h-screen bg-cover flex flex-row ${backgroundSelector}`}>
//       <div className="h-screen w-7/12"></div>
//       <div className="h-screen w-4/12 p-2 bg-white flex justify-center">
//         <div
//           className={`${styles["welcome-container"]} text-center font-light`}
//         >
//           <p className="text-4xl font-light">Welcome to Welobby! </p>
//           <p className="pt-5 text-2xl">
//             {" "}
//             We make politics more open and accessible.
//           </p>
//           <p className="pt-5 text-lg">
//             {" "}
//             Please choose the region you want to read news about.
//           </p>
//           <div className="pt-12 w-80 m-auto flex justify-around">
//             <Link href="/home/" as="/home/">
//               <button
//                 className="bg-blue-500 text-white text-lg py-3 w-36 rounded"
//                 onClick={() => {
//                   dispatch(setRegion("us"));
//                   localStorage.setItem("region", "us");
//                 }}
//               >
//                 <a>United States</a>
//               </button>
//             </Link>
//             <Link href="/home/" as="/home/" className="mr-2">
//               <button
//                 className="bg-gray-500 text-white text-lg py-3 w-36 rounded"
//                 onClick={() => {
//                   dispatch(setRegion("uk"));
//                   localStorage.setItem("region", "uk");
//                 }}
//               >
//                 {" "}
//                 <a>United Kingdom</a>
//               </button>
//             </Link>
//           </div>

//           <div></div>
//         </div>
//       </div>
//     </div>
//   );
// };

// const Home = () => {
//   const sliderSettings = {
//     autoplay: true,
//     fade: true,
//     speed: 1500,
//     autoplaySpeed: 8000,
//     cssEase: "linear",
//     infinite: true,
//     pauseOnHover: false,
//   };

//   return (
//     <>
//       <div>
//         <Head>
//           <title>Welobby</title>
//           <script src="https://cdn.auth0.com/js/auth0/9.11/auth0.min.js"></script>
//           <link rel="icon" href="/favicon.ico" />
//         </Head>

//         <Slider {...sliderSettings}>
//           <Container backgroundSelector="us-banner" />
//           <Container backgroundSelector="uk-banner" />
//         </Slider>
//       </div>
//     </>
//   );
// };

// export default Home;
