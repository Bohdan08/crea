import Link from "next/link";
import Image from "next/image";

// style scss
import styles from "./header.module.scss";

const Header = () => {
  return (
    <header className="header py-2 px-10 flex  bg-white shadow">
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
        className={`${styles.navbar} block m-auto text-2xl font-light pl-10 w-full`}
      >
        <li>
          <Link href="/" as="/">
            <a>Home</a>
          </Link>
        </li>

        <li>
          <Link href="/posts/" as="/posts/">
            <a>Bills and Statutes</a>
          </Link>
        </li>
        <div className="float-right">
          <li className="float-right">
            <Link href="/api/auth/login">
              <a>Sign in</a>
            </Link>
          </li>

          <li className="float-right">
            <Link href="/api/auth/logout">
              <a>Sign out</a>
            </Link>
          </li>
        </div>
      </ul>
    </header>
  );
};

export default Header;
