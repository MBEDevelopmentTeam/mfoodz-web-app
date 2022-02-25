const cartNumber = (state = 0, action) => {
  switch (action.type) {
    case "addtocart":
      return (state = state + 1);

    case "deletefromcart":
      if (state > 0) {
        return (state = state - 1);
      }
    case "emptycart":
      // alert("cart empty");
      return (state = state = 0);

    default:
      return state;
  }
};
export default cartNumber;
