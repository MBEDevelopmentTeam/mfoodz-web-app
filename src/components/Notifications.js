import "react-notifications-component/dist/theme.css";
import { store } from "react-notifications-component";

export function notifySuccess(message) {
  store.addNotification({
    title: "Success",
    message: message,
    type: "success",
    insert: "bottom",
    width: 320,
    container: "bottom-right",
    animationIn: ["animate__animated", "animate__fadeIn"],
    animationOut: ["animate__animated animate__fadeOut"],
    dismiss: {
      duration: 1000,
    },
  });
}

export function notifyError(message) {
  store.addNotification({
    title: "Error",
    message: message,
    type: "danger",
    insert: "bottom",
    width: 320,
    container: "bottom-right",
    animationIn: ["animate__animated", "animate__fadeIn"],
    animationOut: ["animate__animated animate__fadeOut"],
    dismiss: {
      duration: 1000,
    },
  });
}

export function itemAddedToCart(message) {
  store.addNotification({
    title: "Cart Updated",
    message: "Product is added to your Cart",
    type: "info",
    insert: "bottom",
    width: 320,
    container: "bottom-right",
    animationIn: ["animate__animated", "animate__fadeIn"],
    animationOut: ["animate__animated animate__fadeOut"],
    dismiss: {
      duration: 1000,
    },
  });
}
