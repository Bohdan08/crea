import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import styled from "styled-components";
import {
  ACCOUNT,
  PERSONAL_INFO,
  PROFILE_SELECTIONS,
} from "../shared/constants";
import Account from "../components/ProfileComponents/Account";
import PersonalInfo from "../components/ProfileComponents/PersonalInfo";

const StyledUserInfoContainer = styled.div`
  width: 700px;
`;

const StyledMenuSelectionContainer = styled.div`
  height: 300px;
`;

const Profile = () => {
  /* States */
  const [activeMenuItem, setActiveMenuItem] = useState(PROFILE_SELECTIONS[0]);

  /* Redux */
  const { user } = useSelector((state) => state);

  const router = useRouter();

  /* Use Effects */
  useEffect(() => {
    if (!user.data) {
      router.push("/auth");
    }
  }, []);

  return (
    <div>
      {user ? (
        <div className="my-10 flex flex-row justify-center">
          <StyledMenuSelectionContainer className="bg-white rounded shadow-xl w-72 border-black mr-5">
            <div className="flex flex-col pt-5">
              {PROFILE_SELECTIONS.map((profileSelection) => (
                <button
                  key={profileSelection}
                  className={`text-2xl text-left font-light cursor-pointer my-5 pl-5  ${
                    activeMenuItem === profileSelection
                      ? "border-l-4 border-blue-600 text-blue-600"
                      : ""
                  }`}
                  onClick={() => setActiveMenuItem(profileSelection)}
                >
                  {profileSelection}
                </button>
              ))}
            </div>
          </StyledMenuSelectionContainer>
          <StyledUserInfoContainer className="bg-white rounded shadow-xl p-10">
            <div className="w-full pt-5">
              {activeMenuItem === ACCOUNT && <Account />}
              {activeMenuItem === PERSONAL_INFO && <PersonalInfo />}
            </div>
          </StyledUserInfoContainer>
        </div>
      ) : null}
    </div>
  );
};

export default Profile;
