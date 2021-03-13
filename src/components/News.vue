<template>
  <div>
    <div style="width: 6em; height: 100%; position: relative; float: left;">
      <div v-for="type in news_type" :key="type.news_type_id" style="display: flex; align-items: center; width: 100%; height: 33.33%; text-align: left;">
        <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-fabu"></use>
        </svg>{{type.news_type_name}}
      </div>
    </div>
    <div style="width: calc(100% - 6em); height: 100%; position: relative; float: left;">
      <div v-for="infos in news" :key="infos" style="width: 100%; height: 33.33%; overflow: hidden;">
        <div v-for="info in infos" :key="info" class="news-page">
          {{info}}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "News",
  data() {
    return {
      news_type: [
        {news_type_id:1, news_type_name:"国内新闻"},
        {news_type_id:2, news_type_name:"国际新闻"},
        {news_type_id:3, news_type_name:"经济讯息"},
      ],
      news: [
        [
          "中央经济工作会议在北京召开",
          "中国财政部原部长楼继伟：信用债应全部退出银行间市场",
          "投资者买理财产品后19天暴亏200多万 法院：银行赔"
        ],
        [
          "特朗普又发推 谴责“美国史上最大选举舞弊”",
          "美国将台湾列入汇率操纵“观察名单“，台当局却要“进行检讨“",
          "美元持续弱势 机构：A股、港股配置价值凸显",
        ],
        [
          "中日韩三国共同“出手”抛1210亿美债，美债为什么不受待见了？",
          "专家:东北经济塌陷让北方GDP比重下降,不能只靠国家给钱",
          "涨涨涨！铁矿石9年新高，机构高呼：将迎来9年商品牛市"
        ]
      ]
    }
  },
  props:[
    // 'news_type',
    'news_info'
  ],
  // beforeUpdate() {
  //   if(this.news_type.length && this.news_info.length) {
  //     let temp = [[],[],[]];
  //     this.news_info.forEach(v => {
  //       temp[v.news_type - 1].push(v.news_info);
  //     });
  //     this.news = temp;
  //   }
  // },
  methods: {
    processData() {

    }
  }
}
</script>

<style scoped>
  @-webkit-keyframes rowup {
    0% {
      -webkit-transform: translate3d(0, 0, 0);
      transform: translate3d(0, 0, 0);
    }
    22% {
      -webkit-transform: translate3d(0, 0, 0);
      transform: translate3d(0, 0, 0);
    }
    33% {
      -webkit-transform: translate3d(0, -1.8em, 0);
      transform: translate3d(0, -1.8em, 0);
    }
    55% {
      -webkit-transform: translate3d(0, -1.8em, 0);
      transform: translate3d(0, -1.8em, 0);
    }
    66% {
      -webkit-transform: translate3d(0, -3.6em, 0);
      transform: translate3d(0, -3.6em, 0);
    }
    88% {
      -webkit-transform: translate3d(0, -3.6em, 0);
      transform: translate3d(0, -3.6em, 0);
    }
    100% {
      -webkit-transform: translate3d(0, -5.4em, 0);
      transform: translate3d(0, -5.4em, 0);
    }
  }
  @keyframes rowup {
    0% {
      -webkit-transform: translate3d(0, 0, 0);
      transform: translate3d(0, 0, 0);
    }
    22% {
      -webkit-transform: translate3d(0, 0, 0);
      transform: translate3d(0, 0, 0);
    }
    33% {
      -webkit-transform: translate3d(0, -1.8em, 0);
      transform: translate3d(0, -1.8em, 0);
    }
    55% {
      -webkit-transform: translate3d(0, -1.8em, 0);
      transform: translate3d(0, -1.8em, 0);
    }
    66% {
      -webkit-transform: translate3d(0, -3.6em, 0);
      transform: translate3d(0, -3.6em, 0);
    }
    88% {
      -webkit-transform: translate3d(0, -3.6em, 0);
      transform: translate3d(0, -3.6em, 0);
    }
    100% {
      -webkit-transform: translate3d(0, -5.4em, 0);
      transform: translate3d(0, -5.4em, 0);
    }
  }
  .news-page{
    display: flex;
    align-items: center;
    width: 100%;
    height: 100%;
    text-align: left;
    flex-shrink: 0;
    -webkit-animation: 30s rowup linear infinite normal;
    animation: 30s rowup linear infinite normal;
    position: relative;
    z-index: 10;
  }
</style>
