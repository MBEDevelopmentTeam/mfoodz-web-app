const chatIconStatus = (state = false, action) => {
  switch (action.type) {
    case "chatIconStatus":
      return !state;

    default:
      return state;
  }
};
export default chatIconStatus;
