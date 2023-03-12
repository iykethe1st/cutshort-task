import http from "./httpService";
import config from "../config.json";

export function register(user) {
  const apiEndPoint = config.apiUrl + "/users";

  return http.post(apiEndPoint, {
    name: user.name,
    email: user.email,
    password: user.password,
  });
}
