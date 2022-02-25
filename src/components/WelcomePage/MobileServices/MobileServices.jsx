import React from "react";
import "./MobileServices.css";
import mobileServices1 from "./mobileServices1.svg";
import mobileServices2 from "./mobileServices2.svg";
import appleLogo from "./logo-appstore.svg";
import androidLogo from "./logo-playstore.svg";
const MobileServices = () => {
  return (
    <>
      <div className="MS__mainFrame">
        <div className="MS__innerBox">
          <div className="MS__innerOne">
            <img
              src={mobileServices1}
              style={{ width: "150px", height: "150px" }}
            />

            <p className="MS__headings"> Curated restaurants</p>
            <p className="MS__subHeadings">
              From small bites to big meals, we won't limit your appetite. Go
              ahead and order all you want.
            </p>
          </div>

          <div className="MS__innerTwo ">
            <img
              src={mobileServices2}
              style={{ width: "150px", height: "150px" }}
            />
            <p className="MS__headings">
              More cool features available on the app
            </p>
            <p className="MS__subHeadings">
              Download Grab app to use other payment methods and enjoy seamless
              communication with your driver. App store logo
            </p>

            <div className="MS__logos">
              <a
                href="https://apps.apple.com/pk/app/m-rides/id1547592407"
                target="_blank"
              >
                <img
                  className="MS__mobileLogos"
                  src={appleLogo}
                  style={{ cursor: "pointer" }}
                />
              </a>

              <a
                href="https://play.google.com/store/apps/details?id=com.mbe.mrides&hl=en_IN"
                target="_blank"
              >
                <img
                  className="MS__mobileLogos"
                  src={androidLogo}
                  style={{ cursor: "pointer" }}
                />
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default MobileServices;
