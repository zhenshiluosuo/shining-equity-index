<template>
    <div id="individual-stock">
        <div v-if="show_st === true" id="individual-stock-st">
            <div id="individual-stock-st-txt">
                <span>请输入个股代码，或者进入“我的自选”点击个股</span>
            </div>
            <SearchPlus :do_value="do_value" @searchPlus-emit="go" style="margin: 0 auto;"></SearchPlus>
        </div>
        <div v-else style="width: 100%; height: 100%;">
            <div style="width: 75%; height: 100%;position: relative;float: left; box-sizing: border-box; border-right: 1px solid #2c3e50;">
                <div id="individual-stock-show-chart">
                    <MyChart :data="chart_data" :load_finish="chart_data_flag"></MyChart>
                    <div style="width: 100%; height: 100%; background: white; position: absolute; top: 0; left: 0;" v-show="show_type === true">
                        <div id="individual-stock-show-img" ref="stockTimeImg"></div>
                    </div>
                    <div id="individual-stock-show-switch">
                        <div style="cursor: pointer; position: relative; float: left; width: 50%; height: 100%; box-sizing: border-box; border-right: 1px solid #2c3e50; line-height: 1.5em;" :class="{ 'color-blue' : show_type }" @click="change_show_type(1)">分时</div>
                        <div style="cursor: pointer; position: relative; float: left; width: 50%; height: 100%; line-height: 1.5em;"  :class="{ 'color-blue' : !show_type }" @click="change_show_type(2)">周期</div>
                    </div>
                </div>
                <div id="individual-stock-show-talk">
                    <div style="width: 100%; height: 15%;display: flex;background-color: #2c3e50; color: #ffffff; border-bottom: 1px solid #00BFFF;">
                        <span style="flex: 2;">点击</span>
                        <span style="flex: 2;">评论</span>
                        <span style="flex: 7; display: inline-block; text-align:left; text-indent: 5em;">标题</span>
                        <span style="flex: 3; display: inline-block; box-sizing: border-box; border: 1px solid #ffffff; cursor: pointer;">查看更多帖子</span>
                        <span style="flex: 3; display: inline-block; box-sizing: border-box; border: 1px solid #ffffff; cursor: pointer;">我也要发帖</span>
                        <span style="flex: 3;">作者</span>
                    </div>
                    <ul>
                        <li v-for="item in talk_datas" :key="item.id" :class="{'individual-stock-color' : item.id % 2}">
                            <span style="flex: 2;">{{item.read_num}}</span>
                            <span style="flex: 2;">{{item.comment_num}}</span>
                            <span style="flex: 13; text-align:left; cursor: pointer;">{{item.data}}</span>
                            <span style="flex: 3;">{{item.author}}</span>
                        </li>
                    </ul>
                </div>
            </div>
            <div style="width: 25%; height: 100%;position: relative;float: left;">
                <div id="individual-stock-show-search">
                    <SearchPlus :do_value="do_value" @searchPlus-emit="go" style="height: 100%; width: 100%;"></SearchPlus>
                </div>
                <div id="individual-stock-show-info">
                    <div style="height: 15%;width: 100%;">
                        <div style="height: 40%;width: 100%; vertical-align:middle;">
                            <span style="display: inline-block; width: 50%; height: 1em; font-size: 1.5em; line-height: 1.5em;">{{stock_num}}</span>
                            <span style="display: inline-block; width: 50%; height: 1.5em; font-size: 1.5em; line-height: 1.5em; color: #FF8C00;">{{stock_data[1]}}</span>
                        </div>
                        <div style="height: 60%; width: 100%; font-size: 1.25em; font-weight: bold;" :class="{'color-green': color_type === 1, 'color-red': color_type === 2}">
                            <div style="display: inline-block; width: 50%;">
                                <span style="color: #000000; font-weight: normal; font-size: 0.8em;">当前价格</span><br>
                                <span>{{stock_data[3]}}</span>
                            </div>
                            <div style="display: inline-block; width: 50%;">
                                <span style="display: inline-block; width: 100%;height: 50%;">{{stock_data[32] + '%'}}</span>
                                <span style="display: inline-block; width: 100%;height: 50%;">{{stock_data[31]}}</span>
                            </div>
                        </div>
                    </div>
                    <div style="height: 20%; width: 98%; box-sizing: border-box; margin: 0 1%;border: 1px solid #2c3e50; border-radius: 5px;clear: both;">
                        <div style="position: relative; float: left; height: 100%;width: 50%;">
                            <div class="stock-apply">
                                <span class="stock-apply-info stock-apply-info-head">买一</span>
                                <span class="stock-apply-info">{{stock_data[9]}}</span>
                                <span class="stock-apply-info">{{stock_data[10]}}</span>
                            </div>
                            <div class="stock-apply">
                                <span class="stock-apply-info stock-apply-info-head">买二</span>
                                <span class="stock-apply-info">{{stock_data[11]}}</span>
                                <span class="stock-apply-info">{{stock_data[12]}}</span>
                            </div>
                            <div class="stock-apply">
                                <span class="stock-apply-info stock-apply-info-head">买三</span>
                                <span class="stock-apply-info">{{stock_data[13]}}</span>
                                <span class="stock-apply-info">{{stock_data[14]}}</span>
                            </div>
                            <div class="stock-apply">
                                <span class="stock-apply-info stock-apply-info-head">买四</span>
                                <span class="stock-apply-info">{{stock_data[15]}}</span>
                                <span class="stock-apply-info">{{stock_data[16]}}</span>
                            </div>
                            <div class="stock-apply">
                                <span class="stock-apply-info stock-apply-info-head">买五</span>
                                <span class="stock-apply-info">{{stock_data[17]}}</span>
                                <span class="stock-apply-info">{{stock_data[18]}}</span>
                            </div>
                        </div>
                        <div style="position: relative; float: left; height: 100%;width: 50%;">
                            <div class="stock-apply">
                                <span class="stock-apply-info stock-apply-info-head">卖一</span>
                                <span class="stock-apply-info">{{stock_data[19]}}</span>
                                <span class="stock-apply-info">{{stock_data[20]}}</span>
                            </div>
                            <div class="stock-apply">
                                <span class="stock-apply-info stock-apply-info-head">卖二</span>
                                <span class="stock-apply-info">{{stock_data[21]}}</span>
                                <span class="stock-apply-info">{{stock_data[22]}}</span>
                            </div>
                            <div class="stock-apply">
                                <span class="stock-apply-info stock-apply-info-head">卖三</span>
                                <span class="stock-apply-info">{{stock_data[23]}}</span>
                                <span class="stock-apply-info">{{stock_data[24]}}</span>
                            </div>
                            <div class="stock-apply">
                                <span class="stock-apply-info stock-apply-info-head">卖四</span>
                                <span class="stock-apply-info">{{stock_data[25]}}</span>
                                <span class="stock-apply-info">{{stock_data[26]}}</span>
                            </div>
                            <div class="stock-apply">
                                <span class="stock-apply-info stock-apply-info-head">卖五</span>
                                <span class="stock-apply-info">{{stock_data[27]}}</span>
                                <span class="stock-apply-info">{{stock_data[28]}}</span>
                            </div>
                        </div>
                    </div>
                    <div style="height: 30%; width: 98%; box-sizing: border-box; margin:0 1%; border: 1px solid #2c3e50; border-radius: 5px; clear: both;">
                        <div style="height: 100%; width: 45%; position: relative; float: left;">
                            <div class="stock-apply2">
                                <span class="stock-apply-info stock-apply-info-head">主力流入</span>
                                <span class="stock-apply-info">{{stock_data1[1] + '万元'}}</span>
                            </div>
                            <div class="stock-apply2">
                                <span class="stock-apply-info stock-apply-info-head">主力流出</span>
                                <span class="stock-apply-info">{{stock_data1[2] + '万元'}}</span>
                            </div>
                            <div class="stock-apply2">
                                <span class="stock-apply-info stock-apply-info-head">主力净流入</span>
                                <span class="stock-apply-info">{{stock_data1[3] + '万元'}}</span>
                            </div>
                            <div class="stock-apply2">
                                <span class="stock-apply-info stock-apply-info-head">散户流入</span>
                                <span class="stock-apply-info">{{stock_data1[5] + '万元'}}</span>
                            </div>
                            <div class="stock-apply2">
                                <span class="stock-apply-info stock-apply-info-head">散户流出</span>
                                <span class="stock-apply-info">{{stock_data1[6] + '万元'}}</span>
                            </div>
                            <div class="stock-apply2">
                                <span class="stock-apply-info stock-apply-info-head">散户净流入</span>
                                <span class="stock-apply-info">{{stock_data1[7] + '万元'}}</span>
                            </div>
                        </div>
                        <div style="height: 100%; width: 55%; position: relative; float: left;">
                            <PieChart style="height: 100%; width: 100%"></PieChart>
                        </div>
                    </div>
                    <div style="height: 35%; width: 98%; box-sizing: border-box; margin:0 1%;border: 1px solid #2c3e50; border-radius: 5px;clear: both;">
                        <div style="position: relative; float: left; height: 100%;width: 50%;">
                            <div class="stock-apply1">
                                <span class="stock-apply-info">当前价格</span>
                                <span class="stock-apply-info">{{stock_data[3]}}</span>
                            </div>
                            <div class="stock-apply1 individual-stock-color">
                                <span class="stock-apply-info">昨收</span>
                                <span class="stock-apply-info">{{stock_data[4]}}</span>
                            </div>
                            <div class="stock-apply1">
                                <span class="stock-apply-info">今开</span>
                                <span class="stock-apply-info">{{stock_data[5]}}</span>
                            </div>
                            <div class="stock-apply1 individual-stock-color">
                                <span class="stock-apply-info">成交量</span>
                                <span class="stock-apply-info">{{stock_data[6]}}</span>
                            </div>
                            <div class="stock-apply1">
                                <span class="stock-apply-info">外盘</span>
                                <span class="stock-apply-info">{{stock_data[7]}}</span>
                            </div>
                            <div class="stock-apply1 individual-stock-color">
                                <span class="stock-apply-info">内盘</span>
                                <span class="stock-apply-info">{{stock_data[8]}}</span>
                            </div>
                            <div class="stock-apply1">
                                <span class="stock-apply-info">最高</span>
                                <span class="stock-apply-info">{{stock_data[33]}}</span>
                            </div>
                            <div class="stock-apply1 individual-stock-color">
                                <span class="stock-apply-info">最低</span>
                                <span class="stock-apply-info">{{stock_data[34]}}</span>
                            </div>
                            <div class="stock-apply1">
                                <span class="stock-apply-info">成交量(手)</span>
                                <span class="stock-apply-info">{{stock_data[36]}}</span>
                            </div>
                            <div class="stock-apply1 individual-stock-color">
                                <span class="stock-apply-info">成交额(万)</span>
                                <span class="stock-apply-info">{{stock_data[37]}}</span>
                            </div>
                        </div>
                        <div style="position: relative; float: left; height: 100%;width: 50%;">
                            <div class="stock-apply1 individual-stock-color">
                                <span class="stock-apply-info">换手率</span>
                                <span class="stock-apply-info">{{stock_data[38]}}</span>
                            </div>
                            <div class="stock-apply1">
                                <span class="stock-apply-info">市盈率</span>
                                <span class="stock-apply-info">{{stock_data[39]}}</span>
                            </div>
                            <div class="stock-apply1 individual-stock-color">
                                <span class="stock-apply-info">最高</span>
                                <span class="stock-apply-info">{{stock_data[41]}}</span>
                            </div>
                            <div class="stock-apply1">
                                <span class="stock-apply-info">最低</span>
                                <span class="stock-apply-info">{{stock_data[42]}}</span>
                            </div>
                            <div class="stock-apply1 individual-stock-color">
                                <span class="stock-apply-info">振幅</span>
                                <span class="stock-apply-info">{{stock_data[43] + '%'}}</span>
                            </div>
                            <div class="stock-apply1">
                                <span class="stock-apply-info">流通市值(亿)</span>
                                <span class="stock-apply-info">{{stock_data[44]}}</span>
                            </div>
                            <div class="stock-apply1 individual-stock-color">
                                <span class="stock-apply-info">总市值(亿)</span>
                                <span class="stock-apply-info">{{stock_data[45]}}</span>
                            </div>
                            <div class="stock-apply1">
                                <span class="stock-apply-info">市净率</span>
                                <span class="stock-apply-info">{{stock_data[46]}}</span>
                            </div>
                            <div class="stock-apply1 individual-stock-color">
                                <span class="stock-apply-info">涨停价</span>
                                <span class="stock-apply-info">{{stock_data[47]}}</span>
                            </div>
                            <div class="stock-apply1">
                                <span class="stock-apply-info">跌停价</span>
                                <span class="stock-apply-info">{{stock_data[48]}}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import SearchPlus from "./SearchPlus";
    import MyChart from "./MyChart";
    import PieChart from "./PieChart";
    import talk_datas from "../mock/talk_datas"
    export default {
        name: "IndividualStock",
        data() {
            return{
                img_src: '',
                stock_num: '',
                stock_data: null,
                stock_data1: null,
                show_st: false,
                show_type: false,
                do_value: '进入',
                chart_datax: [],
                chart_data: [],
                chart_data_flag: false,
                color_type: 0,
                talk_datas
            }
        },
        created() {
            if(this.$route.query.num) {
                this.stock_num = this.$route.query.num;

                let chart_stock_num;
                if(this.stock_num[0] === '0' || this.stock_num[0] === '3') {
                    chart_stock_num = '1' + this.stock_num;
                } else {
                    chart_stock_num = '0' + this.stock_num;
                }
                this.getData(2020, chart_stock_num);

                this.getStockData(this.stock_num);
                this.getImg();
            } else {
                this.show_st = true;
            }
        },
        updated() {
            if(this.$route.query.num) {
                this.getImg();
            }
        },
        components: {
            SearchPlus,
            MyChart,
            PieChart
        },
        methods: {
            getImg() {
                let jys = this.stock_num.slice(0,1);
                jys = (jys === '0' || jys === '3') ? 'sz' : (jys === '6' ? 'sh' : '');
                if (jys !== '') {
                    this.img_src = 'http://image.sinajs.cn/newchart/min/n/' + jys + this.stock_num + '.gif';
                    this.$refs.stockTimeImg.style.backgroundImage = 'url(' + this.img_src +')';
                }
            },
            getData(year, num) {
                console.log(num);
                this.$http.get('/api1' + '/data/hs/kline/day/history/' + year + '/' + num + '.json').then(v => {
                    this.chart_datax.unshift(...v.data.data);
                    this.getData(year - 1, num);
                }).catch(() => {
                    this.processData();
                });
            },
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
            },
            go(v) {
                this.show_st = false;
                this.stock_num = v;
            },
            getStockData(value) {
                let str = '/gtimg/q=', _str = '/gtimg/q=ff_';
                if(value[0] === '3' || value[0] === '0') {
                    str += 'sz';
                    _str += 'sz';
                } else if(value[0] === '6') {
                    str += 'sh';
                    _str += 'sh';
                } else return;
                this.$http.get(str + value).then(v => {
                    this.stock_data = v.data.split('~');
                    if(parseFloat(this.stock_data[3]) - parseFloat(this.stock_data[4]) < 0.0) {
                        this.color_type = 1;
                    } else if(parseFloat(this.stock_data[3]) - parseFloat(this.stock_data[4]) > 0.0) {
                        this.color_type = 2;
                    }
                });
                this.$http.get(_str + value).then(v => {
                    this.stock_data1 = v.data.split('~');
                });
            },
            change_show_type(v) {
                if(v === 1) {
                    this.show_type = true;
                } else {
                    this.show_type = false;
                }
            }
        },
        watch: {
            show_st() {
                this.getStockData(this.stock_num);
                this.$refs.stockTimeImg.style.backgroundImage = 'url(' + 'http://image.sinajs.cn/newchart/min/n/sh600000.gif' +')';
            }
        }
    }
