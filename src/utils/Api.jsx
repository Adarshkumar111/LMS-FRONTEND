import axios from "axios";

const Api = axios.create({
  baseURL: "http://localhost:8000", // backend ka base URL
  withCredentials: true, // cookies bhejne ke liye (agar JWT cookies use ho rahi hain)
});

export default Api;
