import react from '@vitejs/plugin-react';
import zipPack from 'vite-plugin-zip-pack';
import { viteMockServe } from 'vite-plugin-mock';
import tailwindcss from '@tailwindcss/vite';
// import viteCompression from "vite-plugin-compression";
// import { visualizer } from "rollup-plugin-visualizer";
import { resolve } from 'path';

// https://vite.dev/config/
export default ({ mode, command }) => {
  console.log(mode, 'mode');
  console.log(command, 'command');
  // eslint-disable-next-line no-undef
  const root = process.cwd(); //获取当前工作目录的路径
  const pathResolve = (dir) => {
    return resolve(root, '.', dir);
  };
  return {
    plugins: [
      react(),
      tailwindcss(),
      // 打包后压缩文件夹
      zipPack({
        inDir: 'dist', // 要压缩的目录
        outDir: '.', // 输出 ZIP 文件的目录
        outFileName: 'dist.zip', // 输出的 ZIP 文件名
      }),
      // mock
      viteMockServe({
        mockPath: './mock/', // Mock 文件存放的目录路径（相对于项目根目录）。
        watchFiles: true, // 是否监听 Mock 文件变化并自动热更新
        enable: command === 'serve', // 本地开发环境启动，其余build的都不启动
      }),
      //默认压缩gzip，生产.gz文件
      // viteCompression({
      //   deleteOriginFile: false, //压缩后是否删除源文件
      // }),
      // visualizer({
      //   open: false, //build后，是否自动打开分析页面，默认false
      //   gzipSize: true, //是否分析gzip大小
      //   brotliSize: true, //是否分析brotli大小
      // }),
    ],
    server: {
      host: true,
      port: 6686,
      open: true,
      proxy: {
        '/dev-api/mock': {
          target: '',
        },
        '/dev-api': {
          target: 'http://127.0.0.1:7002',
          changeOrigin: true,
          rewrite: (p) => p.replace(/^\/dev-api/, '/admin/v1'),
        },
      },
    },
    build: {
      outDir: 'dist',
      chunkSizeWarningLimit: 1500,
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (!id.includes('node_modules')) return

            if (id.includes('react-router')) {
              return 'vendor-router'
            }

            if (id.includes('redux') || id.includes('@reduxjs')) {
              return 'vendor-redux'
            }

            if (id.includes('@ant-design/icons')) {
              return 'vendor-icons'
            }

            if (id.includes('antd') || id.includes('rc-') || id.includes('@rc-component') || id.includes('@ant-design')) {
              return 'vendor-antd'
            }

            if (id.includes('react') || id.includes('scheduler')) {
              return 'vendor-react'
            }

            if (id.includes('dayjs')) {
              return 'vendor-dayjs'
            }

            return 'vendor'
          },
        },
      },
    },
    resolve: {
      alias: {
        '@': pathResolve('src'),
        '@components': pathResolve('src/components'),
        '@pages': pathResolve('src/pages'),
        '@hooks': pathResolve('src/hooks'),
        '@api': pathResolve('src/api'),
        '@styles': pathResolve('src/styles'),
        '@layouts': pathResolve('src/layouts'),
        '@router': pathResolve('src/router'),
        '@store': pathResolve('src/store'),
        '@config': pathResolve('src/config'),
        '@utils': pathResolve('src/utils'),
        '@assets': pathResolve('src/assets'),
      },
    },
  };
};
