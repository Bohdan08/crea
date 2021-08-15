import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import Swal from "sweetalert2";
import {
  API_PAGE_SIZE,
  API_US_GOV_INFO_BILL_SUMMARY,
  API_US_GOV_INFO_BILLS,
} from "../../../../shared/constants";

const StyledNavBar = styled.ul`
  li {
    padding: 0.5rem 1rem;
    border-right: 2px solid #e5e7eb;
    width: 100%;
    text-align: center;
  }

  li:last-child {
    border-right: none;
  }
`;

const StyledMenu = styled.ul`
  li {
    display: flex;
    flex-direction: row;
    align-items: center;
    padding-top: 1rem;
  }
`;

const StyledChatContainer = styled.div`
  position: relative;
  margin: 0 1rem;
  height: 100%;
  min-height: 600px;
  max-height: 600px;
  overflow: scroll;
`;

const MENU_LIST = ["Overview", "Summary", "Text"];

const OverviewBulletPoint = ({ children }) => (
  <div className="p-1 bg-blue-800 text-white rounded mr-2 w-32 text-center">
    {" "}
    {children}{" "}
  </div>
);

// const convertXMLtoJSON = (xml) => {
//   let jsonRes = "";
//   const parseString = require("xml2js").parseString;

//   parseString(xml, (err, parsedData) => {
//     jsonRes = parsedData;
//   });

//   return jsonRes;
// };

