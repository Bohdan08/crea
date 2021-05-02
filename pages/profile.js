import { useUser, withPageAuthRequired } from "@auth0/nextjs-auth0";
import { useState } from "react";

function Profile() {
  const { user, isLoading } = useUser();

  
  // console.log(user, "user");
  return (
    <>
      {isLoading && <div>loading... </div>}
      {user && (
        <div className="w-12/12 h-full px-5 py-10 flex flex-row items-stretch">
          <div className="w-3/12 mr-5 bg-white rounded shadow-xl">
            <div className="flex flex-col pt-5">
              <button className="focus:outline-none text-xl font-semibold text-gray-600">
                {" "}
                Personal Info{" "}
              </button>
            </div>
          </div>
          <div className="w-9/12 bg-white rounded shadow-xl p-5">
            <div className="flex flex-row w-full">
              <div className="w-1/6">
                <img
                  src={user.picture}
                  alt="Profile"
                  className="rounded-full img-fluid profile-picture mb-3 mb-md-0"
                  decode="async"
                  data-testid="profile-picture"
                />
              </div>
              <div className="w-5/6 text-2xl flex flex-col justify-center">
                {/* <p className="pt-2">Name: {user.name}</p> */}
                <p className="flex flex-row">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 mt-1 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                  {user.email}
                </p>
              </div>
            </div>
            {/* <div data-testid="profile-json">
              <div>{JSON.stringify(user, null, 2)} </div>
            </div> */}
          </div>
        </div>
      )}
    </>
  );
}

export default withPageAuthRequired(Profile, {
  onRedirecting: () => <div> loading</div>,
  onError: (error) => <div>error is {error}</div>,
});
