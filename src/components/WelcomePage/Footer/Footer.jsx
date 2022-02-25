import React from "react";
import "./Footer.css";
import facebook from "./facebook.png";
import instagram from "./instagram.png";
import twitter from "./twitter.png";
import appleLogo from "./logo-appstore.svg";
import androidLogo from "./logo-playstore.svg";
class Footer extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <>
        <div className="footer__mainFrame">
          <div className="footer__innerPanel">
            <div className="innerPanel__one">
              <div className="panelOne__links">
                <p style={{ fontWeight: "bolder", fontSize: "16px" }}>
                  Countries with MFoodz
                </p>
                <p style={{ fontSize: "13px" }}>
                  Pakistan{" "}
                  <span
                    style={{
                      color: "gray",
                      marginLeft: "5px",
                      marginRight: "5px",
                    }}
                  >
                    |
                  </span>{" "}
                  Canada
                </p>
              </div>

              <div className="panelOne__about">
                <span>&#169; MFoodz 2022</span>
                <br />
                <span
                  style={{
                    color: "white",
                    fontSize: "13px",
                    marginTop: "5px",
                    display: "inline-block",
                  }}
                >
                  Terms of Service • Privacy Policy
                </span>
              </div>
            </div>

            <div className="innerPanel__two">
              <div className="panelTwo__social">
                <span className="socialIcon">
                  <img
                    style={{ width: "35px", height: "35px" }}
                    // src={facebook}
                  />
                </span>
                <span className="socialIcon">
                  <img
                    style={{ width: "35px", height: "35px" }}
                    // src={instagram}
                  />
                </span>
                <span className="socialIcon">
                  <img
                    style={{ width: "35px", height: "35px" }}
                    // src={twitter}
                  />
                </span>
              </div>

              <div className="panelTwo__icons">
                <a
                  href="https://apps.apple.com/pk/app/m-rides/id1547592407"
                  target="_blank"
                >

                  <span className="appLogo">
                    <img
                      style={{ width: "120px", marginRight: "25px" }}
                      src={appleLogo}
                    />
                  </span>
                </a>

                <a
                  href="https://play.google.com/store/apps/details?id=com.mbe.mrides&hl=en_IN"
                  target="_blank"
                >
                  <span className="appLogo">
                    <img style={{ width: "120px" }} src={androidLogo} />
                  </span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}
export default Footer;
