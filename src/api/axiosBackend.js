import axios from "axios";
import { serverUrl } from "../config";

const axiosBackend = axios.create({
    baseURL: serverUrl,
    withCredentials: true,
});

export default axiosBackend;
