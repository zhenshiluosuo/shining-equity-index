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
                    <MyChart></MyChart>
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
                    <SearchPlus :do_value="do_value" @searchPlus-emit="go"></SearchPlus>
                </div>
                <div id="individual-stock-show-info">
                    <div style="height: 15%;width: 100%;">
                        <div style="height: 40%;width: 100%; vertical-align:middle;">
                            <span style="display: inline-block; width: 40%; height: 1.5em; font-size: 1.5em; line-height: 1.5em;">{{stock_num}}</span>
                            <span style="display: inline-block; width: 60%; height: 1.5em; font-size: 1.5em; line-height: 1.5em;">{{stock_data[0]}}</span>
                        </div>
                        <div style="height: 60%; width: 100%;">
                            <div style="display: inline-block; width: 50%;">
                                <span>当前价格</span><br>
                                <span>{{stock_data[3]}}</span>
                            </div>
                            <div style="display: inline-block; width: 50%;">
                                <span style="display: inline-block; width: 100%;height: 50%;">{{(parseFloat(stock_data[2]) - parseFloat(stock_data[3])).toFixed(2)}}</span>
                                <span style="display: inline-block; width: 100%;height: 50%;">{{(parseFloat(stock_data[2]) - parseFloat(stock_data[3]) / parseFloat(stock_data[2]) * 100).toFixed(2)}}</span>
                            </div>
                        </div>
                    </div>
                    <div style="height: 35%; width: 98%; box-sizing: border-box; margin: 0 1%;border: 1px solid #2c3e50; border-radius: 5px;clear: both;">
                        <div style="position: relative; float: left; height: 100%;width: 50%;">
                            <div class="stock-apply">
                                <span class="stock-apply-info stock-apply-info-head">买一</span>
                                <span class="stock-apply-info">{{stock_data[10]}}</span>
                                <span class="stock-apply-info">{{stock_data[11]}}</span>
                            </div>
                            <div class="stock-apply">
                                <span class="stock-apply-info stock-apply-info-head">买二</span>
                                <span class="stock-apply-info">{{stock_data[12]}}</span>
                                <span class="stock-apply-info">{{stock_data[13]}}</span>
                            </div>
                            <div class="stock-apply">
                                <span class="stock-apply-info stock-apply-info-head">买三</span>
                                <span class="stock-apply-info">{{stock_data[14]}}</span>
                                <span class="stock-apply-info">{{stock_data[15]}}</span>
                            </div>
                            <div class="stock-apply">
                                <span class="stock-apply-info stock-apply-info-head">买四</span>
                                <span class="stock-apply-info">{{stock_data[16]}}</span>
                                <span class="stock-apply-info">{{stock_data[17]}}</span>
                            </div>
                            <div class="stock-apply">
                                <span class="stock-apply-info stock-apply-info-head">买五</span>
                                <span class="stock-apply-info">{{stock_data[18]}}</span>
                                <span class="stock-apply-info">{{stock_data[19]}}</span>
                            </div>
                        </div>
                        <div style="position: relative; float: left; height: 100%;width: 50%;">
                            <div class="stock-apply">
                                <span class="stock-apply-info stock-apply-info-head">卖一</span>
                                <span class="stock-apply-info">{{stock_data[20]}}</span>
                                <span class="stock-apply-info">{{stock_data[21]}}</span>
                            </div>
                            <div class="stock-apply">
                                <span class="stock-apply-info stock-apply-info-head">卖二</span>
                                <span class="stock-apply-info">{{stock_data[22]}}</span>
                                <span class="stock-apply-info">{{stock_data[23]}}</span>
                            </div>
                            <div class="stock-apply">
                                <span class="stock-apply-info stock-apply-info-head">卖三</span>
                                <span class="stock-apply-info">{{stock_data[24]}}</span>
                                <span class="stock-apply-info">{{stock_data[25]}}</span>
                            </div>
                            <div class="stock-apply">
                                <span class="stock-apply-info stock-apply-info-head">卖四</span>
                                <span class="stock-apply-info">{{stock_data[26]}}</span>
                                <span class="stock-apply-info">{{stock_data[27]}}</span>
                            </div>
                            <div class="stock-apply">
                                <span class="stock-apply-info stock-apply-info-head">卖五</span>
                                <span class="stock-apply-info">{{stock_data[28]}}</span>
                                <span class="stock-apply-info">{{stock_data[29]}}</span>
                            </div>
                        </div>
                    </div>
                    <div style="height: 3%;"></div>
                    <div style="height: 45%; width: 98%; box-sizing: border-box; margin:0 1%;border: 1px solid #2c3e50; border-radius: 5px;clear: both;">
                        <div style="position: relative; float: left; height: 100%;width: 50%;">
                            <div class="stock-apply1">
                                <span class="stock-apply-info">{{stock_data[28]}}</span>
                                <span class="stock-apply-info">{{stock_data[28]}}</span>
                            </div>
                            <div class="stock-apply1 individual-stock-color">
                                <span class="stock-apply-info">{{stock_data[28]}}</span>
                                <span class="stock-apply-info">{{stock_data[28]}}</span>
                            </div>
                            <div class="stock-apply1">
                                <span class="stock-apply-info">{{stock_data[28]}}</span>
                                <span class="stock-apply-info">{{stock_data[28]}}</span>
                            </div>
                            <div class="stock-apply1 individual-stock-color">
                                <span class="stock-apply-info">{{stock_data[28]}}</span>
                                <span class="stock-apply-info">{{stock_data[28]}}</span>
                            </div>
                            <div class="stock-apply1">
                                <span class="stock-apply-info">{{stock_data[28]}}</span>
                                <span class="stock-apply-info">{{stock_data[28]}}</span>
                            </div>
                            <div class="stock-apply1 individual-stock-color">
                                <span class="stock-apply-info">{{stock_data[28]}}</span>
                                <span class="stock-apply-info">{{stock_data[28]}}</span>
                            </div>
                            <div class="stock-apply1">
                                <span class="stock-apply-info">{{stock_data[28]}}</span>
                                <span class="stock-apply-info">{{stock_data[28]}}</span>
                            </div>
                            <div class="stock-apply1 individual-stock-color">
                                <span class="stock-apply-info">{{stock_data[28]}}</span>
                                <span class="stock-apply-info">{{stock_data[28]}}</span>
                            </div>
                            <div class="stock-apply1">
                                <span class="stock-apply-info">{{stock_data[28]}}</span>
                                <span class="stock-apply-info">{{stock_data[28]}}</span>
                            </div>
                            <div class="stock-apply1 individual-stock-color">
                                <span class="stock-apply-info">{{stock_data[28]}}</span>
                                <span class="stock-apply-info">{{stock_data[28]}}</span>
                            </div>
                        </div>
                        <div style="position: relative; float: left; height: 100%;width: 50%;">
                            <div class="stock-apply1 individual-stock-color">
                                <span class="stock-apply-info">{{stock_data[28]}}</span>
                                <span class="stock-apply-info">{{stock_data[28]}}</span>
                            </div>
                            <div class="stock-apply1">
                                <span class="stock-apply-info">{{stock_data[28]}}</span>
                                <span class="stock-apply-info">{{stock_data[28]}}</span>
                            </div>
                            <div class="stock-apply1 individual-stock-color">
                                <span class="stock-apply-info">{{stock_data[28]}}</span>
                                <span class="stock-apply-info">{{stock_data[28]}}</span>
                            </div>
                            <div class="stock-apply1">
                                <span class="stock-apply-info">{{stock_data[28]}}</span>
                                <span class="stock-apply-info">{{stock_data[28]}}</span>
                            </div>
                            <div class="stock-apply1 individual-stock-color">
                                <span class="stock-apply-info">{{stock_data[28]}}</span>
                                <span class="stock-apply-info">{{stock_data[28]}}</span>
                            </div>
                            <div class="stock-apply1">
                                <span class="stock-apply-info">{{stock_data[28]}}</span>
                                <span class="stock-apply-info">{{stock_data[28]}}</span>
                            </div>
                            <div class="stock-apply1 individual-stock-color">
                                <span class="stock-apply-info">{{stock_data[28]}}</span>
                                <span class="stock-apply-info">{{stock_data[28]}}</span>
                            </div>
                            <div class="stock-apply1">
                                <span class="stock-apply-info">{{stock_data[28]}}</span>
                                <span class="stock-apply-info">{{stock_data[28]}}</span>
                            </div>
                            <div class="stock-apply1 individual-stock-color">
                                <span class="stock-apply-info">{{stock_data[28]}}</span>
                                <span class="stock-apply-info">{{stock_data[28]}}</span>
                            </div>
                            <div class="stock-apply1">
                                <span class="stock-apply-info">{{stock_data[28]}}</span>
                                <span class="stock-apply-info">{{stock_data[28]}}</span>
                            </div>
                        </div>
                    </div>
                    <div style="height: 2%;"></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import SearchPlus from "./SearchPlus";
    import MyChart from "./MyChart";
    export default {
        name: "IndividualStock",
        data() {
            return{
                img_src: '',
                stock_num: '',
                stock_data: null,
                show_st: false,
                do_value: '进入',
                talk_datas: [
                    {
                        id: 0,
                        read_num: 99,
                        comment_num: 0,
                        data: '我冲了，兄弟们呢？',
                        author: '战狼'
                    },
                    {
                        id: 1,
                        read_num: 391,
                        comment_num: 17,
                        data: '大家猜猜明天低开多少个点？',
                        author: '关灯吃面'
                    },
                    {
                        id: 2,
                        read_num: 131,
                        comment_num: 9,
                        data: '收麻了，这个月目标翻倍！',
                        author: '侠客老李'
                    },
                    {
                        id: 3,
                        read_num: 3213,
                        comment_num: 81,
                        data: '做错认错，补买必危！',
                        author: '穷哥们小八'
                    },
                    {
                        id: 4,
                        read_num: 107,
                        comment_num: 3,
                        data: '这股该出来做领头羊了吧？',
                        author: '温家宝123'
                    }
                ]
            }
        },
        created() {
            if(this.$route.query.num) {
                this.stock_num = this.$route.query.num;
                this.getStockData(this.stock_num);
            } else {
                this.show_st = true;
            }
            let jys = this.stock_num.slice(0,1);
            jys = (jys === '0' || jys === '3') ? 'sz' : (jys === '6' ? 'sh' : '');
            if (jys !== '') {
                this.img_src = 'http://image.sinajs.cn/newchart/min/n/' + jys + this.stock_num + '.gif'
            }
        },
        components: {
            SearchPlus,
            MyChart
        },
        methods: {
            go(v) {
                this.show_st = false;
                this.stock_num = v;
            },
            getStockData(value) {
                let str = '/sina1/list=';
                let str1 = '/gtimg/q=';
                if(value[0] === '3' || value[0] === '0') {
                    str += 'sz';
                    str1 += 'sz';
                } else if(value[0] === '6') {
                    str += 'sh';
                    str1 += 'sh';
                } else return;
                this.$http.get(str + value).then(v => {
                    this.stock_data = v.data.split('"')[1].split(',');
                });
                this.$http.get(str1 + value).then(v => {
                    console.log('tc:',v.data.split('~'));
                });
            }
        },
        watch: {
            show_st() {
                this.getStockData(this.stock_num);
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
        flex: 1;
        width: 33%;
        padding-top: 5px;
    }
    .stock-apply-info-head {
        font-size: 1.2em;
        font-weight: bold;
        padding-top: 0px;
    }
</style>
