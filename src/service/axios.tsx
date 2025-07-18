import axios from "axios";

const axiosApiInstance = axios.create({
  baseURL: "https://api.ecoop.vn/api/v1",
});

export default axiosApiInstance;

//http://192.168.100.194:5000 home
//http://192.168.1.189:5000/api cty
//http://192.168.1.71:5000/api/v1 máy a Long
//https://api.ecoop.vn/api/v1
