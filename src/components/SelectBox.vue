<template>
    <div>
        <ul class="SelectBox">
            <li>
                <input type="checkbox" id="sdAll" @click="allSelect"/><label for="sdAll">全选</label>
            </li>
            <li v-for="item in selectData" :key="item.id">
                <input type="checkbox" :id="'sd' + item.num" @click="sdClick(item.num)"/><label :for="'sd' + item.num">{{ item.name }}</label>
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
                allState: 0
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
            sdClick(num) {
                if(!this.dataList.has(num)) {
                    this.dataList.add(num);
                } else {
                    if(this.allState === 1) {
                        document.getElementById('sdAll').checked = false;
                        this.allState = 0;
                    }
                    this.dataList.delete(num);
                }
            },
            allSelect() {
                if(!this.allState) {
                    this.allState = 1;
                    for(let item of this.selectData) {
                        if(!this.dataList.has(item.num)) {
                            this.dataList.add(item.num);
                            document.getElementById('sd' + item.num).checked = true;
                        }
                    }
                } else {
                    this.allState = 0;
                }
            }
        }
    }
</script>

<style scoped>
    .SelectBox {
        width: 100%;
        height: 100%;
        display: block;
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        border: 1px solid;
        border-radius: 5px;
        overflow: hidden;
        clear: both;
    }
    .SelectBox li {
        display: block;
        float: left;
        margin: 5px;
    }
</style>
