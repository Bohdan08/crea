import React from "react";
import Link from "next/link";

const DebatesLink = ({ packageId }) => (
  <div className="mt-16">
    <Link
      href="/posts/post/[packageId]/debates"
      as={`/posts/post/${packageId}/debates`}
    >
      <a className="w-40 text-center flex justify-center py-2 bg-pink-700  hover:bg-pink-800 rounded-lg text-white text-xl fixed">
        <span>Debates </span>
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
              d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"
            />
          </svg>
        </span>
      </a>
    </Link>
  </div>
);
export default DebatesLink;