import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
// import { Auth } from "aws-amplify";
import { resetUser, setUser } from "../redux/slices/userSlice";

// style scss
import styles from "./header.module.scss";

const Header = () => {
  // const [user, setUser] = useState(null);
  const { region, user } = useSelector((store) => store);
  const { currentRegion } = region;
  const router = useRouter();

  const dispatch = useDispatch();

  // useEffect(() => {
  //   if (!user || !Object.entries(user).length) {
  //     checkUser();
  //   }
  //   // checkUser();
  // }, []);

  // async function checkUser() {
  //   console.log("checking user from Header...");
  //   try {
  //     const userValues = await Auth.currentAuthenticatedUser();
  //     dispatch(setUser(userValues?.attributes || {}));
  //   } catch (err) {
  //     dispatch(resetUser());
  //     router.push("/");
  //   }
  // }

  // // async function checkUser() {
  //   let formattedUserPayload = {};

  //   const userData = await Auth.currentAuthenticatedUser();

  //   if (userData) {
  //     Object.entries(userData).forEach(([key, value]) => {
  //       if (key === "username") {
  //         formattedUserPayload["username"] = value;
  //       } else if (key === "attributes") {
  //         formattedUserPayload = { ...formattedUserPayload, ...value };
  //       }
  //     });

  //     // dispatch(setUser(formattedUserPayload));
  //   }
  // }

  console.log(currentRegion, "currentRegion");
  return (
    <header className="header py-2 px-10 flex bg-white shadow">
      <Link href="/home" as="/home">
        <a>
          <Image
            src="/images/logo.jpeg"
            alt="Logo"
            width={100}
            height={100}
            className="cursor-pointer"
          />
        </a>
      </Link>
      <ul
        className={`${styles.navbar} block m-auto text-xl font-light pl-10 w-full`}
      >
        <li>
          <Link href="/home/" href="/home/">
            <a>Home</a>
          </Link>
        </li>

        <li>
          <Link href="/posts/" as="/posts/">
            <a>Bills</a>
          </Link>
        </li>
        {user && (
          <li>
            <Link href="/profile/" as="/profile/">
              <a>Profile</a>
            </Link>
          </li>
        )}
        <div className="float-right">
          {!user ? (
            <li className="float-right">
              <Link href="/auth/">
                <a>Sign In</a>
              </Link>
            </li>
          ) : (
            <li className="float-right">
              <button
                type="submit"
                className="focus:outline-none"
                onClick={() => {
                  console.log("sign out");
                  {
                    /* Auth.signOut(); */
                  }
                  dispatch(resetUser());
                  router.push("/");
                }}
              >
                <span className="font-light">Sign out</span>
              </button>
            </li>
          )}
        </div>
      </ul>
    </header>
  );
};

export default Header;
