### Re0：Vue3项目初始化 [参考](https://www.jianshu.com/p/155b63046268)

<p style='margin-bottom:5px'>目录 <a id = 'step'/></p>	
<p style='margin-bottom:0px'><a href = '#step1' style='color:#3deb32'>一、初始化项目</a></p>	
<p style='margin-bottom:0px'><a href = '#step2' style='color:#3deb32'>二、引入router</a></p>	
<p style='margin-bottom:0px'><a href = '#step3' style='color:#3deb32'>三、引入pinia</a></p>	
<p style='margin-bottom:0px'><a href = '#step4' style='color:#3deb32'>四、引入naive ui</a></p>	
<p style='margin-bottom:0px'><a href = '#step5' style='color:#3deb32'>五、引入Aixos</a></p>	
<p style='margin-bottom:0px'><a href = '#step6' style='color:#3deb32'>六、引入nprogress</a></p>	

#### 一、初始化项目 2022.01.21 <a id = 'step1'/> <a href = '#step' style='color:#3deb32'>目录</a> <a href = '#step2' style='color:#3deb32'>下一步</a>
1. ~~npm init @vitejs/app~~ npm init vite
2. 输入项目名称
3. 选择项目框架 `vue-ts`,如果这一步没有 `vue-ts`则选择 `vue`,在下一步选择 `vue-ts`
4. npm i
5. `index.html` 中更改项目名字 
6. 删除多余文件`components`,`assets`下的图片,`App.vue`中的代码
7. 新建三个环境文件,属性名必须以`VITE_`开头
	* `.env` 全局默认配置文件 
	* `.env.development` 开发环境 
	* `.env.production` 生产环境 
8. 设置路径别名
	* `tsconfig.json`
	```js
		{
			"compilerOptions": {
				...
				"baseUrl": ".",
				"paths": {
				  "@/*": ["src/*"]
				}
			}
		}
	```
	* npm i @types/node -D
	* `vite.config.ts`
	```js
		// 注意：只在`tsconfig.json`设置会出现绝路路径vsCode报错,使用别名浏览器报错
		import { resolve } from "path"; // 此包 @types/node 中的 path 模块
		...
		export default defineConfig({
			...
			resolve: {
				alias: [
				  {
					find: /@\//,
					replacement: resolve("src") + "/",
				  },
				],
			},
		});
	```
	
