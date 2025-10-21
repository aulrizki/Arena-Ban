import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000", // ganti sesuai backend kamu
});

export default api;
