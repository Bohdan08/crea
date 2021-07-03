import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { Auth } from "aws-amplify";
import { resetUser } from "../redux/slices/userSlice";

// style scss
import styles from "./header.module.scss";

const Header = () => {
  const { region, user } = useSelector((store) => store);
  const { currentRegion } = region;
  const router = useRouter();

  const dispatch = useDispatch();

  return (
    <header
      className={`header py-2 px-10 flex bg-white shadow ${
        currentRegion ? "" : "hidden"
      }`}
    >
      <Link href="/" as="/">
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
          <Link href="/" href="/">
            <a>Home</a>
          </Link>
        </li>

        <li>
          <Link href="/posts/" as="/posts/">
            <a>Bills</a>
          </Link>
        </li>
        {user?.data && (
          <li>
            <Link href="/profile/" as="/profile/">
              <a>Profile</a>
            </Link>
          </li>
        )}
        <div className="float-right">
          {!user?.data ? (
            <li className="float-right">
              <Link href="/auth/">
                <a>Sign In</a>
              </Link>
            </li>
          ) : (
            <li className="float-right">
              <button
                type="submit"
                onClick={() => {
                  Auth.signOut();
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
