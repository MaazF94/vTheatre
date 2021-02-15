import axios from "axios";

export default axios.create({
  baseURL: "https://api.vtheatres.com/vtheatre/v1",
  // baseURL: "http://192.168.1.110:8080/vtheatre/v1",
});
