

# vue-simple-scroll ![](https://img.shields.io/badge/version-1.0.0-blue.svg)

一款简洁的vue滚动插件，快速，高效。支持滚动条和内容自定义。

更多功能有待开发.....



## demo

https://github.com/liaoruikang/vue-simple-scroll



## or

```
# install dependencies 
npm install
 
# serve with hot reload at localhost:8080 
npm run dev
 
# build for production with minification 
npm run build
```



## How to use

```
npm i vue-simple-scroll-plugin --save
```

```
import Vue from 'vue'
import simpleScroll from 'vue-simple-scroll'
Vue.use(simpleScroll)
```

```
import {SimpleScroll} from 'vue-simple-scroll'
```

```
// Take a simple example
<simple-scroll doubleClick scrollWidth="3">
	<ul>
		<li v-for="item in 35" :key="item">{{item}}</li>
	</ul>
</simple-scroll>
```



## **API**

### Attributes

| 参数           | 说明                                        | 类型          | 可选值     | 默认值 |
| :------------- | ------------------------------------------- | ------------- | ---------- | ------ |
| height         | 整体高度                                    | String/Number | ——         | 360    |
| doubleClick    | 双击滚动条是否返回顶部                      | Boolean       | false/true | false  |
| dbSpeed        | 返回顶部速度                                | String/Number | 快3—10慢   | 5      |
| scrollWidth    | 滚动条宽度                                  | String/Number | ——         | 5      |
| scrollShowMode | 滚动条显示方式 1:淡出淡入 2:一直显示 3:隐藏 | String/Number | 1/2/3      | 1      |
| scrollSpeed    | 内容滚动速度                                | String/Number | 慢1—10快   | 5      |

### Slot

| name | 说明           |
| ---- | -------------- |
| ——   | 滚动区域的内容 |
| bar  | 自定义滚动条   |

