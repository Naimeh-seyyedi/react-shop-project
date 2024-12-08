import axios from "axios";
import { Link, Navigate, useNavigate } from "react-router-dom";
// const {navigate}=useNavigate();
class HttpAdmin {
  constructor(entity) {
    this.instance = axios.create();
    this.entity = entity;
    this.baseURL = `http://localhost:3002${this.entity}`;
    this.instance.interceptors.request.use(
      (config) => {
        let token = localStorage.getItem("token_local_key");
        if (token) {
          config.headers["x-auth-token"] = token;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

  
    this.instance.interceptors.response.use(
      (response) => {
        return response;
      },
      (error) => {
        if (error.response.status === 401) {
          <Navigate to="/authentication" />;
          //  this.navigate("/authentication" )
        }
        return Promise.reject(error);
      }
    );
  }

  get(url, config) {
    return axios.get(url, config);
  }

  post(url, data, config) {
    return axios.post(url, data, config);
  }

  put(url, data, config) {
    return axios.put(url, data, config);
  }

  patch(url, data, config) {
    return axios.patch(url, data, config);
  }

  delete(url, config) {
    return axios.delete(url, config);
  }
}

export default HttpAdmin;
