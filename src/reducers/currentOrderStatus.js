const currentOrderStatus = (state = true, action) => {
  switch (action.type) {
    case "currentOrderStatusTrue":
      return (state = true);

    case "currentOrderStatusFalse":
      return (state = false);

    default:
      return state;
  }
};

export default currentOrderStatus;
