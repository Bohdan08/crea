import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";

const RouterLink = ({ children, href, className, tabIndex, testId }) => {
  return (
    <Link href={href}>
      <span className="d-inline-flex align-items-center router-link">
        <a tabIndex={tabIndex} data-testid={testId}>
          {children}
        </a>
      </span>
    </Link>
  );
};

export default RouterLink;
