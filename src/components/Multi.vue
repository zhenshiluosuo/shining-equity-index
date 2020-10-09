<template>
    <div id="multi">
        <div id="m-select">
            <div style="overflow: hidden">
                <div style="float: left; margin: 10px;"><input type="text" id="m-search" v-model="search_info"/><button @click="add()" style="margin: 10px;">添加</button></div>
            </div>
            <div style="overflow: hidden">
                <div v-for="(item,index) in stocks" :key="index" style="float: left; margin: 5px;"><img :src="stock_link[index]" alt=""></div>
            </div>
        </div>
        <div id="m-show">

        </div>
    </div>
</template>
0
<script>
    export default {
        name: "Multi",
        data() {
            return {
                search_info: '',
                stocks: [],
                stock_name: [],
                stock_link: []
            }
        },
        created() {
        },
        methods: {
            add() {
                let jys = this.search_info.slice(0,1);
                jys = (jys === '0' || jys === '3') ? 'sz' : (jys === '6' ? 'sh' : '');
                if(jys.length) {
                    this.$http.get('/sina1/list='+ 'sh' + this.search_info).then(
                        v => {
                            console.log(v.data);
                            console.log(v.data.slice(21,-3));
                        }
                    );
                    if(jys !== '') {
                        this.stocks.push('sh' + this.search_info);
                        this.stock_link.push('http://image.sinajs.cn/newchart/min/n/' + jys + this.search_info + '.gif');
                    }
                } else {
                    alert('输入数据格式有误！')
                }
                this.search_info = '';
            }
        }
    }
</script>

<style scoped>
    #m-search {

    }
</style>