import React from "react";
import logo from "../../img/logo.png";
import "./NewHeader.css";


import { Cabinet } from "../Cabinet/Cabinet";
import { Location } from "../Location/Location";
import SideBar from "./sideBarforGenralHeader";
//import Menu from "./sidebar";

import { Container } from "../Container/Container";
import ConsumerBasket from '../ContextBasket/ContextBasket';



export function GenralHeader(props) {

    function onKillCateID() {
        // window.location.href='';
        localStorage.removeItem("Cate");



    }

    return (


        <ConsumerBasket>
            {context => {
                //console.log("zz");
                return (

                    <header className="gheader">
                        <SideBar pageWrapId={"page-wrap"} outerContainerId={"header__fixed"} />
                        <Container>


                            <div className="header__fixed">
                                <div class="spacer _32"></div>




                                <div class="bm-burger-button as">
                                    <span>
                                        <span class="bm-burger-bars am" ></span>
                                        <span class="bm-burger-bars am" ></span>
                                        <span class="bm-burger-bars am"></span>

                                    </span>
                                    {/* <button aria-label="Main navigation menu" class="bc be bg bh bi bj"><svg aria-hidden="true" focusable="false" viewBox="0 0 20 20" class="bk bl bm bn"><path d="M19.167 3.333H.833v2.5h18.334v-2.5zm0 5.834H.833v2.5h18.334v-2.5zM.833 15h18.334v2.5H.833V15z"></path></svg></button>
                        
                     */}

                                </div>
                                <div class="spacer _36"></div>

                                <div class="spacer _36"></div>
                                <div class="spacer _200"></div>
                                <div class="spacer _16"></div>


                            </div>



                        </Container>
                    </header>
                )
            }}
        </ConsumerBasket>
    );
}