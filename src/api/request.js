import axios from "axios";
import { ElMessage } from "element-plus";
import config from "@/config";
import { getToken } from "@/utils";

const service = axios.create({
  baseURL: config.baseApi,
});

const NETWORK_ERROR = "网络错误……";

// 请求拦截器：自动携带 token
service.interceptors.request.use(
  function (config) {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `${token}`;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

// 响应拦截器：统一处理返回数据和错误
service.interceptors.response.use(
  (res) => {
    const { code, data, msg } = res.data;
    if (code === 200) {
      if (msg) {
        ElMessage({
          showClose: true,
          message: msg,
          type: "success",
        });
      }
      return data;
    } else {
      ElMessage.error(msg || NETWORK_ERROR);
      return Promise.reject(msg || NETWORK_ERROR);
    }
  },
  (error) => {
    // 网络层错误也提示
    ElMessage.error(error?.message || NETWORK_ERROR);
    return Promise.reject(error);
  }
);

// 请求封装逻辑
function request(options) {
  options.method = options.method || "get";

  if (options.method.toLowerCase() === "get") {
    options.params = options.data;
  }

  // mock 处理
  let isMock = config.mock;
  if (typeof options.mock !== "undefined") {
    isMock = options.mock;
  }

  if (config.env === "production") {
    service.defaults.baseURL = config.baseApi;
  } else {
    service.defaults.baseURL = isMock ? config.mockApi : config.baseApi;
  }

  return service(options);
}

export default request;
