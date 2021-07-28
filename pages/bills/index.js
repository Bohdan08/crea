import Link from "next/link";
import React, { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { API_PAGE_SIZE, API_US_GOV_INFO_BILLS } from "../../shared/constants";
import styled from "styled-components";

const StyledCardContainer = styled.div``;

const InnerInfoBox = ({ title, description }) => (
  <div className="border-2 w-3/12 mx-2 text-xl  p-2 rounded text-center">
    <p className="font-bold">{title}</p>
    <p>{description}</p>
  </div>
);

const getRandomInt = (max) => Math.floor(Math.random() * max).toLocaleString();

const Bills = ({ data }) => {
  const { count, message, nextPage, packages, previousPage } = data;
  console.log(data, "data");

  //

  // Listen to scroll positions for loading more data on scroll
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  });

  // console.log(document, "document");
  // const lastComponent = document.getElementById("bills-list");
  // console.log(lastComponent, "lastComponent");
  const handleScroll = () => {
    // To get page offset of last user
    // const lastUserLoaded = document.querySelector(
    //   ".user-list > .user:last-child"
    // );
    // if (lastUserLoaded) {
    //   const lastUserLoadedOffset =
    //     lastUserLoaded.offsetTop + lastUserLoaded.clientHeight;
    //   const pageOffset = window.pageYOffset + window.innerHeight;
    //   // Detects when user scrolls down till the last user
    //   if (pageOffset > lastUserLoadedOffset) {
    //     // Stops loading
    //     if (userData.curPage < userData.maxPage) {
    //       // Trigger fetch
    //       const query = router.query;
    //       query.page = parseInt(userData.curPage) + 1;
    //       router.push({
    //         pathname: router.pathname,
    //         query: query,
    //       });
    //     }
    //   }
    // }
  };

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
        {data?.packages?.length &&
          data.packages.map(
            ({ packageId, congress, title, lastModified, dateIssued }, key) => {
              const formatDate = (dateStr) =>
                new Date(dateStr).toString().slice(4, 15);

              return (
                <div
                  key={packageId}
                  className="py-2 
                  my-2 w-full"
                >
                  {/* >
                  <Link
                    href="bills/billd/[packageId]/[packageId]"
                    as={`posts/post/${packageId}/packageId`}
                  > */}
                  <div
                    className="post-container_  py-2 border-2 bg-white rounded-lg text-lg 
                  "
                  >
                    <StyledCardContainer className="w-full">
                      <div className="px-4">
                        {/* <FontAwesomeIcon
                      className="h-6 w-6 post-arrow"
                      icon="arrow-right"
                    /> */}
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
                        <div className="flex w-full mt-5 justify-around">
                          <button className="w-3/12 mx-1 rounded-full py-2 border-2 border-gray-600 cursor-pointer text-center rounded focus:outline-none focus:ring-2">
                            {" "}
                            Summary{" "}
                          </button>
                          <button className="w-3/12 mx-1 rounded-full py-2 border-2 border-gray-600 cursor-pointer text-center rounded hover:border-black focus:outline-none focus:ring-2">
                            {" "}
                            Full Text{" "}
                          </button>
                          <button className="w-3/12 mx-1 rounded-full py-2 border-2 border-gray-600 cursor-pointer text-center rounded hover:border-black focus:outline-none focus:ring-2">
                            {" "}
                            Details{" "}
                          </button>
                          <button className="w-3/12 mx-1 rounded-full py-2 border-2 border-gray-600 cursor-not-allowed text-center rounded opacity-70 focus:outline-none focus:ring-2">
                            {" "}
                            Your vote{" "}
                          </button>
                        </div>
                      </div>
                      <div className="flex w-full items-center justify-left border-t-2 pl-6 mt-4">
                        <div className="flex flex-row mt-2">
                          <div className="flex flex-row">
                            <button className="rounded-full flex items-center border p-2 bg-blue-600 focus:outline-none focus:ring-2">
                              <FontAwesomeIcon icon="thumbs-up" color="white" />
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
                    </StyledCardContainer>
                  </div>

                  {/* </Link> */}
                </div>
              );
            }
          )}
      </div>
    </div>
  );
};

export async function getStaticProps() {
  let date = new Date();
  // set midnight
  date.setHours(0, 0, 0, 0);

  const todaysDate = date.toISOString().split(".")[0] + "Z";

  const res = await fetch(
    `${API_US_GOV_INFO_BILLS}/${todaysDate}?offset=0&pageSize=${API_PAGE_SIZE}&api_key=X2Jml3Y7OxdHkmo7iOGQ4to6S4lk9Puv5qwCq4Sb`
  );
  const json = await res.json();

  return {
    props: {
      data: json,
    },
  };
}

export default Bills;
