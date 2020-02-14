# 构建过程:

## 全局安装 cnpm
npm i -g cnpm --registry=https://registry.npm.taobao.org

## 安装依赖
cnpm i

## 开发构建（在 localhost:3333 端口、支持热刷新页面、监听sass转css、基于720设计尺寸px转rem、添加浏览器前缀）
npm run dev

## 生产构建
无，直接使用src下的index.html、js、css、images



