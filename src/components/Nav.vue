<template>
    <div class="nav">
        <ul class="nav-ul">
            <li class="nav-li"><router-link to="/" class="router-link">
              <span>
                <svg class="icon" aria-hidden="true">
                  <use xlink:href="#icon-shouye"></use>
                </svg>&#32;全景概况&#12288;>
              </span></router-link></li>
            <li class="nav-li"><router-link to="NationalInfo" class="router-link">
              <span><svg class="icon" aria-hidden="true">
                  <use xlink:href="#icon-iconfont-hengzhi"></use>
                </svg>&#32;国内行情&#12288;></span>
            </router-link></li>
            <li class="nav-li"><router-link to="InternationalInfo" class="router-link">
              <span><svg class="icon" aria-hidden="true">
                  <use xlink:href="#icon-iconfont-fushiA-"></use>
                </svg>&#32;国际行情&#12288;></span>
            </router-link></li>
            <li class="nav-li"><router-link to="FuturesInfo" class="router-link">
              <span><svg class="icon" aria-hidden="true">
                  <use xlink:href="#icon-tab_baogao"></use>
                </svg>&#32;期货市场&#12288;></span>
            </router-link></li>
            <li class="nav-li"><router-link to="IndividualStock" class="router-link">
              <span><svg class="icon" aria-hidden="true">
                  <use xlink:href="#icon-tab_celve"></use>
                </svg>&#32;个股诊断&#12288;></span>
            </router-link></li>
            <li class="nav-li"><router-link to="SelfSelect" class="router-link">
              <span><svg class="icon" aria-hidden="true">
                  <use xlink:href="#icon-dingdan"></use>
                </svg>&#32;我的自选&#12288;></span>
            </router-link></li>
            <li class="nav-li"><router-link to="Multi" class="router-link">
              <span><svg class="icon" aria-hidden="true">
                  <use xlink:href="#icon-act_liebiaohengxiang"></use>
                </svg>&#32;多股同屏&#12288;></span>
            </router-link></li>
            <li class="nav-li"><router-link to="StockFilter" class="router-link">
              <span><svg class="icon" aria-hidden="true">
                  <use xlink:href="#icon-tab_yunwei"></use>
                </svg>&#32;选股功能&#12288;></span>
            </router-link></li>
            <li class="nav-li"><router-link to="" class="router-link">
              <span><svg class="icon" aria-hidden="true">
                  <use xlink:href="#icon-column-horizontal"></use>
                </svg>&#32;直播讨论&#12288;></span>
            </router-link></li>
            <li style="width: 100%;height: 1px;background: red;"></li>
            <li class="nav-li" style="font-size: 16px"><span>使用须知&#12288;></span></li>
            <li class="nav-li" style="font-size: 16px"><span>联系我们&#12288;></span></li>
        </ul>
    </div>
</template>

<script>
    export default {
      name: "Nav",
      components: {
      }
    }
</script>

<style scoped>
    .nav {
      flex: 1;
      height: 100%;
      background: #4a4a4a;
      border-right: 1px solid black;
      box-sizing: border-box;
      color: #fffaf0;
    }
    .nav-ul {
      margin: 0;
      padding: 0;
      position: relative;
      width: 100%;
    }
    .nav-li {
      width: 100%;
      font-size: 20px;
    }
    .nav-li:hover {
      background: #00a4ff;
      color: white;
    }
    .nav-li span {
      display: block;
      padding: 10px;
    }
    .router-link {
      text-decoration: none;
      color: #fffaf0;
    }
    .router-link > span {
      display: flex;
      align-items:center;
      justify-content: center;
    }
</style>
