# axios-apicloud-adapter

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

## 参考

 * [axios-miniprogram-adapter](https://github.com/bigmeow/axios-miniprogram-adapter)
