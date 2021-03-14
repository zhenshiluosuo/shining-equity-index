<template>
    <div ref="futureschart">
        <Loading v-if="!load_flag"></Loading>
        <div class="k-box pos-box" id='Poskdata'></div>
        <div class="ma-box pos-box" id='Posmadata'>MA</div>
        <div class="vol-box pos-box" id='Posvoldata'>成交量</div>
        <div class="macd-box pos-box" id='Posmacddata'>MACD</div>
        <div class="option-box pos-box" id='Setoption'>指标</div>
    </div>
</template>

<script>
    import Loading from "./Loading";
    import getOptions from "../utils/futuresChartOptions"
    export default {
        name: "FuturesChart",
        data() {
            return {
                load_flag: false,
                futures_num: 'AU0',
                data: []
            }
        },
        components: {
            Loading
        },
        mounted() {
            this.$http.get('/sina3' + '/futures/api/json.php/IndexService.getInnerFuturesDailyKLine?symbol=' + this.futures_num).then(v => {
                for(let item of v.data) {
                    this.data.push([item[0], parseFloat(item[1]), parseFloat(item[2]), parseFloat(item[3]), parseFloat(item[4]), parseFloat(item[5])]);
                }
                this.draw();
            });
        },
        methods: {
            draw() {
                // 数据意义：开盘(open)，收盘(close)，最低(lowest)，最高(highest)
                var data = splitData(this.data);

                var KNAME, macd;
                var Zstart = 80;
                var Zend = 100;
                var MAArr=[0,0,0,0,0,0]
                var colorArr =["#0CF49B","#FD1050"]
                KNAME = 'K线图';
                var PosK = document.getElementById('Poskdata')
                var PosMA = document.getElementById('Posmadata')
                var PosVolSelect = document.getElementById('Posvoldata');
                var PosMacdSelect = document.getElementById('Posmacddata');
                //var optionSelect = document.getElementById('Setoption');

                function PosSelect(params) {
                    let _this = this;
                    _this.datas = {};
                    _this.ma = {};
                    _this.macd = {};
                    // console.log(params)
                    for (let i = 0; i < params.length; i++) {

                        var el = params[i]
                        switch (el.seriesIndex) {
                            case 0:
                                _this.datas = {
                                    color: el.color,
                                    date: {
                                        name: "时间",
                                        value: el.name
                                    },
                                    open: {
                                        name: "开",
                                        value: el.value[1]
                                    },
                                    close: {
                                        name: "收",
                                        value: el.value[2]
                                    },
                                    low: {
                                        name: "低",
                                        value: el.value[3]
                                    },
                                    heigh: {
                                        name: "高",
                                        value: el.value[4]
                                    },
                                    zhangd: {
                                        name: "涨幅",
                                        value: ((el.value[2] - el.value[1]) / el.value[1] * 100).toFixed(2),
                                        color: el.color,
                                    },
                                    zhenf: {
                                        name: "振幅",
                                        value: (Math.abs(el.value[4] - el.value[3]) / el.value[3] * 100).toFixed(2)
                                    }
                                };

                                break;

                            case 1:
                                _this.ma.ma5 = {
                                    name: "MA5",
                                    value: el.value.toFixed(4),
                                    color: el.color
                                };
                                break;
                            case 2:
                                _this.ma.ma10 = {
                                    name: "MA10",
                                    value: el.value.toFixed(4),
                                    color: el.color
                                };
                                break;
                            case 3:
                                _this.ma.ma20 = {
                                    name: "MA20",
                                    value: el.value.toFixed(4),
                                    color: el.color
                                };
                                break;
                            case 4:
                                _this.ma.ma30 = {
                                    name: "MA30",
                                    value: el.value.toFixed(4),
                                    color: el.color
                                };
                                break;
                            case 5:
                                break;
                            case 6:
                                break;
                            case 7:
                                _this.vol = {
                                    name: el.seriesName,
                                    value: el.value,
                                    color: el.color
                                }
                                break;
                            case 8:
                                _this.macd.macd = {
                                    name: el.seriesName,
                                    value: el.value,
                                    color: el.color
                                }
                                break;
                            case 9:
                                _this.macd.dif = {
                                    name: el.seriesName,
                                    value: el.value,
                                    color: el.color
                                }
                                break;
                            case 10:
                                _this.macd.dea = {
                                    name: el.seriesName,
                                    value: el.value,
                                    color: el.color
                                }
                                break;
                            default:
                                break;
                        }
                    }

                    var objk = Object.keys(_this.datas);
                    var ak = [];
                    for (let j = 1; j < objk.length; j++) {
                        ak.push(`${_this.datas[objk[j]].name}:<span style="color:${_this.datas[objk[j]].color}">${_this.datas[objk[j]].value}</span>&nbsp;`);
                    }
                    PosK.innerHTML = "<p>" + ak.join('') + "</p>";

                    var objma = Object.keys(_this.ma);
                    var at = [];
                    for (let j = 0; j < objma.length; j++) {
                        at.push(`<span style="color:${_this.ma[objma[j]].color}">${_this.ma[objma[j]].name}:${_this.ma[objma[j]].value}</span>&nbsp;`);
                    }
                    PosMA.innerHTML = at.join('');

                    PosVolSelect.innerHTML = `${_this.vol.name}:<span style="color:${_this.vol.color}">${_this.vol.value}</span>&nbsp;`;

                    var objmacd = Object.keys(_this.macd);
                    var acd = [];
                    for (let j = 0; j < objmacd.length; j++) {
                        acd.push(`${_this.macd[objmacd[j]].name}:<span style="color:${_this.macd[objmacd[j]].color}">${_this.macd[objmacd[j]].value}</span>&nbsp;`)
                    }
                    PosMacdSelect.innerHTML = acd.join('');

                    // optionSelect.innerHTML = `<span>指标</span>`;
                }


                function splitData(rawData) {
                    var datas = [];
                    var times = [];
                    var vols = [];
                    for (var i = 0; i < rawData.length; i++) {
                        datas.push(rawData[i]);
                        times.push(rawData[i].splice(0, 1)[0]);
                        vols.push(rawData[i][4]);
                    }
                    return {
                        datas: datas,
                        times: times,
                        vols: vols,
                    };
                }

                function AutoSetMALabel() {
                    var mapush = [];
                    if (MAArr[0] !== 0) {
                        mapush.push('MA' + MAArr[0][1]);
                    }
                    if (MAArr[1] !== 0) {
                        mapush.push('MA' + MAArr[1][1]);
                    }
                    if (MAArr[2] !== 0) {
                        mapush.push('MA' + MAArr[2][1]);
                    }
                    if (MAArr[3] !== 0) {
                        mapush.push('MA' + MAArr[3][1]);
                    }
                    if (MAArr[4] !== 0) {
                        mapush.push('MA' + MAArr[4][1]);
                    }
                    if (MAArr[5] !== 0) {
                        mapush.push('MA' + MAArr[5][1]);
                    }
                    //console.log(MA2[1])
                    return mapush
                }

                function MA(dayCount, datas, field) {
                    var ma, i, l, j, sum;
                    ma = [];
                    //判断不放在循环内，提升性能
                    if (field) {
                        //有字段配置
                        for (i = 0, l = datas.length; i < l; i++) {
                            if (i < dayCount - 1) {
                                ma.push(NaN);
                                continue;
                            }
                            sum = 0;
                            for (j = 0; j < dayCount; j++) {
                                sum += datas[i - j][field];
                            }
                            ma.push(sum / dayCount);
                        }
                    } else {
                        //无字段配置
                        for (i = 0, l = datas.length; i < l; i++) {
                            if (i < dayCount - 1) {
                                ma.push(NaN);
                                continue;
                            }
                            sum = 0;
                            for (j = 0; j < dayCount; j++) {
                                sum += datas[i - j];
                            }
                            ma.push(sum / dayCount);
                        }
                    }
                    return [ma, dayCount];
                }

                function EMA(n, datas, field) {
                    var i, l, ema, a;
                    a = 2 / (n + 1);
                    if (field) {
                        //二维数组
                        ema = [datas[0][field]];
                        for (i = 1, l = datas.length; i < l; i++) {
                            ema.push((a * datas[i][field] + (1 - a) * ema[i - 1]).toFixed(4));
                        }
                    } else {
                        //普通一维数组
                        ema = [datas[0]];
                        for (i = 1, l = datas.length; i < l; i++) {
                            ema.push((a * datas[i] + (1 - a) * ema[i - 1]).toFixed(4));
                        }
                    }
                    return ema;
                }

                function MACD(short, long, mid, datas, field) {
                    var i, l, dif, dea, macd, result;
                    result = {};
                    dif = [];
                    macd = [];
                    var emaShort = EMA(short, datas, field);
                    var emaLong = EMA(long, datas, field);
                    for (i = 0, l = datas.length; i < l; i++) {
                        dif.push((emaShort[i] - emaLong[i]).toFixed(4));
                    }
                    dea = EMA(mid, dif);
                    for (i = 0, l = datas.length; i < l; i++) {
                        macd.push(((dif[i] - dea[i]) * 2).toFixed(4));
                    }
                    result.dif = dif;
                    result.dea = dea;
                    result.macd = macd;
                    return result;
                }

                macd = MACD(12, 26, 9, data.datas, 1);
                MAArr[0] = MA(20, data.datas, 1);
                MAArr[1] = MA(60, data.datas, 1);
                var highlab=[40,0], lowlab=[-40,0];
                let option = getOptions(macd,data,KNAME,Zstart,Zend,highlab,lowlab,colorArr,MAArr)
                let myChart = this.$echarts.init(this.$refs.futureschart);
                // 使用刚指定的配置项和数据显示图表。
                myChart.setOption(option);
                this.load_flag = true;
            }
        }
    }
</script>

<style scoped>
    .k-box {
        top: 35px;
    }

    .ma-box {
        top: 65px;
    }

    .vol-box {
        top: 64%;
    }

    .macd-box {
        top: 79%;
    }

    .option-box{
        top: 90%;
        border-radius: 50%;
        border: 2px solid #FC0107;
        box-shadow: h-shadow v-shadow blur color inset;
        min-height: 2%;
        max-width: 2%;
    }

    .pos-box{
        position: absolute;
        left: 10px;
        z-index: 1;
        padding: 5px;
        font-size: 13px;
        color: #ccc;
    }

    .p {
        padding: 0;
        margin: 0;
    }
</style>
