import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { useUser } from "@auth0/nextjs-auth0";
import { useSelector } from "react-redux";

// style scss
import styles from "./header.module.scss";

const Header = () => {
  const { user } = useUser();
  const region = useSelector((state) => state.region.value);
  const router = useRouter();

  return router.pathname !== "/" ? (
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
          {/* <li className="float-right">
            <Link href="/singup" as="/signup">
              <a>Sign up</a>
            </Link>
          </li> */}

          {!user ? (
            <li className="float-right">
              <Link href="/api/auth/login">
                <a>Login</a>
              </Link>
            </li>
          ) : (
            <li className="float-right">
              <Link href="/api/auth/logout">
                <a>Log out</a>
              </Link>
            </li>
          )}
        </div>
      </ul>
    </header>
  ) : null;
};

export default Header;
