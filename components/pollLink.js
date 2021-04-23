import React from "react";
import Link from "next/link";

const PollLink = ({ packageId, pollState }) => (
  <div className="mt-24">
    <Link
      href={`/posts/post/[packageId]/poll`}
      as={`/posts/post/${packageId}/poll`}
    >
      <a
        className={`w-40 text-center flex justify-center py-2 rounded-lg text-white text-xl fixed ${
          pollState
            ? "bg-purple-500 cursor-not-allowed hidden"
            : "bg-purple-700 hover:bg-purple-800"
        }`}
      >
        <span> Poll </span>
        <span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 pt-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </span>
      </a>
    </Link>
  </div>
);

export default PollLink;
