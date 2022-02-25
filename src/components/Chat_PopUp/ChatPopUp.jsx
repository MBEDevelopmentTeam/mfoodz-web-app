import React, { useState } from "react";
import "./ChatPopUp.css";

import { useDispatch, useSelector } from "react-redux";
import { chatIconStatus, chatNumberNULL, chatNumberADD } from "../../actions";
import { BiMessage } from "react-icons/bi";
import logo from "../../img/MLogo.png";
import { AiOutlineArrowRight } from "react-icons/ai";
// import { Scrollbars } from "rc-scrollbars";
import ScrollableFeed from "react-scrollable-feed";
import { socket, receivedMessage } from "../chat-client";
import { useEffect } from "react";

import { updatedStore } from "../..";
let allMessagesArray = [];

let CusId = localStorage.getItem("UserId");

let DriverId = localStorage.getItem("driverID");
let RideId = localStorage.getItem("rideID");
// var audio = new Audio("./pristine.mp3");
// audio.play();

// function scrollToBottom() {
//   let messageBox = window.querySelector("messages__box");
//   messageBox.scrollTo({
//     top: 0,
//     behavior: "smooth",
//   });
// }

function sendNewMessage(newMessage, custID, diverid, rideid) {
  socket.emit("send_message", {
    sender: parseInt(custID),
    // receiver: 2266,
    receiver: parseInt(diverid),
    message: newMessage,
    rideId: parseInt(rideid), //this is mendatory.
    messageType: "text",
    role: "customer",
  });
}

const ChatPopUp = () => {
  const chatStatusIcon = useSelector((state) => state.chatIconStatus);

  useEffect(() => {
    socket.on("send_message_return", (msg) => {
      console.log(socket.connected);
      console.log(" ----  Message recieved from customer ---- ");
      msg.type = 1;

      allMessagesArray.push(msg);
      // console.log("recievedMessage");
      // setMessageArray(msg);
      // console.log(GlobalArray);
      // console.log("messageArray");
      // console.log("1");

      // var OldMessages = store.getState().Messages;
      // OldMessages.push(msg);
      // store.dispatch({ type: "UpdateMessages", state: OldMessages });
    });

    // const dispatch = useDispatch();

    socket.on("new_message", (msg) => {
      console.log(socket.connected);
      console.log(" ----  Message recieved from rider ---- ");
      msg.type = 2;
      allMessagesArray.push(msg);

      if (chatStatusIcon == false) {
        updatedStore.dispatch(chatNumberADD());
      }

      // console.log(msg);
      // const { _id } = msg;

      // var OldMessages = store.getState().Messages;
      // var checkAlready = OldMessages.find((x) => x._id == _id);
      // if (typeof checkAlready == "undefined") {
      //   OldMessages.push(msg);
      //   var NumberOfUnseenMessages = store.getState().NumberOfUnseenMessages;
      //   store.dispatch({ type: "UpdateMessages", state: OldMessages });
      //   store.dispatch({
      //     type: "NumberOfUnseenMessages",
      //     state: NumberOfUnseenMessages + 1,
      //   });
      // }
    });
    // scrollToBottom();
  }, [allMessagesArray]);

  return <ChatDisplay chatIconStatus={chatStatusIcon} />;
};

export default ChatPopUp;

const LogoHeader = () => {
  return (
    <div className="logo_header_main">
      <img
        width="200px"
        style={{ marginRight: "15px" }}
        src={logo}
        alt="logo"
      />
    </div>
  );
};

export const CustomerMessage = (props) => {
  return (
    <div className="customer__message__box">
      <div style={{ flex: 1 }}></div>
      <div className="customer__message">
        <p className="messageText">{props.message}</p>
      </div>
    </div>
  );
};

export const RiderMessage = (props) => {
  return (
    <div className="rider__message__box">
      <div className="rider__message">
        <p className="messageText">{props.message}</p>
      </div>

      <div style={{ flex: 1 }}></div>
    </div>
  );
};

export const ChatDisplay = (props) => {
  const [custMessage, setCustMessage] = useState("");

  function messageSend() {
    if (custMessage !== "") {
      console.log("messageSend hit");
      sendNewMessage(custMessage, CusId, DriverId, RideId);

      setCustMessage("");
    } else {
      // TODO: make sure to remove this
      alert("Type SomeThing to Send!");
    }
    // customerMessageReceiver();
    // riderMessageReceiver();
  }

  const dispatch = useDispatch();

  return (
    <>
      {props.chatIconStatus ? (
        <div className="chat__displayPanel">
          <div className="chat__header">
            <BiMessage style={{ color: "gray", marginLeft: "12px" }} />
            <p
              style={{
                margin: "0px",
                fontSize: "12px",
                color: "gray",
                marginLeft: "8px",
              }}
            >
              Message Rider
            </p>
            <span
              onClick={() => dispatch(chatIconStatus())}
              style={{
                color: "gray",
                fontSize: "15px",
                position: "absolute",
                right: "10px",
                fontWeight: "bold",
                cursor: "pointer",
              }}
            >
              &#10005;
            </span>
          </div>

          <div className="chat__body">
            <div className="messages__box">
              {/* <Scrollbars> */}

              <ScrollableFeed>
                <LogoHeader />
                {allMessagesArray.map((val) => {
                  if (val.type === 1) {
                    return <CustomerMessage message={val.message} />;
                  }
                  if (val.type === 2) {
                    return <RiderMessage message={val.message} />;
                  }
                })}
              </ScrollableFeed>
              {/* </Scrollbars> */}
            </div>
          </div>

          <div className="chat__footer">
            <input
              className="messsageField"
              type="text"
              placeholder="Type your message"
              value={custMessage}
              onChange={(e) => {
                setCustMessage(e.target.value);
              }}
            />

            <span
              className="messageSendButton"
              onClick={() => {
                messageSend();
              }}
            >
              <AiOutlineArrowRight
                style={{
                  color: "gray",
                  fontSize: "30px",
                  cursor: "pointer",
                  marginLeft: "10px",
                  marginRight: "5px",
                }}
              />
            </span>
          </div>
        </div>
      ) : null}
    </>
  );
};
