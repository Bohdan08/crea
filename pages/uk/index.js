import { useRouter } from "next/router";
import React from "react";
import { useDispatch } from "react-redux";
import { setRegion } from "../../redux/slices/regionSlice";

const UnitedKingdomRegion = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  return (
    <div className="flex flex-col justify-center ">
      <div className="center-element ">
        <div className="text-3xl"> Coming Soon... </div>
        <button
          className="mt-5 text-center bg-blue-600 h-12 flex items-center justify-center text-white rounded-sm p-4"
          onClick={() => {
            localStorage.removeItem("region");
            dispatch(setRegion(""));
            router.push("/");
          }}
        >
          Go Back to Main Page
        </button>
      </div>
    </div>
  );
};

export default UnitedKingdomRegion;
