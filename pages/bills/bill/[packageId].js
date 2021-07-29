import { useRouter } from "next/router";
import React from "react";
import {
  API_PAGE_SIZE,
  API_US_GOV_INFO_BILL_SUMMARY,
  API_US_GOV_INFO_BILLS,
} from "../../../shared/constants";

const Bill = (props) => {
  console.log(props, "propsBulls");
  // const route = useRouter();
  // console.log(route, "route");

  return <div>Bill</div>;
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
  console.log(params.id,'params.id')
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