const BillOverview = ({ data }) => {
  const {
    packageId,
    dateIssued,
    title,
    currentChamber,
    billNumber,
    congress,
    publisher,
    suDocClassNumber,
    members,
    committees,
    lastModified,
    htmlData,
    shortTitle,
  } = data;

  /* States */

  const currentVotePercentage = Math.floor(Math.random() * 100) + 1;
  const [currentSupport, setCurrentSupport] = useState(currentVotePercentage);
  const [initSupport, setinitSupport] = useState(currentVotePercentage);

  const [voted, setVoted] = useState(false);
  const [votedAgainst, setVotedAgainst] = useState(false);
  const [votedFor, setVotedFor] = useState(false);

  /* Redux */
  const { user } = useSelector((state) => state);

  const [activeMenuItem, setActiveMenuItem] = useState(MENU_LIST[0]);

  const router = useRouter();

  useEffect(() => {
    // Always do navigations after the first render
    router.replace(`/usa/bills/${packageId}?section=Overview`, undefined, {
      shallow: true,
    });
  }, []);

  const SuggestToSignUp = ({ isAgainst }) => (
    <>
      <div
        className={`absolute bottom-0 h-36 bg-white border-t-2  w-full ${
          isAgainst ? "border-red-500" : "border-green-500"
        }`}
      >
        {!user || !user.data || !user.data.profileCompleted ? (
          <div className="m-auto flex flex-col items-center p-2">
            <div>
              Please sign up and fill out a questionnare in order to be able to
              leave your comment.
              <br />
              <button
                className="text-center bg-blue-600 text-white rounded p-2 mt-2 w-full"
                onClick={() => {
                  router.push("/auth");
                }}
              >
                Sign Up
              </button>
            </div>
          </div>
        ) : (
          <div className="m-auto flex flex-col p-2">
            <textarea className="border-2 h-16 rounded mt-2 p-2" />
            <button className="mt-2 rounded h-8 bg-blue-600 text-white">
              Leave a comment
            </button>
          </div>
        )}
      </div>
    </>
  );

  const suggestToSignUpModal = () =>
    Swal.fire({
      title: "Not Authorized",
      text: "You need to sign up and fill out a questionnare in order to vote.",
      icon: "info",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, sign up!",
    }).then(({ isConfirmed }) => {
      if (isConfirmed) {
        router.push("/auth");
      }
    });

  return (
    <div className="my-12 mx-auto max-w-screen-2xl px-10">
      <div className="text-center">
        <h2 className="text-2xl font-medium">Your vote</h2>
        <div className="flex flex-row mt-6">
          <div className="w-3/12">
            <button
              onClick={() => {
                // suggest to sign up if profile is not completed

                if (!user || !user.data || !user.data.profileCompleted) {
                  suggestToSignUpModal();
                } else {
                  if (voted && votedAgainst) {
                    // reset value if a user double click
                    setVoted(false);
                    setVotedAgainst(false);
                    setCurrentSupport(initSupport);
                  }
                  // if voted against before
                  else if (voted && votedFor) {
                    setVotedFor(false);
                    setVotedAgainst(true);
                    // use intial value bc voted against brought it down
                    const newSupport = Math.floor(initSupport / 1.2);
                    setCurrentSupport(newSupport);
                  } else {
                    setVotedAgainst(true);
                    setVoted(true);

                    if (currentSupport >= 0) {
                      const newSupport = Math.floor(currentSupport / 1.2);
                      setCurrentSupport(newSupport <= 0 ? 0 : newSupport);
                    }
                  }
                }
              }}
            >
              <FontAwesomeIcon
                icon="thumbs-down"
                className={`text-5xl ${
                  voted && votedAgainst ? "text-red-700" : "text-red-500"
                } `}
              />
            </button>
          </div>
          <div className="relative w-6/12">
            <FontAwesomeIcon
              icon="flag-checkered"
              className="absolute bottom-5 z-10 text-4xl"
              style={{ left: `${currentSupport - 1.1}%` }}
            />
            <div className="absolute bottom-0 w-full rounded bg-gradient-to-r from-red-500 to-green-500 h-6"></div>
            <div
              className="absolute -bottom-6 text-gray-700 z-10 text-sm flex flex-row w-full"
              style={{ left: `${currentSupport - 4}%` }}
            >
              {currentSupport}% Support
            </div>
          </div>
          <div className="w-3/12">
            {" "}
            <button
              onClick={() => {
                // suggest to sign up if profile is not completed

                if (!user || !user.data || !user.data.profileCompleted) {
                  suggestToSignUpModal();
                } else {
                  if (voted && votedFor) {
                    // reset value if a user double click
                    setVoted(false);
                    setVotedFor(false);
                    setCurrentSupport(initSupport);
                  }
                  // if voted against before
                  else if (voted && votedAgainst) {
                    setVotedAgainst(false);
                    // use intial value bc voted against brought it down
                    const newSupport = Math.floor(initSupport * 1.2);
                    setCurrentSupport(newSupport >= 100 ? 100 : newSupport);
                  } else {
                    setVotedFor(true);
                    setVoted(true);

                    if (currentSupport <= 100) {
                      const newSupport = Math.floor(currentSupport * 1.2);
                      setCurrentSupport(newSupport >= 100 ? 100 : newSupport);
                    }
                  }
                }
              }}
            >
              <FontAwesomeIcon
                type="button"
                icon="thumbs-up"
                className={`text-5xl pointer ${
                  voted && votedFor ? "text-green-700" : "text-green-500"
                }`}
              />
            </button>
          </div>
        </div>
      </div>
      <div className="flex flex-row mt-10">
        <div className="w-3/12">
          <StyledChatContainer className="border-2 border-red-500 rounded">
            <h2 className="text-center mt-2 text-xl">Comments against</h2>

            <SuggestToSignUp isAgainst />
          </StyledChatContainer>
        </div>
        <div className="w-6/12">
          <h1 className="text-xl text-center font-medium mb-6">
            {currentChamber ? currentChamber.slice(0, 1) : ""}. {billNumber}:{" "}
            {shortTitle && shortTitle[0] ? shortTitle[0].title : title}
          </h1>
          <div id="bill-menu">
            <nav className="border-2 rounded shadow-sm text-xl">
              <StyledNavBar className="flex flex-row ">
                {MENU_LIST.map((menuItem) => (
                  <li
                    key={menuItem}
                    className={`cursor-pointer ${
                      activeMenuItem === menuItem ? "bg-gray-200" : ""
                    }  `}
                    onClick={() => {
                      setActiveMenuItem(menuItem);
                      router.replace(
                        `/usa/bills/${packageId}?section=${menuItem}`,
                        undefined,
                        { shallow: true }
                      );
                    }}
                  >
                    {menuItem}
                  </li>
                ))}
              </StyledNavBar>
            </nav>
          </div>

          <div className="mt-6 text-lg font-light">
            {activeMenuItem === "Overview" ? (
              <StyledMenu>
                <li>
                  <OverviewBulletPoint>Introduced</OverviewBulletPoint>
                  <span className="font-light"> {dateIssued}</span>
                </li>
                <li>
                  <OverviewBulletPoint>Last Modified</OverviewBulletPoint>
                  <span className="font-light">
                    {" "}
                    {lastModified && lastModified.slice(0, 10)}
                  </span>
                </li>
                <li>
                  <OverviewBulletPoint>Published </OverviewBulletPoint>{" "}
                  {publisher}{" "}
                </li>
                <li>
                  <OverviewBulletPoint> Congress </OverviewBulletPoint>{" "}
                  {congress}
                </li>
                {members?.length && members[0] ? (
                  <>
                    <li>
                      <OverviewBulletPoint> Sponsor </OverviewBulletPoint>{" "}
                      {members[0].memberName}{" "}
                    </li>
                    <li>
                      <OverviewBulletPoint> Cosponsors </OverviewBulletPoint>{" "}
                      <div className="w-4/5">
                        {" "}
                        {members
                          .filter((member) => member.role === "COSPONSOR")
                          .map((filteredMember) => filteredMember.memberName)
                          .join(" ; ")}{" "}
                        .
                      </div>
                    </li>
                  </>
                ) : null}
                {committees?.length && (
                  <li>
                    <OverviewBulletPoint> Committees </OverviewBulletPoint>{" "}
                    {committees[0].committeeName}{" "}
                  </li>
                )}
                <li>
                  <OverviewBulletPoint> Chamber </OverviewBulletPoint>
                  {currentChamber}
                </li>
                <li>
                  {" "}
                  <OverviewBulletPoint> Bill Number </OverviewBulletPoint>{" "}
                  {billNumber}
                </li>
                <li>
                  <OverviewBulletPoint> Class Number </OverviewBulletPoint>{" "}
                  {suDocClassNumber}{" "}
                </li>
              </StyledMenu>
            ) : null}
            {activeMenuItem.toLowerCase() === "text" ? (
              <div className="text-xs bg-white rounded border-2">
                <div
                  className="p-2"
                  dangerouslySetInnerHTML={{ __html: htmlData }}
                />
              </div>
            ) : null}
            {activeMenuItem.toLowerCase() === "summary" ? (
              <div>
                A bill{" "}
                {`${
                  title
                    ? `${title.slice(0, 1).toLowerCase()}${title.slice(1)}`
                    : null
                }`}
              </div>
            ) : null}
          </div>
        </div>
        <div className="w-3/12">
          <StyledChatContainer className="border-2 border-green-500 rounded">
            <h2 className="text-center mt-2 text-xl">Comments for</h2>
            <SuggestToSignUp isSupport />

            {/* <button className="absolute bottom-0 h-24 border-2 w-full">Relative</button> */}
          </StyledChatContainer>
        </div>
      </div>
    </div>
  );
};

