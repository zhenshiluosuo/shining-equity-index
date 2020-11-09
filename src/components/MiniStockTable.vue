<template>
    <div class="mini-stock-table">
        <div class="mini-stock-table-cell">
            <span>股票代码</span>
            <span>股票名称</span>
            <span>当前价格</span>
            <span>涨跌</span>
            <span>涨跌%</span>
            <span>成交量</span>
        </div>
        <div v-for="item in stock_data_list" :key="item[2]" class="mini-stock-table-cell">
            <span>{{item[2]}}</span>
            <span>{{item[1]}}</span>
            <span>{{item[3]}}</span>
            <span>{{item[31]}}</span>
            <span>{{item[32] + '%'}}</span>
            <span>{{item[6]}}</span>
        </div>
    </div>
</template>

<script>
    export default {
        name: "MiniStockTable",
        props:[
            'stock_data_list'
        ]
    }
</script>

<style scoped>
    .mini-stock-table {
        width: 100%;
        height: 100%;
        box-sizing: border-box;
        border: 1px solid #000000;
    }
    .mini-stock-table-cell {
        width: 100%;
        height: 1.5em;
        display: flex;
    }
    .mini-stock-table-cell span {
        width: 100%;
        flex: 1;
    }
</style>
