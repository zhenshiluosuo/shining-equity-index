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
                stockData: [],
                do_value: '查询'
            }
        },
        created() {
            let temps = window.localStorage.stocks.split('|');
            temps.forEach(v => {
                console.log(v);
                this.stockData.push(JSON.parse(v));
            });
            console.log(this.stockData);
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
