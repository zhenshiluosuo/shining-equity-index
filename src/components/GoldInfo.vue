<template>
    <div style="width: 100%; height: 100%;">
        <div style="width: 100%; height: 80%;">
        </div>
        <div style="width: 100%; height: 20%;">
        </div>
    </div>
</template>

<script>
    export default {
        name: "GoldInfo",
        data() {
            return {
                datax: [],
                data: []
            }
        },
        created() {
            this.getData(2020, '0600036');
        },
        methods: {
            getData(year, num) {
                this.$http.get('/api1' + '/data/hs/kline/day/history/' + year + '/' + num + '.json').then(v => {
                    this.datax.unshift(...v.data.data);
                    console.log(v.data.data, this.datax);
                    this.getData(year - 1, '0600036');
                }).catch(() => {
                    this.processData();
                });
            },
            processData() {
                //数据模型 time0 open1 close2 min3 max4 vol5 tag6 macd7 dif8 dea9
                //['2015-10-19',18.56,18.25,18.19,18.56,55.00,0,-0.00,0.08,0.09]
                // ["20020409", 10.51, 10.66, 10.88, 10.51, 414108831, 46.03]
                let macd = 0, ema12 = 0, ema26 = 0, dif = 0, dea = 0, time = '', close = 0.0;
                for(let item of this.datax) {
                    time = item[0].substring(0, 4) + '-' + item[0].substring(4, 6) + '-' + item[0].substring(6, 8);
                    close = parseFloat(item[2])
                    ema12 = (11 / 13 * ema12 + 2 / 13 * close).toFixed(2);
                    ema26 = (25 / 27 * ema26 + 2 / 27 * clos).toFixed(2);
                    dif = (ema12 - ema26).toFixed(2);
                    dea = (8 / 10 * dea + 2 / 10 * dif).toFixed(2);
                    macd = ((dif - dea) * 2).toFixed(2);
                    this.data.push([time, parseFloat(item[1]), close, item[4], item[3], item[5], 0, macd, dif, dea]);
                }
                this.data[0][6] = 1;
                this.data[this.data.length - 1][6] = 1;
                console.log(this.data);
            }
        }
    }
</script>

<style scoped>

</style>
