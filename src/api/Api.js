import axios from "axios";

export default axios.create({
  // baseURL: "http://vtheatre-env.eba-dfqrgkrf.us-east-2.elasticbeanstalk.com/vtheatre/v1",
  baseURL: "http://192.168.1.110:8080/vtheatre/v1",
});
