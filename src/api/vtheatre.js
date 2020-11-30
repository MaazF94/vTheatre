import axios from "axios";

export default axios.create({
  baseURL: "http://192.168.1.75:8080/vtheatre/v1",
});
