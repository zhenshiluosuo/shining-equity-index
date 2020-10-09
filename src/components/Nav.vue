<template>
    <div class="nav">
        <ul class="nav-ul">
            <li class="nav-li"><router-link to="/" class="router-link"><span>全景概况&#12288;></span></router-link></li>
            <li class="nav-li"><span>国内行情&#12288;></span></li>
            <li class="nav-li"><span>国际行情&#12288;></span></li>
            <li class="nav-li"><span>黄金市场&#12288;></span></li>
            <li class="nav-li"><span>个股诊断&#12288;></span></li>
            <li class="nav-li"><router-link to="SelfSelect" class="router-link"><span>我的自选&#12288;></span></router-link></li>
            <li class="nav-li"><router-link to="Multi" class="router-link"><span>多股同屏&#12288;></span></router-link></li>
            <li class="nav-li"><router-link to="" class="router-link"><span>直播讨论&#12288;></span></router-link></li>
            <li class="nav-li" style="font-size: 16px"><span>使用须知&#12288;></span></li>
            <li class="nav-li" style="font-size: 16px"><span>联系我们&#12288;></span></li>
        </ul>
    </div>
</template>

<script>
    export default {
        name: "Nav"
    }
</script>

<style scoped>
    .nav {
        flex: 1;
        height: 100%;
        background: #ddd;
        border-right: 1px solid black;
        box-sizing: border-box;
    }
    .nav-ul {
        margin: 0;
        padding: 10px;
        position: relative;
        width: 100%;
    }
    .nav-li {
        width: 100%;
        font-size: 20px;
    }
    .nav-li:hover {
        background: #00a4ff;
        color: white;
    }
    .nav-li span {
        display: block;
        padding: 10px;
    }
    .router-link {
        text-decoration: none;
        color: #000000;
    }
</style>