<template>
    <div id="national-info">
        <div id="national-info-imgs">
            <div class="national-info-img" ref="img1"></div>
            <div class="national-info-img" ref="img2"></div>
            <div class="national-info-img" ref="img3"></div>
        </div>
        <div id="national-info-tables">
            <MiniStockTable :stock_data_list="stock_list1" class="national-info-table"></MiniStockTable>
            <MiniStockTable :stock_data_list="stock_list2" class="national-info-table"></MiniStockTable>
            <MiniStockTable :stock_data_list="stock_list3" class="national-info-table"></MiniStockTable>
        </div>
    </div>
</template>

<script>
    import MiniStockTable from "./MiniStockTable";
    export default {
        name: "NationalInfo",
        data() {
            return {
                stock_list1: [],
                stock_list2: [],
                stock_list3: []
            }
        },
        components: {
            MiniStockTable
        },
        created() {
            let promises = [[], [], []];
            for(let i = 0; i <= 30; i++) {
                let str1 = '60', str2 = '00', str3 = '30', num = '' + i;
                while(num.length < 4) {
                    num = '0' + num;
                }
                promises[0].push(this.$http.get('/gtimg/q=sh' + str1 + num));
                promises[1].push(this.$http.get('/gtimg/q=sz' + str2 + num));
                promises[2].push(this.$http.get('/gtimg/q=sz' + str3 + num));
            }
            Promise.all(promises[0]).then(v => {
                for(let i = 0; i < v.length; i++) {
                    let temp = v[i].data.split('~');
                    if(temp.length > 1 && temp[3] !== '0.00') {
                        this.stock_list1.push(temp);
                    }
                }
                this.stock_list1 = this.stock_list1.slice(0, 21);
                Promise.all(promises[1]).then(v => {
                    for(let i = 0; i < v.length; i++) {
                        let temp = v[i].data.split('~');
                        if(temp.length > 1 && temp[3] !== '0.00') {
                            this.stock_list2.push(temp);
                        }
                    }
                    this.stock_list2 = this.stock_list2.slice(0, 21);
                    Promise.all(promises[2]).then(v => {
                        for(let i = 0; i < v.length; i++) {
                            let temp = v[i].data.split('~');
                            if(temp.length > 1 && temp[3] !== '0.00') {
                                this.stock_list3.push(temp);
                            }
                        }
                        this.stock_list3 = this.stock_list3.slice(0, 21);
                    });
                });
            });
        },
        updated() {
            this.$refs.img1.style.backgroundImage = 'url(' + 'http://image.sinajs.cn/newchart/min/n/sh000001.gif' +')';
            this.$refs.img2.style.backgroundImage = 'url(' + 'http://image.sinajs.cn/newchart/min/n/sz399001.gif' +')';
            this.$refs.img3.style.backgroundImage = 'url(' + 'http://image.sinajs.cn/newchart/min/n/sz399006.gif' +')';
        },
        methods: {

        }
    }
</script>

<style scoped>
    #national-info {
        width: 100%;
        height: 100%;
    }
    #national-info-imgs {
        width: 100%;
        height: 35%;
        display: flex;
    }
    .national-info-img {
        flex: 1;
        background-repeat: no-repeat;
        background-size: 100% 100%;
    }
    #national-info-tables {
        width: 100%;
        height: 65%;
        clear: both;
    }
    .national-info-table {
        width: 33.33%;
        height: 100%;
        position: relative;
        float: left;
    }
</style>
