import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
// import { Auth } from "aws-amplify";
import { useDispatch, useSelector } from "react-redux";
// import { changeUserSingleField, setUser } from "../redux/slices/userSlice";

// styles
import styles from "./profile.module.scss";
import { setUser } from "../redux/slices/userSlice";

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

const ProfileField = ({
  fieldName,
  inputValue,
  inputName,
  icon,
  onChangeField,
  isEdit,
}) => (
  <div className="flex flex-row w-full pb-5">
    <div className="text-lg flex flex-col justify-center">
      <p className="font-light text-xl">{fieldName}</p>
      <div className="flex flex-row mt-2 ">
        <div className="flex flex-row border p-2 rounded-sm">
          {icon}
          <ProfileSvgWrapper path={icon} />
          <input
            value={inputValue}
            className="w-96 focus:outline-none bg-white"
            onChange={(event) => onChangeField(inputName, event.target.value)}
            disabled={!isEdit}
          />
        </div>
      </div>
    </div>
  </div>
);

const profileFields = [
  {
    name: "Username",
    value: "username",
    iconPath: (
      <path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    ),
  },
  {
    name: "Email",
    value: "email",
    iconPath: (
      <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    ),
  },
  {
    name: "Phone Number",
    value: "phone_number",
    iconPath: (
      <path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
    ),
  },
  {
    name: "Address",
    value: "address",
    iconPath: (
      <path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
    ),
  },
];

const Profile = () => {
  const [isEdit, setEdit] = useState(false);
  const [userValues, setUserValues] = useState({});
  const [authInfo, setAuthInfo] = useState(null);
  const { user } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push("/auth");
    } else {
      setUserValues(user);
    }
  }, []);

  // useEffect(() => {
  //   checkUser();
  // }, []);

  // async function checkUser() {
  //   try {
  //     const userValues = await Auth.currentAuthenticatedUser();
  //     dispatch(setUser(userValues?.attributes || {}));
  //     setAuthInfo("signedIn");
  //   } catch (err) {
  //     console.log(err, "err");
  //     setAuthInfo(err?.message);
  //   }
  // }

  const onChangeField = (field, value) => {
    setUserValues({ ...userValues, [field]: value });

    // let userPayload = Object.assign(user, {});
    // userPayload[field] = value;
    // const userPayload = Object.assign(user, { [field]: value });

    // // { ...user, [field]: value };
    // dispatch(setUser({ ...user, [field]: value }));
    // dispatch(changeUserSingleField({ field, value }));
  };

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
            <div
              className={`${styles.tooltip} absolute right-0 mr-10 text-sm p-0`}
            >
              <span className={styles.tooltiptext}>
                {isEdit ? "Cancel Progress" : "Edit Profile"}
              </span>
              <button
                type="button"
                className="focus:outline-none"
                onClick={() => setEdit(!isEdit)}
              >
                {!isEdit ? (
                  <ProfileSvgWrapper
                    stroke="orange"
                    path={
                      <path
                        strokeWidth={2}
                        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                      />
                    }
                  />
                ) : (
                  <ProfileSvgWrapper
                    stroke="red"
                    path={<path strokeWidth={2} d="M6 18L18 6M6 6l12 12" />}
                  />
                )}
              </button>
            </div>
            {profileFields.map(({ name, value, iconPath }) => (
              <ProfileField
                key={name}
                fieldName={name}
                inputName={value}
                inputValue={userValues[value]}
                icon={iconPath}
                isEdit={isEdit}
                onChangeField={onChangeField}
              />
            ))}

            <button className="bg-green-600 text-white py-2 px-3 rounded-sm mt-1">
              Save Progress
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default Profile;
