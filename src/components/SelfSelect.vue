<template>
    <div id="self-select">
        <div id="s-select">
            <div style="overflow: hidden">
                <div style="float: left; margin: 10px;"><input type="text" id="m-search" v-model="search_info"/><button @click="add()" style="margin: 10px;">添加</button></div>
            </div>
        </div>
        <div id="m-show">

        </div>
    </div>
</template>

<script>
    export default {
        name: "SelfSelect"
    }
</script>

<style scoped>

</style>