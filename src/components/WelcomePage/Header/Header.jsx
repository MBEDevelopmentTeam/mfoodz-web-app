import React from "react";
import headerImage from "./headerImage.jpg";
import "./Header.css";

import { TAhead } from "../../Website/TAhead";

let today = new Date();
// let date = today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
let time = today.getHours();

let greetings = "Morning";
let nightGreetings = false;

if (time > 5 && time < 11) {
  greetings = "Morning";
} else if (time > 11) {
  greetings = "Afternoon";
} else if (time > 16 || time < 22) {
  greetings = "Evening";
} else if (time < 5 || time > 22) {
  nightGreetings = true;
  greetings = "Mid Night Owl...";
}

// console.log(time);
// console.log(greetings);

const Header = (props) => {
  return (
    <div className="header__mainFrame">
      <div className="header__hoverBox">
        <div className="header__hoverBoxTwo">
          <div className="header__searchPanel">
            <div className="searchPanel__greetings">
              {/* {!nightGreetings ? (
                <p>Good {greetings}</p>
              ) : (
                <p>Hey {greetings}</p>
              )} */}
              <p>Welcome!</p>
            </div>

            <div className="searchPanel__news">
              <h3>Let's explore good food near you.</h3>
            </div>

            <div className="searchPanel__addressPanel">
              <TAhead />
            </div>
          </div>
        </div>
      </div>

      <div className="header__imageBox">
        <img src={headerImage} className="header__image" />
      </div>
    </div>
  );
};

export default Header;
