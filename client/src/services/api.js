import axios from "axios";

const api = axios.create({
  baseURL: "https://ai-code-reviewer-compiler.onrender.com/api",
});

export default api;