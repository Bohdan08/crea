import React from "react";
import Link from "next/link";

// styles
import styles from "./postPage.module.scss";

// mock data
import { data } from "../../data";

const Posts = () => {
  return (
    <div className="mt-12 max-w-screen-xl m-auto">
      <div className="mb-2">
        <p className="text-4xl font-semibold ">Congressional bills</p>
        <p className="text-lg mt-5 text-gray-500 pb-5">
          Congressional bills are legislative proposals from the House of
          Representatives and Senate within the United States Congress.
        </p>
        <hr />
      </div>

      <div className="flex flex-row flex-wrap justify-start">
        {data.map(({ packageId, congress, title, dateIssued }, key) => (
          <div
            key={packageId}
            className={`py-2 my-2 lg:w-6/12 w-full flex items-stretch ${
              (key + 1) % 2 === 0 ? "pl-2" : "pr-2"
            }`}
          >
            <Link
              href="posts/post/[packageId]/[content]"
              as={`posts/post/${packageId}/content`}
            >
              <div
                className={`${styles["post-container"]} relative  py-3 px-4 border-2 bg-white rounded-lg cursor-pointer text-lg w-full`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={`h-6 w-6 ${styles["post-arrow"]}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
                <p className="text-xl  text-gray-800">{title}</p>
                <p className="text-xl font-medium pb-10 pt-4 text-gray-800">
                  Congress {congress}
                </p>
                <p className="absolute bottom-0 text-xl text-gray-500 pb-2">
                  {new Date(dateIssued).toString().slice(4, 15)}
                </p>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Posts;
