<template>
  <div id="app">
    <simple-scroll
      doubleClick
      scrollWidth="3px"
      scrollSpeed="10"
      dbSpeed="10"
    ></simple-scroll>
  </div>
</template>
<script>
import { simpleScroll } from '../packages'
export default {
  name: 'App',
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