> 注
* `src`目录下的`vite-env.d.ts` 使ts识别项目中的 `.vue`结尾的文件
* `vite.config.ts`相当于`vue-cli`的`vue.config.js`文件
* 当前版本的 setup 语法糖 [参考](https://www.cnblogs.com/onesea/p/15602810.html)


#### 二、引入router <a id = 'step2'/> <a href = '#step1' style='color:#3deb32'>上一步</a> <a href = '#step' style='color:#3deb32'>目录</a> <a href = '#step3' style='color:#3deb32'>下一步</a>
1. npm install vue-router@4  --save
2. 修改 `App.vue`
```js
<template><router-view /></template>
```
3. 新建 `pages/home.vue` 文件
```html
<template>你好 - 世界</template>
<script setup lang="ts"></script>
```
4. 新建 `/router/index.ts` 文件
```js
	import { createRouter, createWebHistory, Router, RouteRecordRaw } from "vue-router";

	/** 动态引入 module 文件下的 子路由 */
	// const doc = import.meta.globEager("./module/*.ts");
	// const childrenRouter: RouteRecordRaw[] = [];
	// Object.values(doc).forEach((item: any) => {
	//   item.default.forEach((val: RouteRecordRaw) => {
	//     childrenRouter.push(val);
	//   }); 
	// });

	const router: Router = createRouter({
		//history模式使用HTML5模式
		history: createWebHistory(),
		routes: [
			{
				path: "/",
				redirect: "/home",
			},
			{
				path: "/home",
				name: "home",
				component: () => import("@/pages/home.vue"),
			},
		]
	});
	export default router;
```

3. 修改`main.ts`
```js
import { createApp } from "vue";
import App from "./App.vue";
import router from "@/router/index";

const app = createApp(App);
app.use(router).mount("#app");
```

#### 三、引入pinia <a id = 'step3'/> <a href = '#step2' style='color:#3deb32'>上一步</a> <a href = '#step' style='color:#3deb32'>目录</a> <a href = '#step4' style='color:#3deb32'>下一步</a>
1. npm i pinia
2. `main.js`
```js
	import { createPinia } from "pinia";
	...
	app.use(createPinia());
```

3. 创建`store/index.ts`, 自动注册
```js
	import { defineStore } from 'pinia'
	export const useIndexStore = defineStore('index', {
	  state: () => {
		return { count: 0 }
	  },
	})
```

4. 页面中使用
```html
	<template>
		<h1>{{ counter.count }}</h1>
	</template>
	<script setup lang="ts">
		import { useIndexStore } from "@/store/index";
		const counter = useIndexStore();
	</script>
```

#### 四、引入naive ui [参考](https://www.naiveui.com/zh-CN/os-theme/docs/installation)<a id = 'step4'/> <a href = '#step3' style='color:#3deb32'>上一步</a> <a href = '#step' style='color:#3deb32'>目录</a> <a href = '#step5' style='color:#3deb32'>下一步</a>
1. npm i -D naive-ui
2. 可以使用 unplugin-auto-import 插件来自动导入 API,使用 unplugin-vue-components 插件来按需自动加载组件
	* npm install -D unplugin-vue-components unplugin-auto-import
	* 修改`vite.config.ts
	```js
		import AutoImport from 'unplugin-auto-import/vite'
		import Components from 'unplugin-vue-components/vite'
		import { NaiveUiResolver } from 'unplugin-vue-components/resolvers'
		
		export default {
		  plugins: [
		    // ...
		     AutoImport({
				imports: [
      				// 自动导入 Vue vue-router 相关函数，如：ref, reactive, toRef 等
					'vue',
         			"vue-router",
					{
					'naive-ui': [
						'useDialog',
						'useMessage',
						'useNotification',
						'useLoadingBar'
					]
					},
				],
				// 设置存储自动引入Vue vue-router 等 相关函数的文件 的路径
      			dts: "./src/auto-imports.d.ts",	
			}),
			Components({
				resolvers: [NaiveUiResolver()],
				// 设置存储自动引入组件的文件 的路径
      			dts: "./src/components.d.ts",
			})
		  ],
		}
	```
4. 页面使用
```html
	<template>
		 <n-button type="primary">Default</n-button>
	</template>
```

5. 解决使用 `useMessage()` 报错，并全局挂载 [参考](https://blog.csdn.net/RequesToGod/article/details/125667493)
	* 新建 `components/message.vue` 
	```vue
		<template>
			<div></div>
		</template>

		<script lang="ts" setup>
			window.$message = useMessage();
		</script>
	```
	* 新建 `src/global.d.ts` 
	```js
		import type { PropType as VuePropType } from "vue";
		import { App } from "vue";
		import type { DialogApiInjection } from "naive-ui/lib/dialog/src/DialogProvider";
		import type { MessageApiInjection } from "naive-ui/lib/message/src/MessageProvider";
		// GlobalComponents for Volar

		declare global {
		interface Window {
			// Global vue app instance
			__APP__: App<Element>;
			webkitCancelAnimationFrame: (handle: number) => void;
			mozCancelAnimationFrame: (handle: number) => void;
			oCancelAnimationFrame: (handle: number) => void;
			msCancelAnimationFrame: (handle: number) => void;
			webkitRequestAnimationFrame: (callback: FrameRequestCallback) => number;
			mozRequestAnimationFrame: (callback: FrameRequestCallback) => number;
			oRequestAnimationFrame: (callback: FrameRequestCallback) => number;
			msRequestAnimationFrame: (callback: FrameRequestCallback) => number;
		}
		interface Window {
			$message: MessageApiInjection;
			$dialog: DialogApiInjection;
		}

		// vue
		type PropType<T> = VuePropType<T>;

		type Writable<T> = {
			-readonly [P in keyof T]: T[P];
		};

		type Nullable<T> = T | null;

		type Recordable<T = any> = Record<string, T>;
		type ReadonlyRecordable<T = any> = {
			readonly [key: string]: T;
		};
		type Indexable<T = any> = {
			[key: string]: T;
		};
		type DeepPartial<T> = {
			[P in keyof T]?: DeepPartial<T[P]>;
		};
		type TimeoutHandle = ReturnType<typeof setTimeout>;
		type IntervalHandle = ReturnType<typeof setInterval>;

		interface ChangeEvent extends Event {
			target: HTMLInputElement;
		}

		interface WheelEvent {
			path?: EventTarget[];
		}

		function parseInt(s: string | number, radix?: number): number;

		function parseFloat(string: string | number): number;
		}
	```
	* 在`App.vue`入口文件中进行挂载
	```vue
		<template>
			<router-view />
			<n-message-provider> <Message /></n-message-provider>
		</template>
		<script setup lang="ts"></script>

		<style scoped lang="scss"></style>
	```
	* 使用
	```js
		 window.$message.success('使用成功!');
	```

#### 五、引入Aixos <a id = 'step5'/> <a href = '#step4' style='color:#3deb32'>上一步</a> <a href = '#step' style='color:#3deb32'>目录</a> <a href = '#step6' style='color:#3deb32'>下一步</a>
1. npm i axios
2. `.env` 或其他配置文件中写入
```js
	VITE_AXIOS_URL = '后台接口地址'
```
3. 新建`api/index.ts`
```js
	// 后台返回接口数据接口 根据后台自行修改
	export interface ApiResult<T> {
	code: number;
	data: T;
	status?: number;
	msg: string;
	token?: string;
	}
```
3. 新建`src/request.d.ts`
```js
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
```

4. 新建`api/request.ts`
```js
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
			// todo 此处根据ui设置全局提示
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
		// todo 此处根据ui设置全局提示
    	window.$message.error(message, { duration: 5 * 1000 });
		return Promise.reject(error);
	}
	);

	export default service;
