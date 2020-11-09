<template>
    <div ref="piechart">
    </div>
</template>

<script>
    export default {
        name: "PieChart",
        mounted() {
            this.draw();
        },
        methods: {
            draw() {
                let option = {
                    tooltip: {
                        trigger: 'item',
                        formatter: '{b} : {c} ({d}%)'
                    },
                    series: [
                        {
                            type: 'pie',
                            radius: '90%',
                            center: ['50%', '50%'],
                            label:{            //饼图图形上的文本标签
                                normal:{
                                    show:true,
                                    position:'inner', //标签的位置
                                    textStyle : {
                                        fontWeight : 300 ,
                                        fontSize : 12    //文字的字体大小
                                    },
                                    formatter: '{b} ({d}%)'
                                }
                            },
                            data: [
                                {value: 1548, name: '买方大单'},
                                {value: 535, name: '买方小单'},
                                {value: 510, name: '卖方大单'},
                                {value: 634, name: '卖方小单'},
                            ],
                            emphasis: {
                                itemStyle: {
                                    shadowBlur: 10,
                                    shadowOffsetX: 0,
                                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                                }
                            }
                        }
                    ]
                };
                let pieChart = this.$echarts.init(this.$refs.piechart);
                // 使用刚指定的配置项和数据显示图表。
                pieChart.setOption(option);
            }
        }
    }
</script>

<style scoped>

</style>
