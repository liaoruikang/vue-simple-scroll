import simplescroll from './simple-scroll'

// 组件列表
const components = [simplescroll]

// 定义 install 方法
const install = (Vue) => {
  // 判断是否安装
  if (install.installed) return
  components.map(component => Vue.component(component.name, component))
}

// 判断是否是直接引入文件
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

// 导出组件
export const simpleScroll = simplescroll
export default install