```

5. 使用
```js
	import request from "@/api/request";
	request.get()
```

> 配置跨域
```js
	import { loadEnv } from "vite";
	
	export default({command,mode}) =>{
	  return  defineConfig({
	    server: {
			strictPort: true, // 端口被占用直接退出
			open: true, // 在开发服务器启动时自动在浏览器中打开应用程序
			proxy: {
				// 字符串简写写法
				// '/foo': '',
				// 选项写法
				"/dev-api": {
					target: mode === "development" ? loadEnv(mode, process.cwd()).VITE_AXIOS_URL : loadEnv(mode, process.cwd()).VITE_PROD_URL,
					changeOrigin: true,
					rewrite: (path) => path.replace(/^\/dev-api/, ""),
				},
			},
	    },
	  });
	}
```

> 配置局域网访问和默认端口
```js
	server: {
		// 端口被占用直接退出
		strictPort: true,
		// 在开发服务器启动时自动在浏览器中打开应用程序
		open: true,
		hmr: {
			// 屏蔽服务器报错
			overlay: false,
		},
		// 局域网访问
		host: "192.168.80.136",
		port: 10000,
	}
```

#### 六、引入nprogress（进度条）<a id = 'step6'/> <a href = '#step5' style='color:#3deb32'>上一步</a> <a href = '#step' style='color:#3deb32'>目录</a> <a href = '#step7' style='color:#3deb32'>下一步</a>
1. npm install --save nprogress 
2. npm install @types/nprogress -D
3. 路由跳转显示加载条
	* 新建 `router/guard/nprogress.ts`
	```js
		import type { Router } from "vue-router";
		import 'nprogress/nprogress.css'
		import NProgress from 'nprogress';

		export function createNProgress(router: Router) {

			router.beforeEach(async (to) => {
				NProgress.start();
				return true;
			})

			router.afterEach(async (to) => {
				NProgress.done();
				return true;
			})
		}
	```

	* 修改`router/index.ts`
	```js
		import { createNProgress } from "./guard/nprogress";
		...
		createNProgress(router);
	```
#### 七、引入其他插件 <a id = 'step7'/> <a href = '#step6' style='color:#3deb32'>上一步</a> <a href = '#step' style='color:#3deb32'>目录</a> <a href = '#step8' style='color:#3deb32'>下一步</a>
1. `npm install --save-dev sass`
2. `npm install normalize.css`
	```scss
	// 引入第三方初始化样式
	@import 'normalize.css';
	```
3. `npm install xe-utils vxe-table`  [vxe-table 官网](https://vxetable.cn/#/modal/api)
4. `npm i --save lodash`  [lodash 官网](https://www.lodashjs.com/) 