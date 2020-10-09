<template>
    <div id="gs">
        <div id="g1" v-show="gtype == 0" class="gg"></div>
        <div id="g2" v-show="gtype == 1" class="gg"></div>
        <div id="g3" v-show="gtype == 2" class="gg"></div>
        <div id="g4" v-show="gtype == 3" class="gg"></div>
        <div id="g-select">
            <input id="gs1" type="radio" v-model="gtype" value="0"/><label for="gs1">上证指数</label>
            <input id="gs2" type="radio" v-model="gtype" value="1"/><label for="gs2">深证成指</label>
            <input id="gs3" type="radio" v-model="gtype" value="2"/><label for="gs3">创业板指</label>
            <input id="gs4" type="radio" v-model="gtype" value="3"/><label for="gs4">科创板指</label>
        </div>
        <div id="d-info">
            <div id="plate-money-flow" class="d-block">
                <div style="overflow: hidden;">
                    <div class="d-choose" @mouseover="selectStyle1()" :class="{ active: !c1 }">板块流入</div>
                    <div class="d-choose" @mouseover="selectStyle1()" :class="{ active: c1 }">板块流出</div>
                </div>
                <ul>
                    <li style="color: red" v-for="(item, index) in c_list[0][0]" :key="index" v-show="c1 === 0"><span>{{item[0]}}</span><span>{{item[1] + '万'}}</span></li>
                    <li style="color: green" v-for="(item, index) in c_list[0][1]" :key="index" v-show="c1 === 1"><span>{{item[0]}}</span><span>{{item[1] + '万'}}</span></li>
                </ul>
            </div>
            <div id="stock-money-flow" class="d-block">
                <div style="overflow: hidden;">
                    <div class="d-choose" @mouseover="selectStyle2()" :class="{ active: !c2 }">个股流入</div>
                    <div class="d-choose" @mouseover="selectStyle2()" :class="{ active: c2 }">个股流出</div>
                </div>
                <ul>
                    <li style="color: red" v-for="(item, index) in c_list[1][0]" :key="index" v-show="c2 === 0"><span>{{item[0]}}</span><span>{{item[1] + '万'}}</span></li>
                    <li style="color: green" v-for="(item, index) in c_list[1][1]" :key="index" v-show="c2 === 1"><span>{{item[0]}}</span><span>{{item[1] + '万'}}</span></li>
                </ul>
            </div>
            <div id="plate-rate" class="d-block">
                <div style="overflow: hidden;">
                    <div class="d-choose" @mouseover="selectStyle3()" :class="{ active: !c3 }">板块涨幅</div>
                    <div class="d-choose" @mouseover="selectStyle3()" :class="{ active: c3 }">板块跌幅</div>
                </div>
                <ul>
                    <li style="color: red" v-for="(item, index) in c_list[2][0]" :key="index" v-show="c3 === 0"><span>{{item[0]}}</span><span>{{item[1]}}</span></li>
                    <li style="color: green" v-for="(item, index) in c_list[2][1]" :key="index" v-show="c3 === 1"><span>{{item[0]}}</span><span>{{item[1]}}</span></li>
                </ul>
            </div>
            <div id="stock-rate" class="d-block">
                <div style="overflow: hidden;">
                    <div class="d-choose" @mouseover="selectStyle4()" :class="{ active: !c4 }">个股涨幅</div>
                    <div class="d-choose" @mouseover="selectStyle4()" :class="{ active: c4 }">个股跌幅</div>
                </div>
                <ul>
                    <li style="color: red" v-for="(item, index) in c_list[3][0]" :key="index" v-show="c4 === 0"><span>{{item[0]}}</span><span>{{item[1]}}</span></li>
                    <li style="color: green" v-for="(item, index) in c_list[3][1]" :key="index" v-show="c4 === 1"><span>{{item[0]}}</span><span>{{item[1]}}</span></li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Dashboard",
        data() {
            return {
                screenWidth: document.body.clientWidth,
                gtype: 0,
                upColor: '#ec0000',
                upBorderColor: '#8A0000',
                downColor: '#00da3c',
                downBorderColor: '#008F28',
                myCharts: null,
                gdata: [[],[],[],[]],
                c1: 0,
                c2: 0,
                c3: 0,
                c4: 0,
                c_list: [
                    [
                        [
                            ['发电设备', 65860.33],
                            ['酿酒行业', 50656.42],
                            ['医疗器械', 41552.95],
                            ['电器行业', 28074.30],
                            ['飞机制造', 11948.33]
                        ],
                        [
                            ['金融行业', -201378.98],
                            ['电子信息', -172157.43],
                            ['房 地 产', -115527.95],
                            ['化工行业', -114309.57],
                            ['农林牧渔', -99024.30]
                        ]
                    ],
                    [
                        [
                            ['N世华', 15860.33],
                            ['N海象', 5656.42],
                            ['N共创', 4552.95],
                            ['青岛中程', 2874.30],
                            ['晨曦航空', 1148.33]
                        ],
                        [
                            ['芯海科技', -21378.98],
                            ['众信旅游', -19157.93],
                            ['伟隆股份', -11527.95],
                            ['国城矿业', -11439.57],
                            ['思美传媒', -9024.30]
                        ]
                    ],
                    [
                        [
                            ['发电设备', '2.12%'],
                            ['酿酒行业', '1.11%'],
                            ['医疗器械', '1.101%'],
                            ['电器行业', '0.98%'],
                            ['飞机制造', '0.65%']
                        ],
                        [
                            ['金融行业', '-3.01%'],
                            ['电子信息', '-2.77%'],
                            ['房 地 产', '-1.88%'],
                            ['化工行业', '-1.65%'],
                            ['农林牧渔', '-1.21%']
                        ]
                    ],
                    [
                        [
                            ['N世华', '62.12%'],
                            ['N海象', '43.12%'],
                            ['N共创', '29.12%'],
                            ['青岛中程', '20.04%'],
                            ['晨曦航空', '20.00%']
                        ],
                        [
                            ['芯海科技', '-11.42%'],
                            ['众信旅游', '-9.01%'],
                            ['伟隆股份', '-7.04%'],
                            ['国城矿业', '-6.51%'],
                            ['思美传媒', '-5.88%']
                        ]
                    ]
                ]
            }
        },
        created() {
            console.log('start connect');
            Promise.all([
                this.$http.get('/api1/data/hs/kline/day/history/2020/0000001.json'),
                this.$http.get('/api1/data/hs/kline/day/history/2020/1399001.json'),
                this.$http.get('/api1/data/hs/kline/day/history/2020/1399006.json'),
                this.$http.get('/api1/data/hs/kline/day/history/2020/0000688.json')
            ]).then(v => {
                console.log('connect OK');
                this.gdata = [[],[],[],[]];
                for(let i = 0 ; i < 4; i++) {
                    for(let j = 0; j < v[i].data.data.length; j++) {
                        this.gdata[i].push([v[i].data.data[j][0],v[i].data.data[j][1],v[i].data.data[j][2],v[i].data.data[j][4],v[i].data.data[j][3]])
                    }
                }
                this.myCharts = [
                    [this.$echarts.init(document.getElementById('g1')), '上证指数', 0],
                    [this.$echarts.init(document.getElementById('g2')), '深证成指', 1],
                    [this.$echarts.init(document.getElementById('g3')), '创业板指', 2],
                    [this.$echarts.init(document.getElementById('g4')), '科创板指', 3]
                ];
                this.draw(...this.myCharts[this.gtype]);
            }).catch(e => {
                console.error(e);
            });
        },
        methods: {
            draw(myChart, name, num) {
                // 数据意义：开盘(open)，收盘(close)，最低(lowest)，最高(highest)
                let data0 = [];
                this.gdata[num].forEach(v => {data0.push(v.slice());})
                data0 = splitData(data0);
                function splitData(rawData) {
                    var categoryData = [];
                    var values = [];
                    for (var i = 0; i < rawData.length; i++) {
                        categoryData.push(rawData[i].splice(0, 1)[0]);
                        values.push(rawData[i])
                    }
                    return {
                        categoryData: categoryData,
                        values: values
                    };
                }

                function calculateMA(dayCount) {
                    var result = [];
                    for (var i = 0, len = data0.values.length; i < len; i++) {
                        if (i < dayCount) {
                            result.push('-');
                            continue;
                        }
                        var sum = 0;
                        for (var j = 0; j < dayCount; j++) {
                            sum += data0.values[i - j][1];
                        }
                        result.push(sum / dayCount);
                    }
                    return result;
                }

                var option = {
                    title: {
                        text: name,
                        left: 70
                    },
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            type: 'cross'
                        }
                    },
                    legend: {
                        data: ['日K', 'MA5', 'MA10', 'MA20', 'MA30']
                    },
                    grid: {
                        left: '10%',
                        right: '10%',
                        bottom: '15%'
                    },
                    xAxis: {
                        type: 'category',
                        data: data0.categoryData,
                        scale: true,
                        boundaryGap: false,
                        axisLine: {onZero: false},
                        splitLine: {show: false},
                        splitNumber: 20,
                        min: 'dataMin',
                        max: 'dataMax'
                    },
                    yAxis: {
                        scale: true,
                        splitArea: {
                            show: true
                        }
                    },
                    dataZoom: [
                        {
                            type: 'inside',
                            start: 50,
                            end: 100
                        },
                        {
                            show: true,
                            type: 'slider',
                            top: '90%',
                            start: 50,
                            end: 100
                        }
                    ],
                    series: [
                        {
                            name: '日K',
                            type: 'candlestick',
                            data: data0.values,
                            itemStyle: {
                                color: this.upColor,
                                color0: this.downColor,
                                borderColor: this.upBorderColor,
                                borderColor0: this.downBorderColor
                            },
                            markPoint: {
                                label: {
                                    normal: {
                                        formatter: function (param) {
                                            return param != null ? Math.round(param.value) : '';
                                        }
                                    }
                                },
                                data: [
                                    {
                                        name: 'XX标点',
                                        coord: ['2013/5/31', 2300],
                                        value: 2300,
                                        itemStyle: {
                                            color: 'rgb(41,60,85)'
                                        }
                                    },
                                    {
                                        name: 'highest value',
                                        type: 'max',
                                        valueDim: 'highest'
                                    },
                                    {
                                        name: 'lowest value',
                                        type: 'min',
                                        valueDim: 'lowest'
                                    },
                                    {
                                        name: 'average value on close',
                                        type: 'average',
                                        valueDim: 'close'
                                    }
                                ],
                                tooltip: {
                                    formatter: function (param) {
                                        return param.name + '<br>' + (param.data.coord || '');
                                    }
                                }
                            },
                            markLine: {
                                symbol: ['none', 'none'],
                                data: [
                                    [
                                        {
                                            name: 'from lowest to highest',
                                            type: 'min',
                                            valueDim: 'lowest',
                                            symbol: 'circle',
                                            symbolSize: 10,
                                            label: {
                                                show: false
                                            },
                                            emphasis: {
                                                label: {
                                                    show: false
                                                }
                                            }
                                        },
                                        {
                                            type: 'max',
                                            valueDim: 'highest',
                                            symbol: 'circle',
                                            symbolSize: 10,
                                            label: {
                                                show: false
                                            },
                                            emphasis: {
                                                label: {
                                                    show: false
                                                }
                                            }
                                        }
                                    ],
                                    {
                                        name: 'min line on close',
                                        type: 'min',
                                        valueDim: 'close'
                                    },
                                    {
                                        name: 'max line on close',
                                        type: 'max',
                                        valueDim: 'close'
                                    }
                                ]
                            }
                        },
                        {
                            name: 'MA5',
                            type: 'line',
                            data: calculateMA(5),
                            smooth: true,
                            lineStyle: {
                                opacity: 0.5
                            }
                        },
                        {
                            name: 'MA10',
                            type: 'line',
                            data: calculateMA(10),
                            smooth: true,
                            lineStyle: {
                                opacity: 0.5
                            }
                        },
                        {
                            name: 'MA20',
                            type: 'line',
                            data: calculateMA(20),
                            smooth: true,
                            lineStyle: {
                                opacity: 0.5
                            }
                        },
                        {
                            name: 'MA30',
                            type: 'line',
                            data: calculateMA(30),
                            smooth: true,
                            lineStyle: {
                                opacity: 0.5
                            }
                        },

                    ]
                };
                // 使用刚指定的配置项和数据显示图表。
                myChart.setOption(option);
            },
            selectStyle1 (item) {
                console.log(item);
                this.c1 = this.c1 ? 0 : 1;
            },
            selectStyle2 () {
                this.c2 = this.c2 ? 0 : 1;
            },
            selectStyle3 () {
                this.c3 = this.c3 ? 0 : 1;
            },
            selectStyle4 () {
                this.c4 = this.c4 ? 0 : 1;
            }
        },

        watch: {
            gtype() {
                this.$nextTick(()=>{
                    this.draw(...this.myCharts[this.gtype]);
                    this.myCharts[this.gtype][0].resize();
                });
            },
            screenWidth() {
                console.log('screenWidth change');
                this.myCharts[this.gtype][0].resize();
            }
        }

    }
</script>

<style scoped>
    #gs {
        width: 100%;
        height: 100%;
    }
    .gg {
        box-sizing: border-box;
        width: 80%;
        height: 50%;
        margin: 20px auto;
    }
    li:hover {
        background: floralwhite;
    }
    #g-select {
        width: 100%;
        height: 5%;
        margin: 20px auto;
    }
    .d-block {
        width: 25%;
        float: left;
        box-sizing: border-box;
        border: 1px solid #eee;;
    }
    .d-choose {
        width: 49%;
        float: left;
        font-size: 20px;
        box-sizing: border-box;
        border-bottom: 1px solid #eee;
    }
    .active {
        font-weight:bold;
    }
    ul {
        margin: 0;
        padding: 0;
        width: 100%;
    }
    li {
        margin-top: 5px;
        width: 100%;
        height: 35px;
        font-size: 16px;
    }
    span {
        display: inline-block;
        width: 50%;
        line-height: 35px;
    }
</style>