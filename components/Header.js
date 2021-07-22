import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { Auth } from "aws-amplify";
import styled from "styled-components";
import { resetUser } from "../redux/slices/userSlice";

const StyledNavBar = styled.ul`
  li {
    padding-left: 1rem;
    padding-right: 1rem;
  }
`;

const Header = () => {
  const { user } = useSelector((store) => store);
  const router = useRouter();

  const dispatch = useDispatch();

  return (
    <header className="header py-2 px-10 flex bg-white shadow">
      <Link href="/">
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
      <nav className="flex flex-row justify-between items-center text-xl font-light pl-10 w-full">
        <StyledNavBar className="flex flex-row">
          <li>
            <Link href="/">
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
        </StyledNavBar>
        <ul className="float-right">
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
        </ul>
      </nav>
    </header>
  );
};

export default Header;
