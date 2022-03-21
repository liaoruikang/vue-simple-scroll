<template>
  <div id="app">
    <simple-scroll
      doubleClick
      scrollWidth="3px"
      scrollSpeed="10"
      dbSpeed="10"
      :data="list"
      openMonitor
    >
      <ul @click="list++">
        <li v-for="item in list" :key="item">{{ item }}</li>
      </ul>
    </simple-scroll>
  </div>
</template>
<script>
import { simpleScroll } from '../packages'
export default {
  name: 'App',
  data: () => {
    return {
      list: 15
    }
  },
  components: {
    simpleScroll
  }
}
</script>
<style>
#app {
  width: 600px;
  margin: 100px auto;
}
</style>
