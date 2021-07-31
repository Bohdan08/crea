import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import {
  API_PAGE_SIZE,
  API_US_GOV_INFO_BILL_SUMMARY,
  API_US_GOV_INFO_BILLS,
} from "../../../../shared/constants";

const StyledNavBar = styled.ul`
  li {
    padding: 0.5rem 1rem;
    border-right: 2px solid #e5e7eb;
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

const MENU_LIST = ["Overview", "Summary", "Text", "Your Vote"];

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

  const [activeMenuItem, setActiveMenuItem] = useState(MENU_LIST[0]);

  const router = useRouter();

  useEffect(() => {
    // Always do navigations after the first render
    router.replace(`/bills/bill/${packageId}?section=Overview`, undefined, {
      shallow: true,
    });
  }, []);

  return (
    <div className="my-12 mx-auto max-w-screen-lg px-10">
      <h1 className="text-2xl font-medium">
        {currentChamber ? currentChamber.slice(0, 1) : ""}. {billNumber}:{" "}
        {shortTitle && shortTitle[0] ? shortTitle[0].title : title}
      </h1>
      <div id="bill-menu" className="mt-6">
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
                    `/bills/bill/${packageId}?section=${menuItem}`,
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
              <OverviewBulletPoint>Published </OverviewBulletPoint> {publisher}{" "}
            </li>
            <li>
              <OverviewBulletPoint> Congress </OverviewBulletPoint> {congress}
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
          <div className="text-xl bg-white rounded border-2">
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
