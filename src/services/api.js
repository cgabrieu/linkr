import axios from "axios";

<<<<<<< HEAD
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

function LogIn(request) {
  const body = {
    email: request.email,
    password: request.password,
  }
  const promise = axios.post(`${BASE_URL}/sign-in`, body);
  return promise;
}

export { SignUp, LogIn }
=======
const API_URL = "https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/";

const getTrendings = (config) =>
  axios.get(API_URL + "hashtags/trendings", config);

export { getTrendings };
>>>>>>> d9c8dcb3886989facde540dde9ba9b75cba7c0fd
