export const finalAddress = (state = true, action) => {
  switch (action.type) {
    case "finalAddress":
      return !state;

    case "finalAddressTrue":
      return (state = true);

    case "finalAddressFalse":
      return (state = false);

    default:
      return state;
  }
};
