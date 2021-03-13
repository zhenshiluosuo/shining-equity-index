<template>
    <div class="gauge-collection" v-if="window_flag">
        <GaugeChart class="gauge-cell" :type="type1"></GaugeChart>
        <GaugeChart class="gauge-cell" :type="type2"></GaugeChart>
        <GaugeChart class="gauge-cell" :type="type3"></GaugeChart>
        <div class="close-window1" v-if="close_flag" @click="closeWindow">×</div>
    </div>
</template>

<script>
    import GaugeChart from "./GaugeChart";
    export default {
        name: "GaugeCollection",
        data() {
            return {
                type1: '震荡指标',
                type2: '移动平均线',
                type3: '总结',
                close_flag: true,
                window_flag: true
            }
        },
        components: {
            GaugeChart
        },
        methods: {
            closeWindow()
            {
                this.window_flag = false;
            },
            openWindow()
            {
                this.window_flag = true;
            }
        }
    }
</script>

<style scoped>
    .gauge-collection {
      height: 100%;
      width: 100%;
      border: 1px solid #2c3e50;
      box-sizing: border-box;
    }
    .gauge-cell {
      height: 33.33%;
      width: 99%;
    }
    .close-window1 {
      position: absolute;
      top: 2px;
      right: 2px;
      width: 1.1em;
      height: 1.1em;
      z-index: 1000;
      box-sizing: border-box;
      border: 1px solid #000000;
      cursor: pointer;
      -moz-user-select:none;		/* 火狐 */
      -webkit-user-select:none;	/* 谷歌 */
      -ms-user-select:none;		/* IE */
      user-select:none;
    }
</style>
