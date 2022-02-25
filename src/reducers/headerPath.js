let headerpath;

if (window.location.pathname == "/" || window.location.pathname == "/main") {
  headerpath = true;
} else {
  headerpath = false;
}

const headerPath = (state = headerpath, action) => {
  switch (action.type) {
    case "headerPathTrue":
      if (
        window.location.pathname == "/" ||
        window.location.pathname == "/main"
      ) {
        return (state = true);
      }

    case "headerPathFalse":
      if (
        window.location.pathname != "/" ||
        window.location.pathname != "/main"
      ) {
        return (state = false);
      }

    default:
      return state;
  }
};

export default headerPath;
