import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";

const ProfileField = ({ fieldName, inputValue, icon }) => (
  <div className="flex flex-row w-full pb-5">
    <div className="text-lg flex flex-col justify-center">
      <p className="font-light text-xl">{fieldName}</p>
      <div className="flex flex-row mt-2 ">
        <div className="flex flex-row border p-2 rounded-sm">
          {icon}
          <input
            value={inputValue}
            className="w-96 focus:outline-none bg-white"
            disabled
          />
        </div>
        {/* 
  <button className="ml-5 pointer">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-6 w-6 text-yellow-400"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
      />
    </svg>
  </button> */}
      </div>
    </div>
  </div>
);

const ProfileSvgWrapper = ({
  path,
  style = "h-5 w-5 mt-1 mr-2",
  stroke = "currentColor",
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={style}
    fill="none"
    viewBox="0 0 24 24"
    stroke={stroke}
  >
    {path}
  </svg>
);

const Profile = () => {
  const { user } = useSelector((state) => state.user);

  const { username, email, address, phone_number } = user || {};

  const router = useRouter();
  console.log(user, "user");

  useEffect(() => {
    if (!user) {
      router.push("/auth");
    }
  }, []);

  return (
    <div>
      {user ? (
        <div className="w-12/12 h-full px-5 py-10 flex flex-row items-stretch">
          <div className="w-3/12 mr-5 bg-white rounded shadow-xl">
            <div className="flex flex-col pt-5">
              <button className="focus:outline-none text-2xl font-light">
                Personal Info
              </button>
            </div>
          </div>
          <div className="w-9/12 bg-white rounded shadow-xl p-5">
            <button className="absolute right-0 mr-10 text-sm">
              <ProfileSvgWrapper
                stroke="orange"
                path={
                  <path
                    strokeWidth={2}
                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                  />
                }
              />
            </button>
            <ProfileField
              fieldName="Username"
              inputValue={username}
              icon={
                <ProfileSvgWrapper
                  path={
                    <path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  }
                />
              }
            />

            <ProfileField
              fieldName="Phone Number"
              inputValue={phone_number}
              icon={
                <ProfileSvgWrapper
                  path={
                    <path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  }
                />
              }
            />
            <ProfileField
              fieldName="Email"
              inputValue={email}
              icon={
                <ProfileSvgWrapper
                  path={
                    <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  }
                />
              }
            />
            <ProfileField
              fieldName="Address"
              inputValue={address}
              icon={
                <ProfileSvgWrapper
                  path={
                    <path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  }
                />
              }
            />
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default Profile;
