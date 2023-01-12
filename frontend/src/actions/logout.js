import store from "../store";
import { axiosClient } from "../apiClient";

export default async function logout(redirect) {
  await axiosClient
    .get("/auth/remove", { withCredentials: true })
    .then((response) => store.dispatch({ type: "USER_LOGOUT" }))
    .then((response) => redirect && window.location.replace(redirect))
}
