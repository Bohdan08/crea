import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { Auth } from "aws-amplify";
import styled from "styled-components";
import { resetUser } from "../redux/slices/userSlice";
import { useEffect } from "react";
import { setRegion } from "../redux/slices/regionSlice";

const StyledNavBar = styled.ul`
  li {
    padding-left: 1rem;
    padding-right: 1rem;
  }
`;

const Header = () => {
  const { user, region } = useSelector((store) => store);
  const { currentRegion } = region;
  const router = useRouter();

  const dispatch = useDispatch();

  useEffect(() => {
    console.log(router, "use effect");
    if (localStorage.getItem("region") !== currentRegion) {
      dispatch(setRegion(localStorage.getItem("region")));
    }
  }, []);

  // useEffect(() => {
  //   if (router.pathname === "/") {
  //     console.log("remove items");
  //     localStorage.removeItem("region");
  //     dispatch(setRegion(""));
  //   }
  // }, [router]);

  // console.log(region.currentRegion, "region");
  return currentRegion && currentRegion !== "uk" ? (
    <header className="header py-2 px-10 flex bg-white shadow">
      <Link href={`/${currentRegion}/`}>
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
            <Link href={`/${currentRegion}/`}>
              <a>Home</a>
            </Link>
          </li>

          {/* <li>
            <Link href="/posts/" as="/posts/">
              <a>Bills</a>
            </Link>
          </li> */}
          {/* <li>
            <Link href="/bills/" as="/bills/">
              <a>Bills</a>
            </Link>
          </li> */}
          {user?.data && (
            <li>
              <Link href="/profile/" as="/profile/">
                <a>Profile</a>
              </Link>
            </li>
          )}
        </StyledNavBar>
        {/* <ul className="float-right">
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
        </ul> */}
      </nav>
    </header>
  ) : null;
};

export default Header;
