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

export default function getOptions(macd,data,KNAME,Zstart,Zend,highlab,lowlab,colorArr,MAArr) {
    return {
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
                "color": colorArr[0],
                "color0": colorArr[1],
                "borderColor": colorArr[0],
                "borderColor0": colorArr[1]
            }
        },
            {
                "type": "line",
                "name": AutoSetMALabel()[0],
                "data": MAArr[0][0],
            },
            {
                "type": "line",
                "name": AutoSetMALabel()[1],
                "data": MAArr[1][0],
            },
            {
                "type": "line",
                "name": AutoSetMALabel()[2],
                "data": MAArr[2][0],
            },
            {
                "type": "line",
                "name": AutoSetMALabel()[3],
                "data": MAArr[3][0],
            },
            {
                "type": "line",
                "name": AutoSetMALabel()[4],
                "data": MAArr[4][0],
            },
            {
                "type": "line",
                "name": AutoSetMALabel()[5],
                "data": MAArr[5][0],
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
                                colorList = colorArr[0];
                            } else {
                                colorList = colorArr[1];
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
                                colorList = colorArr[0];
                            } else {
                                colorList = colorArr[1];
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
    }
}