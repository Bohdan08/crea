import Link from "next/link";
import Image from "next/image";
import { signIn, signOut, useSession } from "next-auth/client";

// style scss
import styles from "./header.module.scss";
const Header = () => {
  const [session] = useSession();

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
          {!session ? (
            <>
              <li className="float-right">
                <Link href="/auth" as="/auth">
                  <button onClick={() => signIn()}>Sign in</button>
                </Link>
              </li>
              <button>
                <Link href="/secret">To the secret</Link>
              </button>
            </>
          ) : (
            <>
              <button>
                <Link href="/secret">To the secret</Link>
              </button>
              <li className="float-right">
                <button onClick={() => signOut()}>Sign out</button>
              </li>
            </>
          )}
        </div>
      </ul>
    </header>
  );
};

export default Header;
