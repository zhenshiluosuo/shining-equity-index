<template>
    <div id="multi">
        <div id="m-select">
            <SearchPlus :do_value="do_value" @searchPlus-emit="add"></SearchPlus>
        </div>
        <div id="m-show">
            <div v-for="item in this.stock_link" :key="item" class="show-cell">
                <img :src="item" >
            </div>
        </div>
    </div>
</template>
0
<script>
    import SearchPlus from "./SearchPlus";
    export default {
        name: "Multi",
        data() {
            return {
                stocks: [],
                stock_name: [],
                stock_link: [],
                do_value: '添加'
            }
        },
        components: {
            SearchPlus
        },
        created() {
        },
        methods: {
            add(v) {
                for(let item of this.stocks) {
                    if(item === v) return;
                }

                let jys = v.slice(0,1);
                jys = (jys === '0' || jys === '3') ? 'sz' : (jys === '6' ? 'sh' : '');
                if(jys.length) {
                    this.$http.get('/sina1/list='+ 'sh' + v).then(
                        v => {
                            console.log(v.data);
                            console.log(v.data.slice(21,-3));
                        }
                    );
                    if(jys !== '') {
                        this.stocks.push(v);
                        this.stock_link.push('http://image.sinajs.cn/newchart/min/n/' + jys + v + '.gif');
                    }
                } else {
                    alert('输入数据格式有误！')
                }
            }
        }
    }
</script>

<style scoped>
    #m-search {

    }
    .show-cell {
        float: left;
        width: 545px;
        height: 300px;
    }
</style>
