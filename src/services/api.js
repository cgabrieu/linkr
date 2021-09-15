import axios from "axios";

const API_URL = "https://mock-api.bootcamp.respondeai.com.br/api/v2/linkr/";

const getTrendings = (config) =>
  axios.get(API_URL + "hashtags/trendings", config);

export { getTrendings };
