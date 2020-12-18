import axios from "axios";

export default axios.create({
  baseURL: "http://192.168.1.110:8080/vtheatre/v1",
});
