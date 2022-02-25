import React, { useState, useEffect } from "react";
import { slide as Menu } from "react-burger-menu";
// import "./Header.css";
// import "./styles.css";
import logo from "../../img/MLogo.png";
import axios from "axios";
import { GetProfile } from "../AllApi";
import { useHistory } from "react-router";

let userdID = localStorage.getItem("UserId");
let cname = localStorage.getItem("custname");
// let cname = localStorage.getItem("custname");
if (cname == null || cname == 0) {
  cname = "User";
}
var CustName;

export default (props) => {
  const history = useHistory();

  function handleURL(url) {
    history.push({
      pathname: url,
    });
    window.location.href = "/";
  }

  function onKillCateID() {
    //alert('logout');
    //   window.location='/login';
    //localStorage.removeItem("Cate");
    // localStorage.removeItem('querry');
    localStorage.removeItem("PhoneNumber");
    localStorage.removeItem("CountryCode");
    localStorage.removeItem("otp");
    localStorage.removeItem("UserId");
    localStorage.removeItem("mastercode");
    localStorage.removeItem("UserStatus");
    localStorage.removeItem("LoginStatus");
    localStorage.removeItem("OTPStatus");

    // localStorage.removeItem("custname");
    // localStorage.removeItem("Name");
    handleURL("/main");
    // window.location.href = "/main";
  }

  //const [SideBarData, setSideBarData] = useState([]);
  //localStorage.clear("mastercode");
  var masterCode = localStorage.getItem("mastercode");

  //alert('UserId= '+ userdID);
  //var masterCode = "1";

  //var custname = localStorage.getItem("custname");

  if (masterCode == "02") {
    axios
      .get(`${GetProfile}${userdID}`)
      .then((res) => {
        CustName = res.data.Result.FirstName;
        localStorage.setItem("Name", CustName);
        //this.setState({ dogs: res.data.message });
      })
      .catch((err) => console.log(err));
    // let cname =  localStorage.getItem("Name");
  }
  let userdIDs = localStorage.getItem("UserId");
  return (
    //let cname =  localStorage.getItem("Name");
    // Pass on our props
    <Menu {...props}>
      <div class="bc c4 e4 ix">
        <div>
          {localStorage.getItem("UserStatus") !== "true" ? (
            <a
              rel="nofollow"
              href="/login"
              class="gk cp cc bi in io bc be g4 b8 ip f4 fo fp fq cg ch d1"
            >
              Sign in
            </a>
          ) : (
            <div class="agm bfm">
              <img
                alt=""
                role="presentation"
                src="https://d1w2poirtb3as9.cloudfront.net/default.jpeg?Expires=1611768775&amp;Signature=LqtvNkeqE2mndXQ5a-yP9tTrhcJXLTOSOoHzYzqY39sVyunF~yr8thmUiYtgz6k~lDlsB3c-OUbZOdvwbcMPxwl-8j~D~m570aAvh5z-rwsLJ56oRBCv3q4JPCw-FikBhD8nxWK4ThGcK~Xqs3G~v9N4vilIGWObSM55KSkGmbSV89bRMv4UKk32uLbNqYi-aFxJhfaDxEd~-nNSdn1TvYpyINCs3gKZX1YNx1ErT~zGxbhp7WtD9wUO~HWKY3LKhwAZjgpcudQwivUv9Ouvrp27moHxJMEcsFuDJRABnUXUkZh8B3c5lu5Fpkt-4XajeWs0-IhLGQBQqitoWe~HIA__&amp;Key-Pair-Id=APKAJSDH2OZQQSA64LQQ"
                class="f1m f2m f3m iym"
              ></img>
              <div class="spacer _16"></div>
              <div>
                <div class="cch">{cname}</div>
                <a href="./profile" class="brm bsm btm d0m">
                  View account
                </a>
              </div>
            </div>
          )}

          <div class="iy e1 bc c4">
            <ul id="sidebarList">
              <li>
                <a
                  href="https://register.m-rides.com/food/loginfood"
                  target="_blank"
                  class="ca cb cc iz"
                >
                  - Add your restaurant
                </a>
              </li>
              <li>
                <a
                  href="https://register.m-rides.com/becomedriver"
                  target="_blank"
                  class="ca cb cc iz"
                >
                  - Sign up to deliver
                </a>
              </li>

              <li>
                <a href="/OrderHistory" class="ca cb cc iz">
                  - My Orders
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div>
          <div>
            {localStorage.getItem("UserStatus") !== "true" ? (
              ""
            ) : (
              <div class=" bfm">
                <a
                  style={{ borderRadius: "30px" }}
                  rel="nofollow"
                  // href="/"
                  onClick={() => onKillCateID()}
                  class="gk cp cc bi in io bcd be g4 b8 ip f4 fo fp fq cg ch d1"
                >
                  Log out
                </a>
              </div>
            )}
          </div>

          <div class="">
            <img alt="M-Foods" width="200px" role="img" src={logo} />
          </div>
          <div class="bc be j2 ih">
            <a
              href="https://apps.apple.com/us/app/m-rides/id1547592407"
              class="ca cb cc bc be hk j3 ba cd ce cf cg ch"
            >
              <svg
                aria-hidden="true"
                focusable="false"
                viewBox="0 0 24 24"
                class="cl cm bm bn"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M14.268 4.231c.649-.838 1.14-2.022.963-3.231-1.061.074-2.301.752-3.025 1.637-.66.802-1.201 1.994-.99 3.152 1.16.036 2.357-.66 3.052-1.558zM20 15.602c-.464 1.035-.688 1.497-1.285 2.413-.834 1.28-2.01 2.872-3.47 2.884-1.294.014-1.628-.849-3.385-.838-1.758.01-2.124.854-3.421.841-1.458-.013-2.572-1.45-3.406-2.729-2.334-3.574-2.58-7.769-1.14-10C4.916 6.587 6.53 5.66 8.048 5.66c1.543 0 2.515.852 3.793.852 1.24 0 1.995-.854 3.78-.854 1.352 0 2.784.74 3.803 2.018-3.34 1.842-2.8 6.642.576 7.925z"
                ></path>
              </svg>
              <div class="spacer _8"></div>
              <div class="spacer _8"></div>iPhone
            </a>
            <div class="spacer _16"></div>
            <a
              href="https://play.google.com/store/apps/details?id=com.mbe.mrides"
              class="ca cb cc bc be hk j3 ba cd ce cf cg ch"
            >
              <svg
                aria-hidden="true"
                focusable="false"
                viewBox="0 0 24 24"
                class="cl cm bm bn"
              >
                <g>
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M15.297 3.415l-.233.343c1.77.804 2.97 2.326 2.97 4.069H6.341c0-1.743 1.199-3.265 2.97-4.069l-.234-.343-.233-.338-.52-.761a.2.2 0 01.058-.282.214.214 0 01.29.057l.793 1.157.238.348a7.035 7.035 0 012.484-.444c.888 0 1.729.16 2.484.444l1.032-1.505a.21.21 0 01.288-.057.198.198 0 01.059.282l-.52.76-.234.339zm-1.23 2.176c0 .337.28.61.626.61a.618.618 0 00.627-.61.617.617 0 00-.627-.61.617.617 0 00-.627.61zm-4.385.61a.618.618 0 01-.627-.61c0-.338.28-.61.627-.61.346 0 .627.272.627.61 0 .337-.28.61-.627.61z"
                  ></path>
                  <path d="M6.342 8.639h11.692v8.942c0 .71-.592 1.288-1.322 1.288h-.956c.033.107.052.22.052.338v2.574c0 .673-.562 1.22-1.254 1.22s-1.253-.547-1.253-1.22v-2.574c0-.119.018-.23.05-.338h-2.327c.032.107.051.22.051.338v2.574c0 .673-.562 1.22-1.253 1.22-.692 0-1.254-.547-1.254-1.22v-2.574c0-.119.018-.23.05-.338h-.953c-.73 0-1.323-.578-1.323-1.288V8.639zm-2.089 0C3.561 8.639 3 9.185 3 9.858v5.216c0 .673.56 1.22 1.253 1.22.692 0 1.253-.547 1.253-1.22V9.858c0-.673-.561-1.219-1.253-1.219zM18.87 9.858c0-.673.56-1.219 1.253-1.219.691 0 1.252.546 1.252 1.219v5.216c0 .673-.56 1.22-1.252 1.22-.693 0-1.254-.547-1.254-1.22V9.858z"></path>
                </g>
              </svg>
              <div class="spacer _8"></div>
              <div class="spacer _8"></div>Android
            </a>
          </div>
        </div>
      </div>
    </Menu>
  );
};
