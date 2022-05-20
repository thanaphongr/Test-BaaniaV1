<template>
  <div id="app">
    <HomePage/>
  </div>
</template>

<script>
/* eslint-disable */
import HomePage from './components/Test_Getlist.vue'
import Styleglobal from './css/css-custom.css'

export default {
  name: 'App',
  components: {
    HomePage,
    Styleglobal
  },
  methods: {
    
  },
  mounted () {
  },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
