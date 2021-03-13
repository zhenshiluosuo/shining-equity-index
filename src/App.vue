<template>
  <div id="app">
    <Header></Header>
    <div class="main">
      <Nav></Nav>
      <router-view class="main-view"></router-view>
    </div>
    <Footer>
    </Footer>
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
  },
  mounted() {
    if(!window.localStorage.stocks) {
      window.localStorage.stocks = '{"id":0, "name":"招商银行", "num":"600036"}|{"id":1, "name":"贵州茅台", "num":"600519"}|{"id":2, "name":"中国平安", "num":"601318"}|{"id":3, "name":"万科A", "num":"000002"}|{"id":4, "name":"美的集团", "num":"000333"}|{"id":5, "name":"京东方A", "num":"000725"}|{"id":6, "name":"五粮液", "num":"000858"}|{"id":7, "name":"东方财富", "num":"300059"}|{"id":8, "name":"宁德时代", "num":"300750"}|{"id":9, "name":"寒武纪-U", "num":"688256"}|{"id":10, "name":"中芯国际-U", "num":"688981"}';
    }
  },
  methods: {

  }
}

</script>

<style>
  html {
    margin: 0;
    padding: 0;
    height: 100%;
  }
  body {
    margin: 0;
    padding: 0;
    height: 100%;
    font-family: Trebuchet MS,roboto,ubuntu,sans-serif;
    overflow-x: hidden;
    overflow-y: hidden;
  }
  #app {
    height: 100%;
    width: 100%;
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
    position: relative;
  }
  ul {
    list-style: none;
  }
  .icon {
    width: 1em; height: 1em;
    vertical-align: -0.15em;
    fill: currentColor;
    overflow: hidden;
  }
</style>
