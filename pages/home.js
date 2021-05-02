import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import swal from "sweetalert2";
import { setRegion } from "../redux/slices/regionSlice";

// styles
import styles from "./index.module.scss";

const Home = () => {
  const [regionModal, setRegionModal] = useState(false);
  const region = useSelector((state) => state.region.value);

  const route = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    window.Swal = swal;

    if (regionModal) {
      Swal.fire({
        icon: "question",
        title: "Choose Region",
        allowOutsideClick: false,
        showConfirmButton: false,
        html: `
            <div class="swal2-html-container"> Please choose the region you want to read news about.  </div>
            <div id="swal-button-group" class="mt-5">
              <button id="swal-region-us" name="region" type="submit" value="us" class="swal2-confirm swal2-styled" onclick="Swal.clickConfirm()"> United States </button>
              <button id="swal-region-uk" name="region" type="submit" value="uk" class="swal2-cancel swal2-styled" onclick="Swal.clickConfirm()"> United Kingdom </button>
            </div>
            `,
        preConfirm: () => document.getElementById("swal-button-group"),
        focusConfirm: false,
      }).then(({ value }) =>
        value.addEventListener("click", (event) => {
          localStorage.setItem("selectedRegion", event.target.value);
          dispatch(setRegion(event.target.value));
          setRegionModal(false);
        })
      );
    }
  }, [regionModal]);

  useEffect(() => {
    if (!region) {
      const savedRegion = localStorage.getItem("region");
      if (savedRegion) {
        dispatch(setRegion(savedRegion));
      } else {
        route.push("/");
      }
    }
  }, []);
  return (
    <div
      className={`${
        styles[`${region}-banner`]
      } w-full bg-cover bg-no-repeat bg-top ${styles.banner}`}
    >
      <div className="text-white p-8">
        <p className="text-3xl text-white">
          {" "}
          Discover {region?.toUpperCase()} Government Information
        </p>
        <p className="pt-2 text-xl">
          We make {region?.toUpperCase()} Congress more open and accessible.
        </p>
        <button
          className="mt-5 py-2 w-44 bg-white text-black rounded cursor-pointer focus:outline-none"
          onClick={() => setRegionModal(true)}
        >
          Change Region{" "}
        </button>
      </div>
    </div>
  );
};

export default Home;
