import { ApiResult } from "@/api";

declare module "axios" {
  export interface AxiosInstance {
    <T = any>(config: AxiosRequestConfig): Promise<ApiResult<T>>;

    request<T = any>(config: AxiosRequestConfig): Promise<ApiResult<T>>;

    get<T = any>(url: string, config?: AxiosRequestConfig): Promise<ApiResult<T>>;

    delete<T = any>(url: string, config?: AxiosRequestConfig): Promise<ApiResult<T>>;

    head<T = any>(url: string, config?: AxiosRequestConfig): Promise<ApiResult<T>>;

    post<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<ApiResult<T>>;

    put<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<ApiResult<T>>;

    patch<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<ApiResult<T>>;
  }
}
