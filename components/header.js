import Link from "next/link";
import Image from "next/image";

// style scss
import styles from "./header.module.scss";

const Header = () => (
  <header className="header py-2 px-10 flex justify-between bg-white shadow">
    <Image src="/images/logo.jpeg" alt="Logo" width={100} height={100} />
    <ul className={styles.navbar}>
      <li className="cursor-not-allowed">
        <a>About</a>
      </li>

      <li>
        <Link href="/" as="/">
          <a>Bills and Statutes</a>
        </Link>
      </li>
    </ul>
  </header>
);

export default Header;
