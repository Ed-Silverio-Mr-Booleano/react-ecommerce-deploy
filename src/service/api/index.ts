import axios from "axios";

const api = axios.create({
  baseURL: "https://ecommer-api-bilabila-deploy-render.onrender.com/api",
});

export { api };
