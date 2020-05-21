# axios-apicloud-adapter

> axios 的 apicloud 适配器，以便于在 app 中使用原生网络请求库

[![npm package](https://img.shields.io/npm/v/axios-apicloud-adapter.svg)](https://npmjs.org/package/axios-apicloud-adapter)
[![npm downloads](http://img.shields.io/npm/dm/axios-apicloud-adapter.svg)](https://npmjs.org/package/axios-apicloud-adapter)


## 安装

``` sh
yarn add axios-apicloud-adapter
```


## 使用

``` js
// main.js
import axios from 'axios'
import apicloudAdapter from 'axios-apicloud-adapter'

axios.defaults.adapter = apicloudAdapter
```


## 特性

 * 通过 `window.api` 检测运行环境，自动切换适配器
 * 文件上传通过 Base64 编码文件后实现，需后端配合做相关处理


## 参考

 * [axios-miniprogram-adapter](https://github.com/bigmeow/axios-miniprogram-adapter)


## 相关

 * [vue-apicloud-quickstart](https://github.com/w-xuefeng/vue-apicloud-quickstart)
 * [@w-xuefeng/vue-cli-plugin-apicloud](https://github.com/w-xuefeng/vue-cli-plugin-apicloud)
