const finalOrderQueue = (state = false, action) => {
  switch (action.type) {
    case "finalOrderQueueTrue":
      return (state = true);

    case "finalOrderQueueFalse":
      return (state = false);

    default:
      return state;
  }
};

export default finalOrderQueue;
