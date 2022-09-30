export interface ApiResult<T> {
  code: number;
  data: T;
  status?: number;
  msg: string;
  /** 登录接口返回 */
  token?: string;
}
