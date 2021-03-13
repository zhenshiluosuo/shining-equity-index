<template>
    <div id="header">
        <div id="header-link" ref="toMainPage"><span style="font-size: 2em;">加入我们，聪明的投资人都在这里</span></div>
        <div id="header-info" style="clear: both;">
            <div style="width: 25%; float: left; height: 100%;"></div>
            <News style="width: 50%; float: left; height: 5.4em; background: #000000;"></News>
            <div style="width: 10%; float: left; height: 100%;"></div>
            <Weather style="width: 15%; float: left; height: 100%;"></Weather>
        </div>
    </div>
</template>

<script>
    import Weather from "./Weather";
    import News from "@/components/News";
    export default {
        name: "Header",
        data() {
            return {
                // news_type: [],
                // news_info: []
            }
        },
        created() {
            // this.$http.get('/local/newstype').then(v => {
            //   this.$http.get('/local/newsinfo').then(_v => {
            //     this.news_type = v.data;
            //     this.news_info = _v.data;
            //   });
            // });
        },
        mounted() {
            this.$refs.toMainPage.onclick = () => {
                this.$router.push({ name: 'Dashboard'});
            }
        },
        components: {
            Weather,
            News
        }
    }
</script>

<style scoped>
    #header {
        width: 100%;
        height: 10%;
        background: #2b303b;
        color: white;
        display: flex;
        flex-direction: row;
        justify-content: center; /* 水平居中 */
        align-items: center;     /* 垂直居中 */
    }
    #header-link {
        flex: 3;
        cursor: pointer;
    }
    #header-info {
        flex: 7;
        height: 100%;
    }
</style>
