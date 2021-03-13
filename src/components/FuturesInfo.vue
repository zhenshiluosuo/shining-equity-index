<template>
    <div id="futures-info">
        <div style="width: 82%; height: 100%; position: relative; float: left;">
            <MyChart :data="chart_data" :load_finish="chart_data_flag"></MyChart>
        </div>
        <div style="width: 18%; height: 100%; position: relative; float: left;">
            <div style="width: 100%; height: 15%; border: 1px solid #000000; box-sizing: border-box; border-bottom: 0px;">
                <div style="width: 100%; height: 40%; display: flex;">
                    <div style="width: 50%; height: 100%; flex: 1; font-size: 1.5em; display: flex; justify-content: center; align-items: center;">
                        {{futuresNum}}
                    </div>
                    <div style="width: 50%; height: 100%; flex: 1; font-size: 1.5em; display: flex; justify-content: center; align-items: center; color: #FF8C00;">
                        {{futureInfo[0]}}
                    </div>
                </div>
                <div style="width: 50%; height: 60%; display: inline-block; padding: 5%; box-sizing: border-box;">
                    <span style="display: inline-block; width: 100%;height: 50%;">当前价格</span>
                    <span style="display: inline-block; width: 100%;height: 50%;" :class="{'red': futureInfo[2] > 0, 'blue': futureInfo[2] < 0}">{{futureInfo[1]}}</span>
                </div>
                <div style="width: 50%; height: 60%; display: inline-block; padding: 5%; box-sizing: border-box;">
                    <span style="display: inline-block; width: 100%;height: 50%;" :class="{'red': futureInfo[2] > 0, 'blue': futureInfo[2] < 0}">{{futureInfo[2]}}</span>
                    <span style="display: inline-block; width: 100%;height: 50%;" :class="{'red': futureInfo[2] > 0, 'blue': futureInfo[2] < 0}">{{futureInfo[3]}}</span>
                </div>
            </div>
            <SelectBox style="width: 100%; height: 85%;" :selectData="futures_data" @cellClick="changeFuturesNum"></SelectBox>
        </div>
        <GaugeCollection style="width: 16%; height: 80%; position: absolute; left: 0; top: 10%; z-index: 100;"></GaugeCollection>
    </div>
</template>

<script>
    import GaugeCollection from "./GaugeCollection";
    import MyChart from "@/components/MyChart";
    import SelectBox from "@/components/SelectBox";
    export default {
      name: "FuturesInfo",
      data() {
        return {
          chart_state: 0,
          chart_datax: [],
          chart_data: [],
          chart_data_flag: false,
          futuresNum: 'RB0',
          futureInfo: [],
          futures_data: [
            ['RB0'],
            ['AG0'],
            ['AU0'],
            ['CU0'],
            ['AL0'],
            ['ZN0'],
            ['PB0'],
            ['RU0'],
            ['FU0'],
            ['WR0'],
            ['A0'],
            ['M0'],
            ['Y0'],
            ['J0'],
            ['C0'],
            ['L0'],
            ['P0'],
            ['V0'],
            ['RS0'],
            ['RM0'],
            ['FG0'],
            ['CF0'],
            ['TA0']
          ]
        }
      },
      created() {
        this.getFutureInfo();
        this.getChart();
        let num = 0;
        this.futures_data.forEach(v => {
          let _num = num;
          num++;
          this.$http.get('/sina1/list=' + v).then(_v => {
            //var hq_str_RB0="螺纹钢连续,225955,4314.00,4325.00,4272.00,4316.00,4289.00,4290.00,4289.00,4293.00,4248.00,14,50,1159691,872289,沪,螺纹钢,2020-12-18,0,4317.000,3964.000,4317.000,3815.000,4317.000,3736.000,4317.000,3501.000,75.998";
            let temp = _v.data.split(',').slice(1);
            let t0 = parseFloat(temp[7]), t1 = parseFloat((parseFloat(temp[7]) - parseFloat(temp[9])).toFixed(3))
            this.futures_data[_num].push(t0, t1, (t1 / t0 * 100).toFixed(2) + '%');
          });
        })
      },
      components: {
        GaugeCollection,
        MyChart,
        SelectBox
      },
      methods: {
        getChart() {
          // 数据意义：开盘(open)，收盘(close)，最低(lowest)，最高(highest)
          this.$http.get('/sina3/futures/api/json.php/IndexService.getInnerFuturesDailyKLine?symbol=' + this.futuresNum).then(v => {
            this.chart_datax = [];
            for(let item of v.data) {
              this.chart_datax.push([item[0], parseFloat(item[1]), parseFloat(item[2]), parseFloat(item[3]), parseFloat(item[4]), parseFloat(item[5])]);
            }
            this.chart_data = [];
            this.processData();
          });
        },
        processData() {
          //数据模型 time0 open1 close2 min3 max4 vol5 tag6 macd7 dif8 dea9
          //['2015-10-19',18.56,18.25,18.19,18.56,55.00,0,-0.00,0.08,0.09]
          // ["20020409", 10.51, 10.66, 10.88, 10.51, 414108831, 46.03]
          let macd = 0, ema12 = 0, ema26 = 0, dif = 0, dea = 0, time = '', close = 0.0;
          for(let item of this.chart_datax) {
            time = item[0];
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
        },
        changeFuturesNum(value) {
          this.futuresNum = value;
        },
        getFutureInfo() {
          this.$http.get('/sina1/list=' + this.futuresNum).then(v => {
            //var hq_str_RB0="螺纹钢连续,225955,4314.00,4325.00,4272.00,4316.00,4289.00,4290.00,4289.00,4293.00,4248.00,14,50,1159691,872289,沪,螺纹钢,2020-12-18,0,4317.000,3964.000,4317.000,3815.000,4317.000,3736.000,4317.000,3501.000,75.998";
            let temp = v.data.split(',').slice(1);
            let t0 = parseFloat(temp[7]), t1 = parseFloat((parseFloat(temp[7]) - parseFloat(temp[9])).toFixed(3))
            this.futureInfo = [temp[15], t0, t1, (t1 / t0 * 100).toFixed(2) + '%'];
          });
        }
      },
      watch: {
        futuresNum() {
          this.chart_data_flag = false;
          this.getFutureInfo();
          this.chart_datax = [];
          this.chart_data = [];
          this.getChart();
        }
      }
    }
</script>

<style scoped>
    #futures-info {
        width: 100%;
        height: 100%;
        clear: both;
    }
    .futures-chart {
        width: 100%;
        height: 100%;
    }
    .red {
      color: #f44336;
    }
    .blue {
      color: #26a69a;
    }
</style>
