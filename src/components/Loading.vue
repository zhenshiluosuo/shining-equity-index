<template>
    <div class="loading">
        <div class="loader-box">
            <div class="loader"></div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Loading"
    }
</script>

<style scoped>
    .loading {
        position: absolute;
        width: 100%;
        height: 100%;
        z-index: 1000;
    }
    .loader-box {
        display: block;
        width: 300px;
        height: 300px;
        border-radius: 3px;
        color: rgba(200, 200, 200, 0.5);
        margin-bottom: .25em;
        vertical-align: top;
        -webkit-transition: .3s color, .3s border;
        transition: .3s color, .3s border;
        color: #000000;
        font-size: 0;
        padding: 0;
        border-width: 3px;
        line-height: 200px;
        position: relative;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }
    .loader {
        position: relative;
        font-size: 70px;
        line-height: 200px;
        display: inline-block;
        width: 1em;
        height: 1em;
        color: inherit;
        vertical-align: middle;
        pointer-events: none;
    }
    .loader:before,
    .loader:after {
        content: '';
        width: inherit;
        height: inherit;
        border-radius: 50%;
        background-color: currentcolor;
        opacity: 0.6;
        position: absolute;
        top: 0;
        left: 0;
        -webkit-animation: loader 2.0s infinite ease-in-out;
        animation: loader 2.0s infinite ease-in-out;
    }
    .loader:after {
        -webkit-animation-delay: -1.0s;
        animation-delay: -1.0s;
    }
    @-webkit-keyframes loader {
        0%, 100% {
            -webkit-transform: scale(0);
            transform: scale(0);
        }
        50% {
            -webkit-transform: scale(1);
            transform: scale(1);
        }
    }
    @keyframes loader {
        0%, 100% {
            -webkit-transform: scale(0);
            transform: scale(0);
        }
        50% {
            -webkit-transform: scale(1);
            transform: scale(1);
        }
    }
</style>
