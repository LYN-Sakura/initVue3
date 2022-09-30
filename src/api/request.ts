import axios from "axios";
import router from "@/router";

console.log("当前地址", import.meta.env.VITE_AXIOS_URL);

// 创建axios实例
const service = axios.create({
  // 服务接口请求，VITE_AXIOS_URL 在环境文件(.env)中配置
  baseURL: import.meta.env.VITE_AXIOS_URL,
  // 超时设置
  timeout: 10 * 1000,
  headers: { "Content-Type": "application/json;charset=utf-8" },
});

let loading: any;
//正在请求的数量
let requestCount: number = 0;
//显示loading
const showLoading = () => {
  if (requestCount === 0 && !loading) {
    // todo 此处根据ui设置全局loading或者提示
  }
  requestCount++;
};
//隐藏loading
const hideLoading = () => {
  requestCount--;
  if (requestCount == 0) {
    loading.close();
    loading = null;
  }
};

// 请求拦截
service.interceptors.request.use(
  (config) => {
    showLoading();
    // 是否需要设置 token
    if (config.headers) {
      // todo 此处 根据后台要求添加header上的字段
    }
    // get请求映射params参数
    if (config.method === "get" && config.params) {
      let url = config.url + "?";
      for (const propName of Object.keys(config.params)) {
        const value = config.params[propName];
        var part = encodeURIComponent(propName) + "=";
        if (value !== null && typeof value !== "undefined") {
          if (typeof value === "object") {
            for (const key of Object.keys(value)) {
              let params = propName + "[" + key + "]";
              var subPart = encodeURIComponent(params) + "=";
              url += subPart + encodeURIComponent(value[key]) + "&";
            }
          } else {
            url += part + encodeURIComponent(value) + "&";
          }
        }
      }
      url = url.slice(0, -1);
      config.params = {};
      config.url = url;
    }
    return config;
  },
  (error) => {
    console.log(error);
    Promise.reject(error);
  }
);

// 响应拦截器
service.interceptors.response.use(
  (res: any) => {
    hideLoading();
    // 未设置状态码则默认成功状态
    const code = res.data["code"] || 200;
    // 获取错误信息
    const msg = res.data["msg"];
    if (code === 200) {
      return Promise.resolve(res.data);
    } else if (code == 401) {
      /** 登录失效 跳转到登录页 */
      return router.push("/login");
    } else {
      // 设置全局提示
      window.$message.error(msg);
      return Promise.reject(res.data);
    }
  },
  (error) => {
    console.log("err" + error);
    hideLoading();
    let { message } = error;
    if (message == "Network Error") {
      message = "后端接口连接异常";
    } else if (message.includes("timeout")) {
      message = "系统接口请求超时";
    } else if (message.includes("Request failed with status code")) {
      message = "系统接口" + message.substr(message.length - 3) + "异常";
    }
    // 设置全局提示
    window.$message.error(message, { duration: 5 * 1000 });
    return Promise.reject(error);
  }
);

export default service;
