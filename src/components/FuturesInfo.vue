<template>
    <div id="futures-info">
        <FuturesChart class="futures-chart"></FuturesChart>
    </div>
</template>

<script>
    import FuturesChart from "./FuturesChart";
    export default {
        name: "FuturesInfo",
        components: {
            FuturesChart
        }
    }
</script>

<style scoped>
    #futures-info {
        width: 100%;
        height: 100%;
    }
    .futures-chart {
        width: 100%;
        height: 100%;
    }
</style>
