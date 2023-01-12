function initialState() {
  return { logged: "notChecked", wrongPass: false, wrongUser: false };
}

export function authentication(state = initialState(), action) {
  switch (action.type) {
    case "USER_LOGIN":
      return { ...state, logged: true };
    case "USER_LOGOUT":
      return { ...state, logged: false };
    case "WRONG_PASSWORD":
      return { ...state, wrongPass: true };
    case "WRONG_USER":
      return { ...state, wrongUser: true };
    case "RESET_WRONG":
      return { ...state, wrongPass: false, wrongUser: false };

    default:
      return state;
  }
}
