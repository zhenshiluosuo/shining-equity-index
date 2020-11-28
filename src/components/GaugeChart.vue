<template>
    <div>
        <div class="gauge-chart" ref="gaugechart"></div>
    </div>
</template>

<script>
    export default {
        name: "GaugeChart",
        data() {
            return {

            }
        },
        props:[
            'type'
        ],
        mounted() {
            this.draw();
        },
        methods: {
            draw() {
                let axisTickLength = 20; //刻度线宽度
                let value = Math.floor(Math.random() * 100)
                let colorRegionRate = (value / 100).toFixed(2)

                let index = (value >= 66 ? 0 : (value > 33 ? 1 : 2))
                let startColor = ['#34da62', '#fed95f', '#f56c6c'][index]
                let endColor = ['#14a661', '#ff8e02', '#f44444'][index]

                let option = {
                    title: {
                        textStyle: {
                            color: '#b1977d'
                        }
                    },
                    backgroundColor: "#ffffff",

                    series: [{
                        type: 'gauge',
                        name: '外层半透明边框圈',
                        radius: '90%',
                        startAngle: '225',
                        endAngle: '-45',
                        splitNumber: '100',
                        pointer: {
                            show: false
                        },
                        detail: {
                            show: false,
                        },
                        axisLine: {
                            show: true,
                            lineStyle: {
                                color: [
                                    [1, 'rgba(0,0,0,0.1)']
                                ],
                                width: 8,
                                opacity: 1
                            }
                        },
                        axisTick: {
                            show: false
                        },
                        splitLine: {
                            show: false,
                        },
                        axisLabel: {
                            show: false
                        }
                    },
                        {
                            type: 'gauge',
                            name: '第二层',
                            radius: '86%',
                            startAngle: '225',
                            endAngle: '-45',
                            splitNumber: 4,
                            pointer: {
                                show: true,
                                length: '53%'
                            },
                            // 仪表盘指针样式。
                            itemStyle: {
                                color: '#000000'
                            },
                            data: [{
                                value: value,
                                name: '评值'
                            }],
                            title: {
                                show: false,
                            },
                            axisLine: {
                                show: true,
                                lineStyle: {
                                    color: [
                                        // 有数值的部分
                                        [colorRegionRate, new this.$echarts.graphic.LinearGradient(0, 0, 1, 0, [{
                                            offset: 0,
                                            color: startColor // 0% 处的颜色
                                        },
                                            {
                                                offset: 1,
                                                color: endColor // 100% 处的颜色
                                            }
                                        ])],
                                        // 底色
                                        [1, new this.$echarts.graphic.LinearGradient(0, 0, 1, 0, [{
                                            offset: 0,
                                            color: 'rgba(255,255,255,0.1)' // 0% 处的颜色
                                        },
                                            {
                                                offset: 1,
                                                color: 'rgba(255,255,255,0.1)' // 100% 处的颜色
                                            }
                                        ])]
                                    ],
                                    width: 50,
                                    shadowOffsetX: 0,
                                    shadowOffsetY: 0,
                                    opacity: 1
                                }
                            },
                            axisTick: {
                                show: false
                            },
                            splitLine: {
                                show: false
                            },
                            detail: {
                                show: false
                            },
                            axisLabel: {
                                show: false,
                            },
                            animationDuration: 2000,
                        },
                        {
                            name: '第三层渐变圈',
                            type: 'gauge',
                            radius: '70%',
                            startAngle: '225',
                            endAngle: '-45',
                            splitNumber: 4,
                            pointer: {
                                show: false
                            },
                            data: [{
                                value: value,
                                name: '评值'
                            }],

                            axisLine: {
                                show: true,
                                lineStyle: {
                                    color: [
                                        // 有数值的部分
                                        [colorRegionRate, new this.$echarts.graphic.LinearGradient(0, 0, 1, 0, [{
                                            offset: 0,
                                            color: startColor // 0% 处的颜色
                                        },
                                            {
                                                offset: 1,
                                                color: endColor // 100% 处的颜色
                                            }
                                        ])],
                                        // 底色
                                        [1, new this.$echarts.graphic.LinearGradient(0, 0, 1, 0, [{
                                            offset: 0,
                                            color: 'rgba(255,255,255,0.1)' // 0% 处的颜色
                                        },
                                            {
                                                offset: 1,
                                                color: 'rgba(255,255,255,0.1)' // 100% 处的颜色
                                            }
                                        ])]
                                    ],
                                    width: axisTickLength, // 刻度线宽度
                                    shadowOffsetX: 0,
                                    shadowOffsetY: 0,
                                    opacity: 1
                                }
                            },
                            axisTick: {
                                show: false
                            },
                            splitLine: {
                                show: false,
                            },
                            // 仪表盘指针样式。
                            itemStyle: {
                                color: '#f6fefe'
                            },
                            title: {
                                show: false,
                            },
                            detail: {
                                show: false
                            },
                            axisLabel: {
                                show: false,
                            },
                            animationDuration: 2000,
                        },
                        {
                            name: '与div背景色相同模拟axisTick',
                            type: 'gauge',
                            radius: '70%',
                            startAngle: '225',
                            endAngle: '-45',
                            splitNumber: 1,
                            pointer: {
                                show: false
                            },
                            title: {
                                show: false,
                            },
                            detail: {
                                show: true,
                                offsetCenter: [0, '80%'],
                                formatter: (value) => {
                                    return [
                                        `{a|${this.type}${value}}{b|分}`,
                                        `{c|建议${value >= 66 ? '买入' : (value > 33 ? '维持现状' : '卖出')}}`
                                    ].join('\n')
                                },
                                rich: {
                                    a: {
                                        color: '#353c60',
                                        fontWeight: 500,
                                        fontSize: 14,
                                    },
                                    b: {
                                        color: '#353c60',
                                        fontWeight: 500,
                                        fontSize: 14,
                                    },
                                    c: {
                                        color: '#353c60',
                                        fontWeight: 500,
                                        fontSize: 14,
                                    },
                                }
                            },
                            data: [{
                                value: value,
                                name: '评值'
                            }],
                            axisLine: {
                                show: false,
                                lineStyle: {
                                    width: 1,
                                    opacity: 0
                                }
                            },
                            axisTick: {
                                show: true,
                                splitNumber: 50,
                                length: axisTickLength, // 刻度线宽度
                                lineStyle: {
                                    // 与div背景色相同
                                    color: '#C0C0C0',
                                    width: 1,
                                }
                            },
                            splitLine: {
                                show: false,
                            },
                            axisLabel: {
                                show: false
                            }
                        },
                    ]
                };
                let gaugeChart = this.$echarts.init(this.$refs.gaugechart);
                // 使用刚指定的配置项和数据显示图表。
                gaugeChart.setOption(option);
            }

        }
    }
</script>

<style scoped>
    .gauge-chart {
        height: 100%;
        width: 100%;
    }
</style>
