import Link from "next/link";
import Router, { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { API_PAGE_SIZE, API_US_GOV_INFO_BILLS } from "../../shared/constants";
import styled from "styled-components";
import router from "next/router";

const todaysData = () => {
  let today = new Date();
  // set midnight
  today.setHours(0, 0, 0, 0);

  today.setDate(today.getDate() - 1);

  return today.toISOString().split(".")[0] + "Z";
};

const StyledCardContainer = styled.div`
  &:hover {
    border-color: lightseagreen;
  }

  &:hover .icon-arrow {
    color: lightseagreen;
  }
`;

const StyledFontAwesomeIconArrowRight = styled(FontAwesomeIcon)`
  top: 8px;
  right: 5px;
  color: transparent;
`;

const InnerInfoBox = ({ title, description }) => (
  <div className="border-2 w-3/12 mx-2 text-xl  p-2 rounded text-center">
    <p className="font-bold">{title}</p>
    <p>{description}</p>
  </div>
);

const getRandomInt = (max) => Math.floor(Math.random() * max).toLocaleString();

const formatDate = (dateStr) => new Date(dateStr).toString().slice(4, 15);

const Bills = ({ data }) => {
  const { count, nextPage, packages, previousPage, error } = data || {};

  const [billsData, setBillsData] = useState([]);
  // const [currentPageSize, setCurrentPageSize] = useState(API_PAGE_SIZE);
  // const [currentDate, setCurrentDate] = useState(todaysData());
  // const [loading, setLoading] = useState(false);
  // const startLoading = () => setLoading(true);
  // const stopLoading = () => setLoading(false);

  // Set up bills data

  useEffect(() => {
    if (packages?.length) {
      setBillsData(packages);
    }
  }, [packages]);

  // const fetchData = async () => {
  //   const res = await fetch(
  //     `${API_US_GOV_INFO_BILLS}/${todaysData()}?offset=0&pageSize=${API_PAGE_SIZE}&api_key=X2Jml3Y7OxdHkmo7iOGQ4to6S4lk9Puv5qwCq4Sb`
  //   );
  //   const json = await res.json();
  //   console.log(json, "json");
  // };

  // useEffect(() => {
  //   fetchData();
  // }, []);

  // Router event handler
  // useEffect(() => {
  //   Router.events.on("routeChangeStart", startLoading);
  //   Router.events.on("routeChangeComplete", stopLoading);
  //   return () => {
  //     Router.events.off("routeChangeStart", startLoading);
  //     Router.events.off("routeChangeComplete", stopLoading);
  //   };
  // }, []);

  // // Listen to scroll positions for loading more data on scroll
  // useEffect(() => {
  //   window.addEventListener("scroll", handleScroll);
  //   return () => {
  //     window.removeEventListener("scroll", handleScroll);
  //   };
  // });

  // // console.log(document, "document");
  // const lastComponent = document.querySelector("#bills-list");

  // console.log(lastComponent?.lastChild, "lastComponent");
  // // console.log(lastComponent, "lastComponent");

  // const fetchMoreBills = async (updatedPageSize) => {
  //   const moreBillsData = await fetch(
  //     `${API_US_GOV_INFO_BILLS}/${todaysData()}?offset=${
  //       updatedPageSize - API_PAGE_SIZE
  //     }&pageSize=${updatedPageSize}&api_key=X2Jml3Y7OxdHkmo7iOGQ4to6S4lk9Puv5qwCq4Sb`
  //   ).then((res) => res.json());

  //   console.log(moreBillsData, "moreBillsData");
  // };

  // const fetchBillsForPreviousDay = async () => {
  //   // const res = await fetch(
  //   //   `${API_US_GOV_INFO_BILLS}/${todaysData()}?offset=0&pageSize=${API_PAGE_SIZE}&api_key=X2Jml3Y7OxdHkmo7iOGQ4to6S4lk9Puv5qwCq4Sb`
  //   // );
  //   // const json = await res.json();
  //   // console.log(json, "json");
  //   // const date = new Date(currentDate);
  //   // const previousDay =
  //   //   new Date(date.setDate(date.getDate() - 1)).toISOString().split(".")[0] +
  //   //   "Z";
  //   // setCurrentDate(previousDay);
  //   // setCurrentPageSize(API_PAGE_SIZE);
  //   // const previousDayBills = await fetch(
  //   //   `${API_US_GOV_INFO_BILLS}/${previousDay}?offset=0&pageSize=${API_PAGE_SIZE}&api_key=X2Jml3Y7OxdHkmo7iOGQ4to6S4lk9Puv5qwCq4Sb`
  //   // ).then((res) => res.json());
  //   // console.log(previousDayBills, "previousDayBills");
  // };

  // const handleScroll = () => {
  //   // To get page offset of last user
  //   const lastFetchedBill = document?.querySelector("#bills-list")?.lastChild;

  //   if (lastFetchedBill) {
  //     const lastFetchedhBillOffset =
  //       lastFetchedBill.offsetTop + lastFetchedBill.clientHeight;
  //     const pageOffset = window.pageYOffset + window.innerHeight;

  //     if (pageOffset < lastFetchedhBillOffset) {
  //       startLoading(true);

  //       if (!nextPage) {
  //         fetchBillsForPreviousDay();
  //       }

  //       //
  //       // if (!nextPage) {
  //       //   // console.log(nextPage, "nextPage");
  //       //   const aggregatedPageSize = currentPageSize + API_PAGE_SIZE;

  //       //   setCurrentPageSize(currentPageSize + API_PAGE_SIZE);

  //       //   fetchMoreBills(aggregatedPageSize);
  //       // }
  //     }
  //   }
  // };

  return (
    <div className="my-12 mx-auto max-w-screen-lg px-10">
      <div className="mb-2">
        <h1 className="text-4xl font-semibold ">Congressional bills</h1>
        <p className="text-lg mt-5 text-gray-500 pb-5">
          Congressional bills are legislative proposals from the House of
          Representatives and Senate within the United States Congress.
        </p>
        <hr />
      </div>
      <div className="flex flex-row flex-wrap justify-start" id="bills-list">
        {billsData?.length && billsData[0] ? (
          <>
            <div className="text-xl text-gray-800 my-2">
              {count} bills were last modified on{" "}
              {formatDate(billsData[0].dateIssued)}.
            </div>
            {billsData.map(
              ({ packageId, congress, title, lastModified, dateIssued }) => {
                return (
                  <div key={packageId} className="bill-item py-2 my-2 w-full">
                    <Link
                      /* href="bills/bill/[packageId]"
                      as={`bills/bill/${packageId}`} */
                      href="usa/bills/[packageId]"
                      as={`usa/bills/${packageId}`}
                    >
                      <StyledCardContainer className="cursor-pointer relative py-4 border-2 bg-white rounded-lg text-lg">
                        <StyledFontAwesomeIconArrowRight
                          className="h-6 w-6 absolute icon-arrow"
                          icon="arrow-right"
                        />
                        <div className="w-full">
                          <div className="px-4">
                            <p className="text-xl font-light pl-2">{title}</p>
                            <div className="flex w-full mt-5 justify-around">
                              <InnerInfoBox
                                title="Congress"
                                description={congress}
                              />
                              <InnerInfoBox
                                title="Introduced"
                                description={formatDate(dateIssued)}
                              />
                              <InnerInfoBox
                                title="Last Modified"
                                description={formatDate(lastModified)}
                              />
                              <InnerInfoBox
                                title="Comments"
                                description={getRandomInt(2000)}
                              />
                            </div>
                            {/* <div className="flex w-full mt-5 justify-around">
                          <button className="w-3/12 mx-1 rounded-full py-2 border-2 border-gray-600 cursor-pointer text-center rounded focus:outline-none focus:ring-2">
                            {" "}
                            Summary{" "}
                          </button> 
                        </div> */}
                          </div>
                          <div className="flex w-full items-center justify-left border-t-2 pl-6 mt-4">
                            <div className="flex flex-row mt-4">
                              <div className="flex flex-row">
                                <button className="rounded-full flex items-center border p-2 bg-blue-600 focus:outline-none focus:ring-2">
                                  <FontAwesomeIcon
                                    icon="thumbs-up"
                                    color="white"
                                  />
                                </button>
                                <span className="text-gray-500 mt-1 ml-1">
                                  {getRandomInt(100)}
                                </span>
                              </div>

                              <div className="flex flex-row ml-3">
                                <button className="rounded-full flex items-center border p-2 bg-red-600 focus:outline-none focus:ring-2">
                                  <FontAwesomeIcon
                                    icon="thumbs-down"
                                    color="white"
                                  />
                                </button>
                                <span className="text-gray-500 mt-1 ml-1">
                                  {getRandomInt(100)}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </StyledCardContainer>
                    </Link>
                  </div>
                );
              }
            )}
          </>
        ) : error ? (
          <div className="my-4 bg-red-500 text-white p-2 rounded w-full text-center text-xl">
            <div className="relative -top-0.5">ERROR: {error.code}</div>
            <div className="relative -top-0.5">{error.message}</div>
          </div>
        ) : (
          <div className="center-element text-2xl">
            No bills were made on {todaysData().slice(0, 10)}
          </div>
        )}
      </div>
    </div>
  );
};

export async function getStaticProps() {
  const res = await fetch(
    `${API_US_GOV_INFO_BILLS}/${todaysData()}?offset=0&pageSize=${API_PAGE_SIZE}&api_key=${
      process.env.GOV_US_API_KEY
    }`
  );
  const json = await res.json();

  return {
    props: {
      data: json,
    },
  };
}

export default Bills;
