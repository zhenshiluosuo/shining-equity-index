<template>
    <div id="futures-info">
        <MyChart :data="chart_data" :load_finish="chart_data_flag"></MyChart>
        <GaugeCollection style="width: 15%; height: 80%; position: absolute; right: 10%; top: 1%; z-index: 100;"></GaugeCollection>
    </div>
</template>

<script>
    import GaugeCollection from "./GaugeCollection";
    import MyChart from "@/components/MyChart";
    export default {
      name: "FuturesInfo",
      data() {
        return {
          chart_datax: [],
          chart_data: [],
          chart_data_flag: false,
          futures_num: 'AU0'
        }
      },
      created() {
        // 数据意义：开盘(open)，收盘(close)，最低(lowest)，最高(highest)
        this.$http.get('/sina3/futures/api/json.php/IndexService.getInnerFuturesDailyKLine?symbol=' + this.futures_num).then(v => {
          console.log(v.data);
          for(let item of v.data) {
            this.chart_datax.push([item[0], parseFloat(item[1]), parseFloat(item[2]), parseFloat(item[3]), parseFloat(item[4]), parseFloat(item[5])]);
          }
          console.log('mytest:', this.chart_data);
          this.processData();
        });
      },
      components: {
        GaugeCollection,
        MyChart
      },
      methods: {
        processData() {
          //数据模型 time0 open1 close2 min3 max4 vol5 tag6 macd7 dif8 dea9
          //['2015-10-19',18.56,18.25,18.19,18.56,55.00,0,-0.00,0.08,0.09]
          // ["20020409", 10.51, 10.66, 10.88, 10.51, 414108831, 46.03]
          let macd = 0, ema12 = 0, ema26 = 0, dif = 0, dea = 0, time = '', close = 0.0;
          for(let item of this.chart_datax) {
            time = item[0].substring(0, 4) + '-' + item[0].substring(4, 6) + '-' + item[0].substring(6, 8);
            close = parseFloat(item[2]);
            ema12 = (11 / 13 * ema12 + 2 / 13 * close).toFixed(2);
            ema26 = (25 / 27 * ema26 + 2 / 27 * close).toFixed(2);
            dif = (ema12 - ema26).toFixed(2);
            dea = (8 / 10 * dea + 2 / 10 * dif).toFixed(2);
            macd = ((dif - dea) * 2).toFixed(2);
            this.chart_data.push([time, parseFloat(item[1]), close, parseFloat(item[4]), parseFloat(item[3]), parseFloat(item[5]), 0, parseFloat(macd), parseFloat(dif), parseFloat(dea)]);
          }
          this.chart_data[0][6] = 1;
          this.chart_data[this.chart_data.length - 1][6] = 1;
          this.chart_data_flag = true;
          console.log(this.chart_data, this.chart_data_flag);
        }
      }
    }
</script>

<style scoped>
    #futures-info {
        width: 100%;
        height: 100%;
    }
    .futures-chart {
        width: 100%;
        height: 100%;
    }
</style>
