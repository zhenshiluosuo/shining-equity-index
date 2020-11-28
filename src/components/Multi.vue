<template>
  <div id="multi">
    <div id="m-select">
      <SearchPlus  :do_value="do_value"  @searchPlus-emit="add" style="width: 30%; height: 100%; position: relative; float: left;"></SearchPlus>
      <SelectBox style="margin: 0 1%; width: 60%; height: 100%; position: relative; float: left;"></SelectBox>
      <!--            <select v-model="selected"  @change="getStyle()">-->
      <!--              <option v-for="item in items" :key="item.value" >{{item.value}}</option>-->
      <!--            </select>-->
      <div @mouseover="windowSelected=true" @mouseleave="windowSelected=false" class="windowNumber">
        <span>窗口最大数量:{{selected}}</span>
        <ul v-show="windowSelected">
          <li>
            <button @click="getStyle(4)">4</button>
          </li>
          <li>
            <button @click="getStyle(6)">6</button>
          </li>
          <li>
            <button @click="getStyle(12)">12</button>
          </li>
        </ul>
      </div>
    </div>
    <transition-group class="container" tag="div" id="m-show">
      <div  v-for="item in this.stock_link" :key="item" :class="showCell" draggable="true"
            @dragstart="handleDragStart($event, item)"
            @dragover.prevent="handleDragOver($event, item)"
            @drop="handleDrop($event, item)"
            @dragend="handleDragEnd($event, item)" >
        <img :src="item" width="100%" height="100%">
      </div>
    </transition-group>
  </div>
</template>
0
<script>
import SearchPlus from "./SearchPlus";
import SelectBox from "./SelectBox";
export default {
  name: "Multi",
  data() {
    return {
      stocks: [],
      stock_name: [],
      stock_link: [],
      do_value: '添加',
      dragging: null,
      items:[{text:'4',value:4},{text:'6',value:6},{text:'8',value:8}],
      selected:4,
      total:0,
      showCell:'show-cell1',
      windowSelected:false
    }
  },
  components: {
    SearchPlus,
    SelectBox
  },
  created() {
  },
  methods: {
    getStyle(value){
      this.windowSelected=false;
      console.log(typeof value,value)
      if(value===this.selected)
        return ;
      this.selected=value;
      console.log(typeof this.selected,this.selected)
      switch (this.selected) {
        case 4:
          this.showCell='show-cell1';
          this.stock_link.splice(this.selected,this.total-this.selected)
          this.total=this.stock_link.length
          console.log(this.stock_link)
          break;
        case 6:
          this.showCell='show-cell2';
          this.stock_link.splice(this.selected,this.total-this.selected)
          this.total=this.stock_link.length
          console.log(this.stock_link)
          break;
        case 12:
          this.showCell='show-cell3';
          break;
        default:
          break;
      }
      console.log(this.showCell)
    },
    count(){
      this.total++;
    },
    handleDragStart(e,item){
      this.dragging = item;
    },
    handleDragEnd(){
      this.dragging = null
    },
    //首先把div变成可以放置的元素，即重写dragenter/dragover
    handleDragOver(e) {
      e.dataTransfer.dropEffect = 'move'// e.dataTransfer.dropEffect="move";//在dragenter中针对放置目标来设置!
    },
    handleDrop(e,item){
      e.dataTransfer.effectAllowed = "move"//为需要移动的元素设置dragstart事件
      if(item === this.dragging){
        return
      }
      const newItems = [...this.stock_link]
      console.log(newItems)
      const src = newItems.indexOf(this.dragging)
      const dst = newItems.indexOf(item)

      // newItems.splice(dst, 0, ...newItems.splice(src, 1))
      const temp=newItems[dst]
      newItems[dst]=newItems[src]
      newItems[src]=temp

      this.stock_link = newItems
    },
    // handleDragEnter(e,item){
    //   e.dataTransfer.effectAllowed = "move"//为需要移动的元素设置dragstart事件
    //   if(item === this.dragging){
    //     return
    //   }
    //   const newItems = [...this.stock_link]
    //   console.log(newItems)
    //   const src = newItems.indexOf(this.dragging)
    //   const dst = newItems.indexOf(item)
    //
    //   // newItems.splice(dst, 0, ...newItems.splice(src, 1))
    //   const temp=newItems[dst]
    //   newItems[dst]=newItems[src]
    //   newItems[src]=temp
    //
    //   this.stock_link = newItems
    // },
    add(v) {
      if(this.total>=this.selected){
        alert(`窗口数已达到上限:${this.total}，请在下拉框种修改最大窗口数！`);
        return ;
      }
      this.total++;
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
          console.log(this.stock_link)
        }
      } else {
        alert('输入数据格式有误！')
      }
    }
  }
}
</script>

<style scoped>
select{
  position: absolute;
  right: 0;
}
#m-select {
  width: 100%;
  height: 5%;
  clear: both;
}
.container {
  width: 1400px;
  height: 500px;
  display:flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content:space-between;
  overflow: hidden;
}
.show-cell1 {
  height: 48%;
  margin: 15px 100px 0 100px;
  flex-basis:32%;
  flex-grow:0;
  flex-shrink:1;

}
.show-cell2 {
  height: 48%;
  flex-basis:32%;
  flex-grow:0;
  flex-shrink:1;
  margin: 5px;
}
.show-cell3 {
  height: 31%;
  flex-basis:21.5%;
  flex-grow:0;
  flex-shrink:1;
  margin: 5px;
}
div.windowNumber {
  height: inherit;
  cursor:pointer;
  position: absolute;
  right: 3px;
}
div.windowNumber > span{
  padding-left: 7px;
  padding-right: 7px;
  font-family: 华文行楷;
  color: white;
  background-color: black;
  border: 1px solid;
  border-radius: 10px;
}
div.windowNumber ul{
  margin: 0;
  padding: 0;
}
div.windowNumber li{
  border: 1px solid;
  border-radius: 10px;
}
div.windowNumber button{
  cursor:pointer;
  width: 100%;
}


</style>
