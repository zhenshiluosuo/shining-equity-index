<template>
  <div id="app">
    <Header></Header>
    <div class="main">
      <Nav></Nav>
      <router-view class="main-view"></router-view>
    </div>
    <Footer></Footer>
  </div>
</template>

<script>
import Nav from './components/Nav.vue'
import Header from "./components/Header";
import Footer from "./components/Footer";
export default {
  name: 'App',
  components: {
    Nav,
    Header,
    Footer
  }
}
</script>

<style>
  html {
    margin: 0;
    padding: 0;
    height: 100%;
    overflow: hidden;
  }
  body {
    margin: 0;
    padding: 0;
    height: 100%;
    overflow: hidden;
  }
  #app {
    height: 100%;
    width: 100%;
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }
  .main {
    height: 85%;
    display: flex;
  }
  .main-view {
    flex: 8;
    height: 100%;
  }
  ul {
    list-style: none;
  }
</style>
