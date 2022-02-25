const chatNumber = (state = 0, action) => {
  switch (action.type) {
    case "chatNumberADD":
      return (state = state + 1);

    case "chatNumberNULL":
      return (state = 0);

    default:
      return state;
  }
};
export default chatNumber;
