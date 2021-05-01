import Head from "next/head";
import Image from "next/image";
import { useState, useEffect } from "react";
import swal from "sweetalert2";
import US from "./us";

// style
import styles from "./index.module.scss";

const Home = () => {
  const [currentRegion, setCurrentRegion] = useState(null);

  const [regionModal, setRegionModal] = useState(false);

  useEffect(() => {
    const currentRegion = localStorage.getItem("selectedRegion");
    setCurrentRegion(currentRegion);

    window.Swal = swal;

    if (!currentRegion || regionModal) {
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
          setCurrentRegion(event.target.value);
          setRegionModal(false);
        })
      );
    }
  }, [regionModal]);
  return (
    <>
      <div>
        <Head>
          <title>CREA</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main>
          <div
            className={`w-full bg-cover bg-${currentRegion}-banner bg-no-repeat bg-top ${styles.banner}`}
          >
            <div className="text-white p-8">
              <p className="text-3xl text-white">
                {" "}
                Discover {currentRegion?.toUpperCase()} Government Information
              </p>
              <p className="pt-2 text-xl">
                We make {currentRegion?.toUpperCase()} Congress more open and
                accessible.
              </p>
              <button
                className="mt-5 py-2 w-44 bg-white text-black rounded cursor-pointer focus:outline-none"
                onClick={() => setRegionModal(true)}
              >
                Change Region{" "}
              </button>
            </div>
          </div>
        </main>

        {/* <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <img src="/vercel.svg" alt="Vercel Logo" className={styles.logo} />
        </a>
      </footer> */}
      </div>
    </>
  );
};

export default Home;
