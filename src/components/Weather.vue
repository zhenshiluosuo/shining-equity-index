<template>
    <div style="width: 100%; height: 100%; box-sizing: border-box; padding: 2px;">
        <div class="weather-info">
            <div style="flex: 2; height: 100%;">
                <img :src="imgurl" class="weather-info-img" ref="weatherInfoImg">
            </div>
            <div style="flex: 3; height: 100%; display: flex; align-items: center; justify-content: center; flex-direction: column;">
                <div>{{weather_data.province + ' ' + weather_data.city}}</div>
                <div>{{weather_data.weather + ' ' + weather_data.temperature + '°C'}}</div>
            </div>
        </div>
        <div class="weather-time" ref="weatherTime"></div>
    </div>
</template>

<script>
    export default {
        name: "Weather",
        data() {
            return {
                ip_data: null,
                weather_data: null,
                imgurl:''
            }
        },
        created() {
            this.getIp();
        },
        updated() {
            setInterval(() => {this.$refs.weatherTime.innerHTML=new Date().toLocaleString()}, 1000);
        },
        methods: {
            getIp() {
                this.$http.get('/sohu/cityjson').then(v => {
                    let temp = v.data;
                    temp = temp.slice(temp.indexOf('{'), -1);
                    temp = JSON.parse(temp);
                    this.ip_data = temp;
                    this.getWeather();
                });
            },
            getWeather() {
                this.$http.get('/gd/ip?key=a79727da8c4617197b2d32b44e8aada4&ip=' + this.ip_data.cip).then(v => {
                    this.$http.get('/gd//weather/weatherInfo?key=a79727da8c4617197b2d32b44e8aada4&city=' + v.data.adcode).then(v => {
                        this.weather_data = v.data.lives[0];
                        this.setImgUrl()
                    });
                });
            },
            setImgUrl(){
                const weather=this.weather_data.weather;
                console.log(weather.indexOf('晴'));
                if (weather.indexOf('晴')!==-1)
                    this.imgurl = require('../assets/weather_icon_400/icon__0d.png');
                else if(weather.indexOf('云')!==-1||weather.indexOf('阴')!==-1)
                    this.imgurl = require('../assets/weather_icon_400/icon__2.png');
                else if(weather.indexOf('雨')!==-1)
                    this.imgurl = require('../assets/weather_icon_400/icon__9.png');
                else if(weather.indexOf('雪')!==-1)
                    this.imgurl = require('../assets/weather_icon_400/icon__17.png');
                else if(weather.indexOf('沙')!==-1)
                    this.imgurl = require('../assets/weather_icon_400/icon__20.png');
                else
                    this.imgurl = require('../assets/weather_icon_400/icon__32.png');
                console.log(this.imgurl);
            }
        },

    }
</script>

<style scoped>
    .weather-info {
        height: 75%;
        width: 100%;
        position: relative;
        display: flex;
        border: 1px solid #c9c9c9;
        padding: 0 1em;
        box-sizing: border-box;
    }
    .weather-time {
        height: 25%;
        width: 100%;
    }
    .weather-info-img {
        width: 100%;
        display: block;
    }
</style>
