import React, { useState, useEffect } from "react";
import socketio from "socket.io-client";
import io from "socket.io-client";

// let socketip = "http://172.16.1.132:9000";
let socketip = "http://172.16.100.205:3000";

export const socket = io(socketip);

export function connectToSocketForChatting(custID, custName) {
  socket.disconnect(); 

  let connecteduser = {
    CustomerId: parseInt(custID),
    status: "online",
    name: custName,
    id: parseInt(custID),
    role: "customer",
  };

  socket.emit("connected_user", connecteduser);

  socket.connect();

  setTimeout(() => {
    console.log("socket is connected in chat-client.js");
    console.log(socket.connected);
  }, 2000);
}
