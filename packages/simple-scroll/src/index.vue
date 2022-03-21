<template>
  <div
    class="simple__container"
    :style="{
      height,
      boxShadow: hideShadow
        ? 'none'
        : 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px'
    }"
    @mousemove="isShow = true"
    @mouseleave="isShow = false"
  >
    <!-- 内容 -->
    <div class="simple__table" ref="tableRef" v-roll>
      <div
        class="simple__content"
        v-observe="openMonitor"
        style="top: 0; left: 0"
        ref="contentRef"
      >
        <slot>
          <li class="simple__li" v-for="item in 15" :key="item">
            {{ item }}
          </li>
        </slot>
      </div>
    </div>
    <!-- 滚动条 -->
    <div
      class="simple__scroll"
      ref="scrollRef"
      :style="{ width: scrollWidth }"
      v-show="scrollShowMode == 3 ? false : true"
    >
      <div
        class="simple__scrollBar"
        ref="barRef"
        @mousedown="noDown"
        @dblclick="noDblclick"
      >
        <slot name="bar">
          <div class="bar"></div>
        </slot>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'simple-scroll',
  props: {
    // 滚动条区域高度
    height: {
      type: String,
      default: '360px'
    },
    // 双击返回顶部
    doubleClick: {
      type: Boolean,
      default: false
    },
    // 返回顶部速度
    dbSpeed: {
      validator(val) {
        if (
          typeof val === 'number' ||
          (typeof val === 'string' && val <= 20 && val >= 3)
        ) {
          return true
        } else {
          return false
        }
      },
      default: 5
    },
    // 滚动条宽度
    scrollWidth: {
      type: String,
      default: '5px'
    },
    // 滚动条显示方式
    scrollShowMode: {
      type: [Number, String],
      // 1 淡出淡入
      // 2 一直显示
      // 3 隐藏
      default: 1
    },
    // 内容滚动速度
    scrollSpeed: {
      validator(val) {
        if (
          typeof val === 'number' ||
          (typeof val === 'string' && val <= 20 && val >= 1)
        ) {
          return true
        } else {
          return false
        }
      },
      default: 5
    },
    // 隐藏阴影
    hideShadow: {
      type: Boolean,
      default: false
    },
    // 开启动态监听内容变化
    openMonitor: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      // 鼠标按下
      isDown: false,
      // 滚动条最大移动距离
      barMax: null,
      // 鼠标起使位置
      startY: null,
      // 缩放比例
      cZoom: null,
      // 内容最大移动距离
      cMax: null,
      scrollEL: null,
      tableEl: null,
      contentEl: null,
      barEl: null,
      dbTimer: null,
      // 显示隐藏滚动条
      isShow: true,
      showTimer: null,
      hideTimer: null,
      isScroll: true
    }
  },
  created() {
    // 绑定鼠标离开 移动事件
    window.onmouseup = this.noUp
    window.onmousemove = this.noMove
  },
  mounted() {
    // 初始化需要的一些数据
    this.scrollEL = this.$refs.scrollRef
    this.tableEl = this.$refs.tableRef
    this.contentEl = this.$refs.contentRef
    this.barEl = this.$refs.barRef
    this.judge()
    this.isShow = false
  },
  methods: {
    // 当鼠标按下滚动条时
    noDown(e) {
      this.isDown = true
      // 鼠标起使位置
      this.startY = e.pageY - this.barEl.offsetTop
      // 禁用鼠标选中文字
      document.documentElement.style = `
      -moz-user-select: none;
      -khtml-user-select: none;
      user-select: none;
      `
      clearInterval(this.dbTimer)
    },
    // 当鼠标松开滚动条时
    noUp() {
      this.isDown = false
      // 启用鼠标选中文字
      document.documentElement.style = `
      -moz-user-select: select;
      -khtml-user-select: select;
      user-select: select;
      `
    },
    // 鼠标移动事件
    noMove(e) {
      if (this.isDown) {
        // 获取滚动条要移动的位置
        let y =
          e.pageY - this.barEl.offsetTop - this.startY + this.barEl.offsetTop
        if (y > this.barMax) {
          y = this.barMax
        } else if (y < 0) {
          y = 0
        }
        console.log(y)

        this.barEl.style.top = `${y}px`
        this.contentEl.style.top = `${-(y * this.cZoom)}px`
      }
    },
    // 鼠标滚动事件
    scroll(e, db) {
      if (!this.isScroll || this.isDown) return
      // 阻止浏览器滚动
      e && e.preventDefault()
      // 计算每次需要滚动的距离
      let y =
        (this.contentEl.offsetHeight / this.tableEl.offsetHeight) *
        this.scrollSpeed
      y = y >= 200 ? 200 : y
      if (db) {
        if (this.barEl.offsetTop <= 0) return clearInterval(this.dbTimer)
        let top =
          parseInt(this.contentEl.style.top.replace('px', '')) +
          ((-this.contentEl.offsetTop / this.contentEl.offsetHeight) *
            this.contentEl.offsetHeight) /
            this.dbSpeed
        if (top > 0) {
          top = 0
        }
        this.contentEl.style.top = `${top}px`
        this.barEl.style.top = `${-(top / this.cZoom)}px`
        return
      }
      // 判断滚动方向
      if (e.wheelDelta <= -120 || e.detail === 2) {
        let top = parseInt(this.contentEl.style.top.replace('px', '')) - y
        if (Math.abs(top) > this.cMax) {
          top = -this.cMax
        }
        this.contentEl.style.top = `${top}px`
        this.barEl.style.top = `${-(top / this.cZoom)}px`
      } else {
        let top = parseInt(this.contentEl.style.top.replace('px', '')) + y
        if (top > 0) {
          top = 0
        }
        this.contentEl.style.top = `${top}px`
        this.barEl.style.top = `${-(top / this.cZoom)}px`
      }
      clearInterval(this.dbTimer)
    },
    // 双击滚动条返回顶部
    noDblclick() {
      if (!this.doubleClick) return
      this.dbTimer = setInterval(() => {
        this.scroll(null, true)
      }, 20)
    },
    judge() {
      // 判断是否需要滚动条 以及动态修改滚动条高度
      if (this.contentEl.offsetHeight <= this.tableEl.offsetHeight) {
        this.isScroll = false
        this.$refs.scrollRef.style.display = 'none'
      } else {
        this.isScroll = true
        this.$refs.scrollRef.style.display = 'block'
        let h = (this.tableEl.offsetHeight / this.contentEl.offsetHeight) * 300
        h = h < 20 ? 20 : h
        this.barEl.style.height = h + 'px'
      }
      // 滚动条最大移动距离
      this.barMax = this.scrollEL.offsetHeight - this.barEl.offsetHeight
      // 内容最大移动距离
      this.cMax = this.contentEl.offsetHeight - this.tableEl.offsetHeight
      // 滚动条与内容区域的缩放比例
      this.cZoom =
        this.cMax / (this.scrollEL.offsetHeight - this.barEl.offsetHeight)
    }
  },
  directives: {
    // 自定义滚动事件
    roll: {
      // eslint-disable-next-line no-unused-vars
      inserted(el, binding, vnode) {
        let isEvent = true
        if (el.attachEvent) {
          el.attachEvent('onmousewheel', vnode.context.scroll)
        } else {
          el.addEventListener('DOMMouseScroll', (e) => {
            isEvent = false
            vnode.context.scroll(e)
          })
          if (!isEvent) return
          el.addEventListener('mousewheel', vnode.context.scroll)
        }
      }
    },
    // 监听内容DOM高度变化
    observe: {
      inserted(el, binding, { context }) {
        if (!binding.value) return
        const observer = new MutationObserver(() => {
          context.judge()
        })
        observer.observe(el, {
          childList: true,
          attributes: true,
          subtree: true
        })
      }
    }
  },
  watch: {
    isShow: {
      handler(val) {
        if (parseInt(this.scrollShowMode) === 2) return
        if (this.isDown) return
        if (val) {
          let num = 0
          clearInterval(this.hideTimer)
          this.showTimer = setInterval(() => {
            num += 2
            if (num >= 100) clearInterval(this.showTimer)
            this.barEl.style.opacity = num / 100
          }, 0)
        } else {
          let num = 100
          clearInterval(this.showTimer)
          this.hideTimer = setInterval(() => {
            num -= 2
            if (num <= 0) clearInterval(this.hideTimer)
            this.barEl.style.opacity = num / 100
          }, 0)
        }
      }
    },
    data: {
      deep: true,
      handler() {
        // 判断是否需要滚动条 以及动态修改滚动条高度
        this.judge()
      }
    }
  }
}
</script>
<style scoped>
* {
  margin: 0;
  padding: 0;
}
.simple__container {
  display: flex;
}
.simple__table {
  position: relative;
  flex: 1;
  height: 100%;
  overflow: hidden;
}
.simple__content {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
}
.simple__scroll {
  position: relative;
  height: 100%;
}
.simple__scrollBar {
  position: absolute;
  width: 100%;
}
.bar {
  height: 100%;
  background-color: #ccc;
  border-radius: 10px;
  cursor: pointer;
}
.bar:hover {
  background-color: #bbb;
}
.simple__li {
  list-style: none;
}
</style>
