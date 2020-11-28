<template>
  <div class="sp-div">
    <input class="sp-input" type="text" v-model="value" @keyup.enter="emitToFather()" placeholder="Enter something..." />
    <button class="sp-btn" @click="emitToFather()">{{ do_value }}</button>
    <div class="sp-show" v-show="sp_show === true">
      <ul>
        <li v-for="item in show_data" :key="item.id" @click="add(item.value)">{{item.value + ' - ' + item.info[0]}}</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "SearchPlus",
  data() {
    return {
      sp_show: false,
      value: '',
      show_data: null
    }
  },
  props: [
    'do_value',

  ],
  methods: {
    count(){
      this.total++;
    },
    dream(value) {
      let str = value;
      console.log('dream:', value);
      if(str.length < 7 && (str[0] === '6' || str[0] === '0' || str[0] === '3')) {
        let promises = [], url = '/sina1/list=';
        if(str[0] === '6') {
          url += 'sh';
        } else {
          url += 'sz';
        }
        if(str.length < 6) {
          if(str.length === 2 && str[1] === '8') {
            str += '8';
          }
          for(;str.length < 5;) {
            str = str + '0';
          }
          for(let i = 0; i < 10; i++) {
            promises.push(this.$http.get(url + str + i));
          }
        } else if(str.length === 6) {
          promises.push(this.$http.get(url + str));
        }

        Promise.allSettled(promises).then(v => {
          this.show_data = [];
          let step = -1;
          console.log(v);
          for(let item of v) {
            let res = item.value.data;
            res = res.split('"')[1];
            step++;
            if(res === '') {
              continue;
            }
            res = res.split(',');

            this.show_data.push({
              id: step,
              value: str + step,
              info: res
            });
            if(v.length === 1) {
              this.show_data[0].value = str;
            }
          }
          if(!this.show_data.length) {
            this.show_data.push({id:0, value: '未找到结果'});
          }
        });
      } else {
        this.show_data = [];
        this.show_data.push({id:0, value: '未找到结果'});
      }
    },
    add(value) {
      this.value = value;
      this.show_data = [];
      this.sp_show = false;
    },
    emitToFather() {

      this.$emit('searchPlus-emit', this.value);

    }
  },
  watch: {
    value() {
      if(this.value.length > 0) {
        this.sp_show = true;
        this.dream(this.value);
      } else {
        this.sp_show = false;
      }
    }
  }
}
</script>

<style scoped>
.sp-div {
  text-align:left;
  position: relative;
}
.sp-input {
  display: inline-block;
  width: 80%;
  border: 1px solid #dcdee2;
  border-radius: 5px;
  padding: 4px 7px;
  height: 100%;
  box-sizing: border-box;
}
.sp-btn {
  display: inline-block;
  box-sizing: border-box;
  background-color: #eeeeee;
  height: 100%;
  width: 20%;
  border: 1px solid #dcdee2;
  vertical-align: middle;
  text-align: center;
  font-size: 100%;
  line-height: 100%;
  font-weight: bold;
  cursor: pointer;
}
.sp-show {
  position: absolute;
  width: 80%;
  height: auto;
  top: 38px;
  border-radius: 0 0 10px 10px;
  border: 1px solid #dcdee2;
  border-top: 0!important;
  box-shadow: none;
  overflow: visible;
  font-family: 'Microsoft YaHei',Arial,sans-serif;
  z-index: 1;
  background: white;
  box-sizing: border-box;
}
.sp-show ul {
  margin: 0;
  padding: 0;
}
.sp-show ul li {
  padding:3px 0 3px 30px;
  text-align: left;
}
.sp-show ul li:hover {
  color: blue;
  cursor: pointer;
}
</style>