const todaysData = () => {
  let date = new Date();
  // set midnight
  date.setHours(0, 0, 0, 0);

  date.setDate(date.getDate() - 1);

  return date.toISOString().split(".")[0] + "Z";
};

export async function getStaticPaths() {
  const res = await fetch(
    `${API_US_GOV_INFO_BILLS}/${todaysData()}?offset=0&pageSize=${API_PAGE_SIZE}&api_key=${
      process.env.GOV_US_API_KEY
    }`
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
    `${API_US_GOV_INFO_BILL_SUMMARY}/${params.packageId}/summary?api_key=${process.env.GOV_US_API_KEY}`
  );
  const json = await res.json();

  if (json?.download?.txtLink) {
    let htmlRes = await fetch(
      `${json.download.txtLink}?api_key=${process.env.GOV_US_API_KEY}`
    );

    let htmlTextRes = await htmlRes.text();

    json.htmlData = htmlTextRes;
  }

  // if (json?.related?.billStatusLink) {
  //   let xmlRes = await fetch(
  //     `${json.related.billStatusLink}?api_key=${process.env.GOV_US_API_KEY}`
  //   );

  //   let xmlResText = await xmlRes.text();

  //   json.statusData = xmlResText;
  // }

  return {
    props: {
      data: json,
    },
  };
}

export default BillOverview;
