import store from "../store";
import { axiosClient } from "../apiClient";

async function checkToken() {
  return axiosClient
    .get("/auth/token-check", { withCredentials: true })
    .then((response) => {
      console.log(response)
      if (response.data.status === "Success") {
          store.dispatch({ type: "USER_LOGIN" });
      } else if (response.data.status === "Error") {
        store.dispatch({ type: "USER_LOGOUT" });
      }
    })
    .catch((error) => {});
}

async function checkLogin(
  password,
  username,
) {
  // store.dispatch({ type: "RESET_WRONG" });
  if (username && password) {
    return axiosClient
      .post(
        `/auth/login`,
        JSON.stringify({ username, password }),
        {
          withCredentials: true,
        },
      )
      .catch((error) => {
        if (error.response.data.code == 2) {
          store.dispatch({ type: "WRONG_PASSWORD" });
        }
        if (error.response.data.code == 1) {
          store.dispatch({ type: "WRONG_USER" });
        }
      });
  }
}

export default async function login(
  password,
  username,
) {
  let loginResponse = await checkLogin(
    password,
    username,
  );
  checkToken();
}
