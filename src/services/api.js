import axios from "axios";

const BASE_URL = "https://mock-api.bootcamp.respondeai.com.br/api/v3/linkr";

function getConfig(token) {
  return ({
    headers: {
        "Authorization": `Bearer ${token}`
    }
  });
}

function SignUp(request) {
  const body = {
    email: request.email,
    password: request.password,
    username: request.username,
    pictureUrl: request.pictureUrl,
  };
  const promise = axios.post(`${BASE_URL}/sign-up`, body);
  return promise;
}

function LogIn(request) {
  const body = {
    email: request.email,
    password: request.password,
  };
  const promise = axios.post(`${BASE_URL}/sign-in`, body);
  return promise;
}

function getListPosts(token) {
  const promise = axios.get(`${BASE_URL}/posts`, getConfig(token));
  return promise;
}

function getTrendings(token) {
  return axios.get(`${BASE_URL}/hashtags/trending`, getConfig(token));
}

function postPublish(link, description, token) {
  const body = {
    text: description,
    link: link,
  };
  return axios.post(`${BASE_URL}/posts`, body, getConfig(token));
}

function putEditUserPost(postId, token) {
  return axios.put(`${BASE_URL}/posts/${postId}`, body, getConfig(token));
}

export { 
  SignUp, 
  LogIn,
  getTrendings,
  getListPosts,
  postPublish,
  putEditUserPost,
};
