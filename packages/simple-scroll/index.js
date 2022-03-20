import simpleScroll from './src'

simpleScroll.install = (Vue) => {
  Vue.component(simpleScroll.name, simpleScroll)
}

// 导出组件
export default simpleScroll