</script>

<style scoped>
    #individual-stock-st {
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
    }
    #individual-stock-st-txt {
        width: 100%;
        padding: 5px;
        border: 1px solid #2c3e50;
        border-radius: 5px;
    }
    #individual-stock-show {
        width: 100%;
        height: 100%;
        box-sizing: border-box;
        border: 1px solid #2c3e50;
        padding: 2px;
        clear: both;
    }
    #individual-stock-show-chart {
        width: 100%;
        height: 80%;
        box-sizing: border-box;
        padding: 5px;
        position: relative;
    }
    #individual-stock-show-talk {
        width: 100%;
        height: 20%;
        box-sizing: border-box;
        border: 1px solid #2c3e50;
        border-radius: 5px;
    }
    #individual-stock-show-talk > ul {
        width: 100%;
        height: 85%;
        margin: 0;
        border: 0;
        padding: 0;
    }
    #individual-stock-show-talk > ul > li{
        width: 100%;
        height: 20%;
        box-sizing: border-box;
        padding: 2px;
        display: flex;
        flex-direction: row;
    }
    #individual-stock-show-talk > ul > li > span {
        display: inline-block;
    }
    .individual-stock-color {
        background-color: #eeeeee;
    }
    #individual-stock-show-info {
        width: 100%;
        height: 95%;
        box-sizing: border-box;
        border: 1px solid #2c3e50;
        border-radius: 5px;
    }
    #individual-stock-show-search {
        width: 100%;
        height: 5%;
        box-sizing: border-box;
        border: 1px solid #2c3e50;
        border-radius: 5px;
    }
    #individual-stock-show-img {
        height: 100%;
        width: 100%;
        position: absolute;
        top: 0;
        left: 0;
        z-index: 100;
        background-repeat: no-repeat;
        background-size: 100% 100%;
        opacity: 1;
    }
    #individual-stock-show-switch {
        position: absolute;
        top: 0;
        right: 0;
        z-index: 1000;
        box-sizing: border-box;
        border: 1px solid #2c3e50;
        width: 6em;
        height: 1.5em;
    }
    .stock-apply {
        height: 20%;
        width: 100%;
        box-sizing: border-box;
        vertical-align: middle;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .stock-apply1 {
        height: 10%;
        width: 100%;
        box-sizing: border-box;
        vertical-align: middle;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .stock-apply-info {
        display: inline-block;
        margin: auto 0;
        font-size: 0.8em;
        flex: 1;
        width: 33%;
        padding-top: 5px;
    }
    .stock-apply-info-head {
        font-weight: bold;
        font-size: 1em;
        padding-top: 0px;
    }
    .stock-apply2 {
        height: 16.6%;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .color-blue {
        background: #1E90FF;
        color: #ffffff;
    }
    .color-green {
        color: #32CD32;
    }
    .color-red {
        color: #FF0000;
    }
</style>
