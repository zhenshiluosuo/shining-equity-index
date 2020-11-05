<template>
    <div id="footer">
        <div class="box" style="flex: 3; font-size: 10px;"><span>X公网安备 110000020000xx号<br>Copyright © 2020 XXXX All Rights Reserved. XX公司版权所有</span></div>
        <div class="box" v-for="(info, index) in info_list" :key="index"><p v-bind:class="{ red : info_color_list[index] === 0, green : info_color_list[index] === 2 }">{{info}}</p></div>
    </div>
</template>

<script>
    export default {
        name: "Footer",
        data() {
            return {
                info_list: [],
                info_color_list: []
            }
        },
        created() {
            Promise.all([
                this.$http.get('/sina1/list=sh000001'),
                this.$http.get('/sina1/list=sz399001'),
                this.$http.get('/sina1/list=sz399006'),
                this.$http.get('/sina1/list=sz399005'),
                this.$http.get('/sina1/list=int_nasdaq'),
                this.$http.get('/sina1/list=int_dji')
            ]).then(
                v => {
                    v.forEach(info => {
                        //今日开盘价、昨日收盘价、当前价格
                        this.info_list.push(info.data.split(','));
                        this.info_list[this.info_list.length - 1][0] = this.info_list[this.info_list.length - 1][0].split('"')[1];
                    });
                    for(let i = 0; i < 4; i++) {
                        let now = parseFloat(this.info_list[i][3]).toFixed(2), cha = (this.info_list[i][3] - this.info_list[i][2]).toFixed(2);
                        this.info_list[i] = this.info_list[i][0] + ' ' + now + ' ' + cha + ' ' + (cha / now * 100).toFixed(2) + '%';
                        this.info_color_list[i] = cha > 0 ? 0 : (cha === 0 ? 1 : 2);
                    }
                    for(let i = 4; i < 6; i++) {
                        this.info_color_list[i] = parseFloat(this.info_list[i]) > 0 ? 0 : (parseFloat(this.info_list[i]) === 0 ? 1 : 2);
                        this.info_list[i] = this.info_list[i].join(' ').slice(0, -3) + '%';
                    }
                    console.log(this.info_list, this.info_color_list);
                }
            ).catch(e => {
                console.err(e);
                }
            );


        }
    }
</script>

<style scoped>
    #footer {
        height: 5%;
        background: #000000;
        flex: 1 1 auto;
        flex-direction: row;
        display: flex;
        border-top: 1px solid #c9c9c9;
    }
    .box {
        box-sizing: border-box;
        flex: 2;
        color: white;
        font-size: 14px;
        vertical-align:middle;
        font-weight: bold;
    }
    .red {
        color: red;
    }
    .green {
        color: green;
    }
    span {
        display: block;
        vertical-align: middle;
        text-align: center;
        width: 100%;
        height: 90%;
        padding-top: 2%;
    }
</style>
