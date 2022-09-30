import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
// 此包 @types/node 中的 path 模块
import { resolve } from "path";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { NaiveUiResolver } from "unplugin-vue-components/resolvers";
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      imports: [
        // 自动导入 Vue vue-router 相关函数，如：ref, reactive, toRef 等
        "vue",
        "vue-router",
        {
          "naive-ui": ["useDialog", "useMessage", "useNotification", "useLoadingBar"],
        },
      ],
      // 设置存储自动引入Vue vue-router 等 相关函数的文件 的路径
      dts: "./src/auto-imports.d.ts",
    }),
    Components({
      resolvers: [NaiveUiResolver()],
      // 设置存储自动引入组件的文件 的路径
      dts: "./src/components.d.ts",
    }),
  ],
  resolve: {
    alias: [
      {
        find: /@\//,
        replacement: resolve("src") + "/",
      },
    ],
  },
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
    port: 8989,
  },
});
