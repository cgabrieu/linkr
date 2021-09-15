import axios from "axios";

const BASE_URL = "https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr";

function SignUp(request) {
  const body = {
    email: request.email,
    password: request.password,
    username: request.username,
    pictureUrl: request.pictureUrl,
  }
  const promise = axios.post(`${BASE_URL}/sign-up`, body);
  return promise;
}

export { SignUp }