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
                console.log(this.data);
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
                var MA1 = 0,
                    MA2 = 0,
                    MA3 = 0,
                    MA4 = 0,
                    MA5 = 0,
                    MA6 = 0;
                var color1 = "#0CF49B";
                var color2 = "#FD1050";
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
                    if (MA1 !== 0) {
                        mapush.push('MA' + MA1[1]);
                    }
                    if (MA2 !== 0) {
                        mapush.push('MA' + MA2[1]);
                    }
                    if (MA3 !== 0) {
                        mapush.push('MA' + MA3[1]);
                    }
                    if (MA4 !== 0) {
                        mapush.push('MA' + MA4[1]);
                    }
                    if (MA5 !== 0) {
                        mapush.push('MA' + MA5[1]);
                    }
                    if (MA6 !== 0) {
                        mapush.push('MA' + MA6[1]);
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
                MA1 = MA(20, data.datas, 1);
                MA2 = MA(60, data.datas, 1);
                var highlab=[40,0], lowlab=[-40,0];
                let option = {
                    "backgroundColor": "#19232d",
                    "tooltip": {
                        "show": true,
                        "trigger": "axis",
                        "triggerOn": "mousemove|click",
                        "axisPointer": {
                            "type": "cross"
                        },
                        "formatter": function(params) {
                            if (params.length > 0) {
                                PosSelect(params)
                            }
                        },
                    },
                    "xAxis": [{
                        "show": true,
                        "scale": true,
                        "nameGap": 15,
                        "gridIndex": 0,
                        "splitNumber": 5,
                        "axisLine": {
                            "lineStyle": {
                                "color": '#4a657a'
                            }
                        },
                        "axisLabel": {
                            "show": false
                        },
                        "axisTick": {
                            "show": false
                        },
                        "data": data.times,
                        "axisPointer": {
                            "label": {
                                "show": false,
                            }
                        }, //主图禁用下标显示
                    },
                        {
                            "show": true,
                            "scale": true,
                            "nameGap": 15,
                            "gridIndex": 1,
                            "splitNumber": 5,
                            "axisLabel": {
                                "show": false
                            },
                            "axisTick": {
                                "show": false
                            },
                            "data": data.times,
                            "axisPointer": {
                                "label": {
                                    "show": false,
                                }
                            }, //附图1禁用下标显示
                        },
                        {
                            "show": true,
                            "scale": true,
                            "gridIndex": 2,
                            "splitNumber": 5,
                            "axisLine": {
                                "lineStyle": {
                                    "color": '#4a657a'
                                }
                            },
                            "axisLabel": {
                                "textStyle": {
                                    "color": '#4a657a'
                                }
                            },
                            "data": data.times,
                        },
                        {
                            "gridIndex": 3,
                            "show": false,
                            "type": "value",

                        }
                    ],
                    "yAxis": [{
                        "position": "right",
                        "scale": true,
                        "gridIndex": 0,
                        "axisLine": {
                            "lineStyle": {
                                "color": '#4a657a'
                            }
                        },
                        "axisLabel": {
                            "textStyle": {
                                "color": '#4a657a'
                            }
                        },
                        "splitLine": {
                            "show": true,
                            "lineStyle": {
                                "color": '4a657a',
                                "type": 'dashed'
                            }
                        },
                    },
                        {
                            "position": "right",
                            "gridIndex": 1,
                            "splitNumber": 2,
                            "minInterval": 0,
                            "axisLine": {
                                "lineStyle": {
                                    "color": '#4a657a'
                                }
                            },
                            "axisLabel": {
                                "textStyle": {
                                    "color": '#4a657a'
                                }
                            },
                            "splitLine": {
                                "show": true,
                                "lineStyle": {
                                    "color": '4a657a',
                                    "type": 'dashed'
                                }
                            },
                        },
                        {
                            "position": "right",
                            "gridIndex": 2,
                            "splitNumber": 3,
                            "axisLine": {
                                "lineStyle": {
                                    "color": '#4a657a'
                                }
                            },
                            "axisLabel": {
                                "textStyle": {
                                    "color": '#4a657a'
                                }
                            },
                            "splitLine": {
                                "show": true,
                                "lineStyle": {
                                    "color": '4a657a',
                                    "type": 'dashed'
                                }
                            },
                        },
                        {
                            "gridIndex": 3,
                            "show": true,
                            "type": "category",
                            "axisLabel": {
                                "showMinLabel": false,
                                "formatter": function(val) {
                                    return '￥' + val
                                },
                                "textStyle": {
                                    "color": '#4a657a'
                                }
                            },
                            "splitLine": {
                                "show": true,
                                "lineStyle": {
                                    "color": '#4a657a',
                                    "type": 'dashed'
                                }
                            },
                            "axisLine": {
                                "lineStyle": {
                                    "color": '#4a657a'
                                }
                            },
                        }
                    ],
                    "title": {
                        "text": KNAME,
                        "color": '#4a657a',

                    },
                    "dataZoom": [{
                        "show": false,
                        "type": "inside",
                        "start": Zstart,
                        "end": Zend,
                        "xAxisIndex": [
                            0,
                            0
                        ],
                    },
                        {
                            "show": false,
                            "type": "slider",
                            "start": Zstart,
                            "end": Zend,
                            "xAxisIndex": [
                                0,
                                1
                            ],
                        },
                        {
                            "show": false,
                            "type": "slider",
                            "start": Zstart,
                            "end": Zend,
                            "xAxisIndex": [
                                0,
                                2
                            ],
                        },
                        {
                            "show": false,
                        }
                    ],
                    "axisPointer": {
                        "show": true,
                        "type": "line",
                        "link": [{
                            "xAxisIndex": "all"
                        }]
                    },
                    "toolbox": {
                        "feature": {
                            "restore": {},
                            "dataZoom": {},
                            // "magicType": {
                            //     "type": ['line', 'bar', 'stack', 'tiled']
                            // }
                        },
                    },
                    "series": [{
                        "type": "candlestick",
                        // "name": "K线图",
                        "xAxisIndex": 0,
                        "yAxisIndex": 0,
                        "data": data.datas,
                        "markPoint": {
                            "symbol": 'circle',
                            "symbolSize": function(value, param) {
                                let size = 15
                                if (param.name === '最高价' || param.name === '最底价') {
                                    size = 0.1
                                }
                                return size
                            },
                            "label": {
                                "show": true,
                                "fontSize": 12,
                                "color": '#fff',
                                "formatter": function(param) {
                                    let val = ''
                                    if (param.name === '标点') {
                                        val = param.value
                                    } else if (param.name === '最低价') {
                                        val = param.value + ' →'
                                        // lowlab = [-40,0]
                                    } else if (param.name === '最高价') {
                                        val = '← ' + param.value
                                        // highlab = [-40,0]
                                    }
                                    return val
                                }
                            },
                            "data": [{
                                "name": "最高价",
                                "type": "max",
                                "valueDim": 'highest',
                                "symbolOffset":highlab,
                                "itemStyle": {
                                    "color": color2,
                                },
                            },
                                {
                                    "name": "最低价",
                                    "type": "min",
                                    "valueDim": 'lowest',
                                    "symbolOffset":lowlab,
                                    "itemStyle": {
                                        "color": "rgb(41,60,85)",
                                    }
                                }
                            ]
                        },
                        "markLine": {
                            "symbol": "",
                            "data": [{
                                "yAxis": data.datas[data.datas.length - 1][1],
                                "label": {
                                    "position": "end",
                                    "padding": 0
                                },
                                "lineStyle": {
                                    "type": "dotted",
                                    "color": "#ccc",
                                },
                            }, ]
                        },
                        "itemStyle": {
                            "color": color1,
                            "color0": color2,
                            "borderColor": color1,
                            "borderColor0": color2
                        }
                    },
                        {
                            "type": "line",
                            "name": AutoSetMALabel()[0],
                            "data": MA1[0],
                        },
                        {
                            "type": "line",
                            "name": AutoSetMALabel()[1],
                            "data": MA2[0],
                        },
                        {
                            "type": "line",
                            "name": AutoSetMALabel()[2],
                            "data": MA3[0],
                        },
                        {
                            "type": "line",
                            "name": AutoSetMALabel()[3],
                            "data": MA4[0],
                        },
                        {
                            "type": "line",
                            "name": AutoSetMALabel()[4],
                            "data": MA5[0],
                        },
                        {
                            "type": "line",
                            "name": AutoSetMALabel()[5],
                            "data": MA6[0],
                        },
                        {
                            "type": "bar",
                            "name": "成交量",
                            "xAxisIndex": 1,
                            "yAxisIndex": 1,
                            "data": data.vols,
                            "barCategoryGap": "20%",
                            "itemStyle": {
                                "normal": {
                                    "color": function(params) {
                                        var colorList;
                                        if (data.datas[params.dataIndex][1] > data.datas[params.dataIndex][0]) {
                                            colorList = color1;
                                        } else {
                                            colorList = color2;
                                        }
                                        return colorList;
                                    },
                                }
                            }
                        },
                        {
                            "type": "bar",
                            "name": "MACD",
                            "xAxisIndex": 2,
                            "yAxisIndex": 2,
                            "data": macd.macd,
                            "itemStyle": {
                                "normal": {
                                    "color": function(params) {
                                        var colorList;
                                        if (params.data >= 0) {
                                            colorList = color1;
                                        } else {
                                            colorList = color2;
                                        }
                                        return colorList;
                                    },
                                }
                            }
                        },
                        {
                            "type": "line",
                            "name": "DIF",
                            "xAxisIndex": 2,
                            "yAxisIndex": 2,
                            "data": macd.dif,
                            "itemStyle": {
                                "normal": {
                                    "color": "#002aff",

                                },
                            }
                        },
                        {
                            "type": "line",
                            "name": "DEA",
                            "xAxisIndex": 2,
                            "yAxisIndex": 2,
                            "data": macd.dea,
                            "itemStyle": {
                                "normal": {
                                    "color": "#ccc",

                                },
                            }
                        },
                        {
                            "type": "line",
                            "xAxisIndex": 3,
                            "yAxisIndex": 3,
                            "areaStyle": {
                                "color": 'red',
                                "opacity": .2,
                            },
                        },
                        {
                            "type": "line",
                            "xAxisIndex": 3,
                            "yAxisIndex": 3,
                            "areaStyle": {
                                "color": 'red',
                                "opacity": .2,
                            },
                        }
                    ],
                    "legend": [{
                        "data": [],
                        "show": true,
                        "padding": 5,
                        "itemGap": 10,
                        "itemWidth": 25,
                        "itemHeight": 14
                    },
                        {
                            "show": false,
                            "padding": 5,
                            "itemGap": 10,
                            "itemWidth": 25,
                            "itemHeight": 14
                        }
                    ],

                    "grid": [{
                        "show": true,
                        "top": "60px",
                        "left": "0.5%",
                        "right": "8%",
                        "bottom": "35%",
                        "borderColor":  '#4a657a',
                    },
                        {
                            "show": true,
                            "left": "0.5%",
                            "right": "8%",
                            "top": "67%",
                            "bottom": "20%",
                            "borderColor":  '#4a657a',
                        },
                        {
                            "show": true,
                            "left": "0.5%",
                            "top": "82%",
                            "right": "8%",
                            "bottom": "30px",
                            "borderColor":  '#4a657a',
                        },
                        {
                            "left": "92%",
                            "right": "0%",
                            // "height": "60%",
                            // "bottom":"35%",
                            "borderColor":  '#4a657a',
                        }
                    ]
                };
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
