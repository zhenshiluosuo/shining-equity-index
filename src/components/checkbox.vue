<template>
    <div class="check-boxs"
         :class="{'column':isColumn}">
        <div v-for="(item,index) in items"
             :key=index
             class="check-box"
             :class="{'width100':isColumn}"
             @click="checkBox(index)"
             v-show="!item.isShow">
      <span :class="{'checkbox-icon':true,'checkbox-input':item.isChecked,'opacity':opacity&&item.isChecked}"
            :style="item.isChecked?propsStyle:''">
        <i :class="{'checkbox-on':item.isChecked}"></i>
      </span>
            <input type="checkbox"
                   :value="item.value">
            <span v-html="item.name"></span>
        </div>
    </div>
</template>

<script>
    export default {
        name: "checkbox",
        data() {
            return {
                propsStyle: {
                    border: "1px solid " + this.color,
                    background: this.color
                }
            };
        },
        props: {
            /**
             items实例:[{name:'选项一',isChecked:false}],
             name：可以是html，
             需要显示和隐藏的加上isShow字段，true为隐藏，如下：
             [{name:'选项一',isChecked:false,isShow:false}]
             */
            items: {
                type: Array,
                default: function() {
                    return [];
                }
            },
            // 已选框的颜色透明度
            opacity: {
                type: Boolean,
                default: false
            },
            // flex布局纵轴方向
            isColumn: {
                type: Boolean,
                default: false
            },
            // 最大选项数
            limit: {
                type: Number,
                default: 2
            },
            // 已选项框的背景色
            color: {
                type: String,
                default: "#65aef7"
            }
        },
        watch: {
            color(newval, oldval) {
                if (newval !== oldval) {
                    console.log('hi~')
                }
            }
        },

        methods: {
            checkBox(index) {
                let count = 0;
                for (let i = 0; i < this.items.length; i++) {
                    if (this.items[i].isChecked == true) {
                        count++;
                    }
                }
                if (count >= this.limit && !this.items[index].isChecked) {
                    this.$emit("canNotAdd", false);
                    return;
                }
                // 将所选项的value值传出去，并勾选
                /* 也可将这句代码放在父组件调用这个事件的地方，可以使得复选框智能在特定条件下被选中*/
                this.$set(this.items[index], "isChecked", !this.items[index].isChecked);
                // this.items[index].isChecked = !this.items[index].isChecked;
                this.$emit("checkBox", index);
            }
        }
    };
</script>

<style scoped>
    .check-boxs {
        display: flex;
        display: -webkit-flex;
        justify-content: space-between;
        align-items: center;
        margin: 5px 0;
        color: #545454;
        font-size: 12px;
    }
    .column {
        flex-direction: column;
        justify-content: flex-start;
    }
    .width100 {
        width: 100%;
        display: flex;
        display: -webkit-flex;
        justify-content: space-between;
        height: 24px;
        align-items: flex-start;
        padding-right: 40px;
        box-sizing: border-box;
    }
    .check-box {
        position: relative;
        cursor: pointer;
    }

    .check-box input {
        vertical-align: middle;
        margin-top: -2px;
        margin-bottom: 1px;
        /* 前面三行代码是为了让checkbox按钮与文字对齐 */
        width: 12px;
        height: 12px;
        appearance: none; /*清楚默认样式*/
        -webkit-appearance: none;
        opacity: 0;
        outline: none;
        cursor: pointer;
        /* 注意不能设置为display:none*/
    }
    /* 选项框的样式修改 */
    .checkbox-icon {
        width: 12px;
        height: 12px;
        position: absolute;
        top: 1px;
        z-index: 0;
        border-radius: 2px;
        background-color: #fff;
        border: 1px solid #c9c9c9;
        box-shadow: 0px 2px 5px 0px rgba(0, 0, 0, 0.15);
        cursor: pointer;
    }
    .checkbox-input {
        border: 1px solid #65aef7;
        background-color: #65aef7;
    }
    .opacity {
        opacity: 0.5;
    }
    .checkbox-on {
        position: absolute;
        left: 4px;
        top: 1px;
        width: 3px;
        height: 7px;
        border-right: 2px solid #fff;
        border-bottom: 2px solid #fff;
        transform: rotate(45deg);
    }
</style>
