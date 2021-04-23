import React from "react";
import Link from "next/link";

const ArticleLink = ({ packageId }) => (
  <div className="mt-16">
    <Link
      href="/posts/post/[packageId]/[content]"
      as={`/posts/post/${packageId}/content`}
    >
      <a className="w-40 text-center flex justify-center py-2 bg-yellow-800	  hover:bg-yellow-900 rounded-lg text-white text-xl fixed">
        <span>Content </span>
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
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
        </span>
      </a>
    </Link>
  </div>
);
export default ArticleLink;
