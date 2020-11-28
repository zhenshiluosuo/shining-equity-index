<template>
    <div class="stockTable">
        <ul class="stockTable-ul">
            <li class="stockTable-li" style="border-bottom: 1px solid #ffffff">
                <span class="stockTable-span">代码</span>
                <span class="stockTable-span">名称</span>
                <span class="stockTable-span">当前价格</span>
                <span class="stockTable-span">涨幅%</span>
                <span class="stockTable-span">涨跌</span>
                <span class="stockTable-span">今日开盘</span>
                <span class="stockTable-span">昨日收盘</span>
                <span class="stockTable-span">今日最高</span>
                <span class="stockTable-span">今日最低</span>
                <span class="stockTable-span" style="flex: 5;">成交数</span>
                <span class="stockTable-span" style="flex: 5;">成交金额</span>
                <span class="stockTable-span">买一申报</span>
                <span class="stockTable-span">买一报价</span>
                <span class="stockTable-span">卖一申报</span>
                <span class="stockTable-span">卖一报价</span>
            </li>
            <li v-for="item in stock_info" :key="item[4]" class="stockTable-li" @mousemove="st_moveOver(item[0])" @mouseout="st_moveOut()" @click="jump(item[0])">
                <span class="stockTable-span">{{ item[0] }}</span>
                <span class="stockTable-span" style="color: gold;">{{ item[1] }}</span>
                <span class="stockTable-span" :class="{ 'color-red': parseFloat(item[4]) -  parseFloat(item[3]) > 0, 'color-green': parseFloat(item[4]) -  parseFloat(item[3]) < 0 }">
                    {{ item[4] }}
                </span>
                <span class="stockTable-span" :class="{ 'color-red': parseFloat(item[4]) -  parseFloat(item[3]) > 0, 'color-green': parseFloat(item[4]) -  parseFloat(item[3]) < 0 }">
                    {{((parseFloat(item[4]) -  parseFloat(item[3])) / item[3] * 100).toFixed(2) + '%' }}
                </span>
                <span class="stockTable-span" :class="{ 'color-red': parseFloat(item[4]) -  parseFloat(item[3]) > 0, 'color-green': parseFloat(item[4]) -  parseFloat(item[3]) < 0 }">
                    {{ (parseFloat(item[4]) -  parseFloat(item[3])).toFixed(2) }}
                </span>
                <span class="stockTable-span">{{ item[2] }}</span>
                <span class="stockTable-span">{{ item[3] }}</span>
                <span class="stockTable-span">{{ item[5] }}</span>
                <span class="stockTable-span">{{ item[8] }}</span>
                <span class="stockTable-span" style="flex: 5; color: #00BFFF;">{{ item[9] }}</span>
                <span class="stockTable-span" style="flex: 5; color: #1E90FF;">{{ item[10] }}</span>
                <span class="stockTable-span" style="color: #c9c9c9;">{{ item[11] }}</span>
                <span class="stockTable-span" style="color: #c9c9c9;">{{ item[12] }}</span>
                <span class="stockTable-span" style="color: #c9c9c9;">{{ item[21] }}</span>
                <span class="stockTable-span" style="color: #c9c9c9;">{{ item[22] }}</span>
            </li>
        </ul>
        <div class="stockTable-g" v-show="show_flag"><img :src="img_src" alt=""></div>
    </div>
</template>

<script>
    export default {
        name: "StocksTable",
        data() {
            return {
                stock_info: [],
                searchInterval: null,
                img_src: '',
                show_flag: false,
                showInterval: null
            }
        },
        props: [
            'stock_datas'
        ],
        created() { //优化vue2数组更新视图
            this.searchInfo(this.stock_info);
            this.searchInterval = setInterval(() => {
                this.searchInfo(this.stock_info, 1);
            }, 1000);
        },
        methods: {
            searchInfo(list, type = 0) {
                let promises = []
                for(let item of this.stock_datas) {
                    let value = item.num;
                    let str = '/sina1/list=';
                    if(value[0] === '3' || value[0] === '0') {
                        str += 'sz';
                    } else if(value[0] === '6') {
                        str += 'sh';
                    } else return;

                    str += value;
                    promises.push(this.$http.get(str));
                }
                Promise.all(promises).then(v => {
                    let i = 0;
                    for(let item of v) {
                        if(!type) {
                            list.push([this.stock_datas[i++].num, ...item.data.split('"')[1].split(',')]);
                        } else {
                            this.$set(list, i, [this.stock_datas[i++].num, ...item.data.split('"')[1].split(',')]);
                        }
                    }
                });
            },
            st_moveOver(v) { //节流
                if(!this.showInterval) {
                    let str = 'https://image.sinajs.cn/newchart/min/n/';
                    if(v[0] === '3' || v[0] === '0') {
                        str += 'sz' + v + '.gif';
                    } else if(v[0] === '6') {
                        str += 'sh' + v + '.gif';
                    } else return;
                    this.show_flag = true;
                    this.img_src = str;
                    this.showInterval = setTimeout(() => {
                        this.showInterval = null;
                    }, 300);
                }
            },
            st_moveOut() {
                this.show_flag = false;
            },
            jump(v) {
                this.$router.push({
                    path:'/IndividualStock',
                    query:{
                        num: v
                    }
                });
            }
        }

    }
</script>

<style scoped>
    .stockTable-ul {
        margin: 0;
        padding: 0;
        border: 0;
        width: 100%;
        height: 100%;
        background-color: #000000;
        color: #ffffff;
    }
    .stockTable-li {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
        border: 0;
        width: 100%;
        display: flex;
        flex-direction: row;
        cursor: pointer;
    }
    .stockTable-li:hover {
        border-bottom: 1px solid white;
    }
    .stockTable-span {
        display: inline-block;
        height: 28px;
        padding: 3px;
        box-sizing: border-box;
        font-size: 20px;
        flex: 3;
    }
    .color-red {
        color: #FF0000;
    }
    .color-green {
        color: #00FF00;
    }
    .stockTable-g {
        position: fixed;
        background-color: white;
        bottom: 50px;
        right: 50px;
        width: 545px;
        height: 300px;
    }
</style>
