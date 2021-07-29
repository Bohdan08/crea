import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import {
  API_PAGE_SIZE,
  API_US_GOV_INFO_BILL_SUMMARY,
  API_US_GOV_INFO_BILLS,
} from "../../../shared/constants";

const StyledNavBar = styled.ul`
  li {
    padding: 0.5rem;
    border-right: 2px solid #e5e7eb;
  }
`;

const MENU_LIST = ["Overview", "Summary", "Details", "Text", "Your Vote"];

const Bill = ({ data }) => {
  const { title, currentChamber, billNumber } = data;
  const route = useRouter();

  const [activeMenuItem, setActiveMenuItem] = useState(MENU_LIST[0]);
  // const route = useRouter();
  // console.log(route, "route");

  // useEffect(() => {
  //   console.log(route, "route");
  //   route.replace({
  //     url: route.pathname,
  //     as: route.asPath,
  //     options: {
  //       section: "test",
  //     },
  //   });
  // }, [activeMenuItem]);
  return (
    <div className="my-12 mx-auto max-w-screen-lg px-10">
      <h1 className="text-2xl font-medium">
        {currentChamber.slice(0, 1)}. {billNumber}: {title}
      </h1>
      <div id="bill-menu" className="mt-6 text-xl">
        <nav className="border-2 rounded shadow-sm">
          <StyledNavBar className="flex flex-row ">
            {MENU_LIST.map((menuItem) => (
              <li
                key={menuItem}
                className={`${
                  activeMenuItem === menuItem ? "bg-gray-200" : ""
                }  `}
              >
                {menuItem}
              </li>
            ))}
          </StyledNavBar>
        </nav>
      </div>
    </div>
  );
};

const todaysData = () => {
  let date = new Date();
  // set midnight
  date.setHours(0, 0, 0, 0);

  return date.toISOString().split(".")[0] + "Z";
};

export async function getStaticPaths() {
  const res = await fetch(
    `${API_US_GOV_INFO_BILLS}/${todaysData()}?offset=0&pageSize=${API_PAGE_SIZE}&api_key=X2Jml3Y7OxdHkmo7iOGQ4to6S4lk9Puv5qwCq4Sb`
  );

  const billPackagesData = await res.json();

  return {
    paths: billPackagesData.packages.map(({ packageId }) => ({
      params: { packageId },
    })),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const res = await fetch(
    `${API_US_GOV_INFO_BILL_SUMMARY}/BILLS-117sres99rs/summary?api_key=X2Jml3Y7OxdHkmo7iOGQ4to6S4lk9Puv5qwCq4Sb`
  );
  const json = await res.json();

  return {
    props: {
      data: json,
    },
  };
}

export default Bill;
