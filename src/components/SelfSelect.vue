<template>
    <div id="self-select">
        <div id="self-select-add">
            <div class="sp-div">
                <SearchPlus :do_value="do_value"></SearchPlus>
            </div>
        </div>
        <div id="m-show">
            <StocksTable :stock_datas="stockData" class="stock-table"></StocksTable>
        </div>
    </div>
</template>

<script>
    import SearchPlus from "./SearchPlus";
    import StocksTable from "./StocksTable";
    export default {
        name: "SelfSelect",
        data(){
            return {
                stockData: [{id:0, name:'浦发银行', num:'600000'}, {id:1, name:'白云机场', num:'600004'}, {id:2, name:'东风汽车', num:'600006'}],
                do_value: '查询'
            }
        },
        components: {
            SearchPlus,
            StocksTable
        }
    }
</script>

<style scoped>
    .sp-div {
        height: 100%;
    }
    #self-select-add {
        height: 5%;
    }
    #m-show {
        height: 95%;
    }
    .stock-table {
        height: 100%;
    }
</style>
