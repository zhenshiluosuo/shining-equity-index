<template>
    <div class="my-chart" ref="mychart">
        <Loading v-if="!load_finish"></Loading>
    </div>
</template>

<script>
    import Loading from "./Loading";
    export default {
        name: "MyChart",
        data() {
            return {

            }
        },
        props: [
            'data',
            'load_finish'
        ],
        components: {
            Loading
        },
        created() {
        },
        updated() {
            if(this.data.length) {
                this.draw();
            }
        },
        methods: {
            draw() {
                //数据模型 time0 open1 close2 min3 max4 vol5 tag6 macd7 dif8 dea9
                //['2015-10-19',18.56,18.25,18.19,18.56,55.00,0,-0.00,0.08,0.09]
                var data = splitData(this.data)
                //数组处理
                function splitData(rawData) {
                    var datas = [];
                    var times = [];
                    var vols = [];
                    var macds = []; var difs = []; var deas = [];
                    for (var i = 0; i < rawData.length; i++) {
                        datas.push(rawData[i]);
                        times.push(rawData[i].splice(0, 1)[0]);
                        vols.push(rawData[i][4]);
                        macds.push(rawData[i][6]);
                        difs.push(rawData[i][7]);
                        deas.push(rawData[i][8]);
                    }
                    return {
                        datas: datas,
                        times: times,
                        vols: vols,
                        macds: macds,
                        difs: difs,
                        deas: deas
                    };
                }
//分段计算
                function fenduans(){
                    var markLineData = [];
                    var idx = 0; var tag = 0; var vols = 0;
                    for (var i = 0; i < data.times.length; i++) {
                        //初始化数据
                        if(data.datas[i][5] !== 0 && tag === 0){
                            idx = i; vols = data.datas[i][4]; tag = 1;
                        }
                        if(tag === 1){ vols += data.datas[i][4]; }
                        if(data.datas[i][5] !== 0 && tag === 1){
                            markLineData.push([{
                                xAxis: idx,
                                yAxis: data.datas[idx][1]>data.datas[idx][0]?(data.datas[idx][3]).toFixed(2):(data.datas[idx][2]).toFixed(2),
                                value: vols
                            }, {
                                xAxis: i,
                                yAxis: data.datas[i][1]>data.datas[i][0]?(data.datas[i][3]).toFixed(2):(data.datas[i][2]).toFixed(2)
                            }]);
                            idx = i; vols = data.datas[i][4]; tag = 2;
                        }

                        //更替数据
                        if(tag === 2){ vols += data.datas[i][4]; }
                        if(data.datas[i][5] !== 0 && tag === 2){
                            markLineData.push([{
                                xAxis: idx,
                                yAxis: data.datas[idx][1]>data.datas[idx][0]?(data.datas[idx][3]).toFixed(2):(data.datas[idx][2]).toFixed(2),
                                value: (vols/(i-idx+1)).toFixed(2)+' M'
                            }, {
                                xAxis: i,
                                yAxis: data.datas[i][1]>data.datas[i][0]?(data.datas[i][3]).toFixed(2):(data.datas[i][2]).toFixed(2)
                            }]);
                            idx = i; vols = data.datas[i][4];
                        }
                    }
                    return markLineData;
                }

//MA计算公式
                function calculateMA(dayCount) {
                    var result = [];
                    for (var i = 0, len = data.times.length; i < len; i++) {
                        if (i < dayCount) {
                            result.push('-');
                            continue;
                        }
                        var sum = 0;
                        for (var j = 0; j < dayCount; j++) {
                            sum += data.datas[i - j][1];
                        }
                        result.push((sum / dayCount).toFixed(2));
                    }
                    return result;
                }

                var option = {
                    title: {
                        text: 'K线周期图表',
                        left: 0
                    },
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            type: 'line'
                        }
                    },
                    legend: {
                        data: ['KLine', 'MA5', 'MA10', 'MA30', 'MA180']
                    },
                    grid: [           {
                        left: '3%',
                        right: '1%',
                        height: '60%'
                    },{
                        left: '3%',
                        right: '1%',
                        top: '71%',
                        height: '10%'
                    },{
                        left: '3%',
                        right: '1%',
                        top: '82%',
                        height: '14%'
                    }],
                    xAxis: [{
                        type: 'category',
                        data: data.times,
                        scale: true,
                        boundaryGap: false,
                        axisLine: { onZero: false },
                        splitLine: { show: false },
                        splitNumber: 20,
                        min: 'dataMin',
                        max: 'dataMax'
                    },{
                        type: 'category',
                        gridIndex: 1,
                        data: data.times,
                        axisLabel: {show: false}
                    },{
                        type: 'category',
                        gridIndex: 2,
                        data: data.times,
                        axisLabel: {show: false}
                    }],
                    yAxis: [{
                        scale: true,
                        splitArea: {
                            show: false
                        }
                    },{
                        gridIndex: 1,
                        splitNumber: 3,
                        axisLine: {onZero: false},
                        axisTick: {show: false},
                        splitLine: {show: false},
                        axisLabel: {show: true}
                    },{
                        gridIndex: 2,
                        splitNumber: 4,
                        axisLine: {onZero: false},
                        axisTick: {show: false},
                        splitLine: {show: false},
                        axisLabel: {show: true}
                    }],
                    dataZoom: [{
                        type: 'inside',
                        xAxisIndex: [0, 0],
                        start: 20,
                        end: 100
                    },{
                        show: true,
                        xAxisIndex: [0, 1],
                        type: 'slider',
                        top: '97%',
                        start: 20,
                        end: 100
                    },{
                        show: false,
                        xAxisIndex: [0, 2],
                        type: 'slider',
                        start: 20,
                        end: 100
                    }],
                    series: [{
                        name: 'K线周期图表',
                        type: 'candlestick',
                        data: data.datas,
                        itemStyle: {
                            normal: {
                                color: '#ef232a',
                                color0: '#14b143',
                                borderColor: '#ef232a',
                                borderColor0: '#14b143'
                            }
                        },
                        markArea: {
                            silent: true,
                            itemStyle: {
                                normal: {
                                    color: 'Honeydew'
                                }
                            },
                            data: fenduans()
                        },
                        markPoint: {
                            data: [
                                {type: 'max', name: '最大值'},
                                {type: 'min', name: '最小值'}
                            ]
                        },
                        markLine: {
                            label: {
                                normal: {
                                    position: 'middle',
                                    textStyle:{color:'Blue',fontSize: 15}
                                }
                            },
                            data: fenduans(),
                            symbol: ['circle', 'none']

                        }
                    }, {
                        name: 'MA5',
                        type: 'line',
                        data: calculateMA(5),
                        smooth: true,
                        lineStyle: {
                            normal: {
                                opacity: 0.5
                            }
                        }
                    }, {
                        name: 'MA10',
                        type: 'line',
                        data: calculateMA(10),
                        smooth: true,
                        lineStyle: {
                            normal: {
                                opacity: 0.5
                            }
                        }
                    }, {
                        name: 'MA30',
                        type: 'line',
                        data: calculateMA(30),
                        smooth: true,
                        lineStyle: {
                            normal: {
                                opacity: 0.5
                            }
                        }
                    }, {
                        name: 'MA180',
                        type: 'line',
                        data: calculateMA(180),
                        smooth: true,
                        lineStyle: {
                            normal: {
                                opacity: 0.5
                            }
                        }
                    },{
                        name: 'Volumn',
                        type: 'bar',
                        xAxisIndex: 1,
                        yAxisIndex: 1,
                        data: data.vols,
                        itemStyle: {
                            normal: {
                                color: function(params) {
                                    var colorList;
                                    if (data.datas[params.dataIndex][1]>data.datas[params.dataIndex][0]) {
                                        colorList = '#ef232a';
                                    } else {
                                        colorList = '#14b143';
                                    }
                                    return colorList;
                                },
                            }
                        }
                    },{
                        name: 'MACD',
                        type: 'bar',
                        xAxisIndex: 2,
                        yAxisIndex: 2,
                        data: data.macds,
                        itemStyle: {
                            normal: {
                                color: function(params) {
                                    var colorList;
                                    if (params.data >= 0) {
                                        colorList = '#ef232a';
                                    } else {
                                        colorList = '#14b143';
                                    }
                                    return colorList;
                                },
                            }
                        }
                    },{
                        name: 'DIF',
                        type: 'line',
                        xAxisIndex: 2,
                        yAxisIndex: 2,
                        data: data.difs
                    },{
                        name: 'DEA',
                        type: 'line',
                        xAxisIndex: 2,
                        yAxisIndex: 2,
                        data: data.deas
                    }
                    ]
                };
                let myChart = this.$echarts.init(this.$refs.mychart);
                // 使用刚指定的配置项和数据显示图表。
                myChart.setOption(option, true);
                this.load_flag = true;
            }
        },
        watch: {
            screenWidth() {
                console.log('screenWidth changed');
                this.$refs.mychart.resize();
            },
            load_finish() {
                console.log('load_finish changed', this.load_finish, this.data);
            }
        }
    }
</script>

<style scoped>
    .my-chart {
        width: 100%;
        height: 100%;
    }
</style>

