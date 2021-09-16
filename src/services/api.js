import axios from "axios";
import UserContext from "../contexts/UserContext";

const BASE_URL = "https://mock-api.bootcamp.respondeai.com.br/api/v3/linkr";

const { user } = useContext(UserContext);

const config = {
  headers: {
      "Authorization": `Bearer ${user.token}`
  }
}

function postSignUp(request) {
  const body = {
    email: request.email,
    password: request.password,
    username: request.username,
    pictureUrl: request.pictureUrl,
  }
  const promise = axios.post(`${BASE_URL}/sign-up`, body);
  return promise;
}

function postLogIn(request) {
  const body = {
    email: request.email,
    password: request.password,
  }
  const promise = axios.post(`${BASE_URL}/sign-in`, body);
  return promise;
}

function postLogIn(request) {
  const body = {
    email: request.email,
    password: request.password,
  }
  const promise = axios.post(`${BASE_URL}/sign-in`, body);
  return promise;
}


export { 
  postSignUp, 
  postLogIn,

};