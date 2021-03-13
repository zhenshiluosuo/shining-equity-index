<template>
    <div style="box-sizing: border-box; padding: 3px; border: 1px solid;">
        <div class="SelectBoxCell" style="border: 0; color: #787b86; font-weight: bold;">
          <span class="SelectBoxCellSpan">代码</span>
          <span class="SelectBoxCellSpan">当前价格</span>
          <span class="SelectBoxCellSpan">涨跌</span>
          <span class="SelectBoxCellSpan">涨跌%</span>
        </div>
        <ul class="SelectBox">
            <li v-for="item in selectData" :key="item.id" class="SelectBoxCell" :class="{'red': parseFloat(item[2]) > 0, 'blue': parseFloat(item[2]) < 0, 'active': boxFlag === item[0]}" @click="cellClick(item[0])">
                <span class="SelectBoxCellSpan" style="color: #000000;">{{item[0]}}</span>
                <span class="SelectBoxCellSpan">{{item[1]}}</span>
                <span class="SelectBoxCellSpan">{{item[2]}}</span>
                <span class="SelectBoxCellSpan">{{item[3]}}</span>
            </li>
        </ul>
    </div>
</template>

<script>
    export default {
        name: "SelectBox",
        data() {
            return {
                dataList: null,
                boxFlag: -1
            }
        },
        props: ['selectData'],
        created() {
            this.dataList = new Set();
        },
        mounted() {
            console.log(this.selectData);
        },
        methods: {
            cellClick(value) {
                this.boxFlag = value;
                this.$emit('cellClick', value);
            }
        }
    }
</script>

<style scoped>
    .SelectBox {
        width: 100%;
        height: calc(100% - 2em);
        display: block;
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        overflow: hidden;
        clear: both;
        overflow-y: scroll;
        background: #ffffff;
        border: 1px solid #f0f3fa;
        scrollbar-width: none; /* firefox */
        -ms-overflow-style: none; /* IE 10+ */
        moz-user-select: -moz-none;
        -moz-user-select: none;
        -o-user-select:none;
        -khtml-user-select:none;
        -webkit-user-select:none;
        -ms-user-select:none;
        user-select:none;
    }
    .SelectBox::-webkit-scrollbar {
      display: none; /* Chrome Safari */
    }
    .SelectBoxCell {
        width: 100%;
        height: 2em;
        display: flex;
        border-top: 1px solid #f0f3fa;
        border-bottom: 1px solid #f0f3fa;
        justify-content: center;
        align-items: center;
    }
    .SelectBoxCellSpan {
        flex: 1;
    }
    .red {
        color: #f44336;
    }
    .blue {
        color: #26a69a;
    }
    .active {
        box-sizing: border-box;
        border: 1px solid #2196f3;
    }
    .SelectBox > .SelectBoxCell:hover {
        background: #dddddd;
    }
</style>
