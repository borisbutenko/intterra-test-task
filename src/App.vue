<template lang="pug">
layout-main: keep-alive: router-view
</template>

<script>
import LayoutMain from "./layouts/Main"

export default {
    components: {
        LayoutMain,
    },
}
</script>

<style lang="stylus" src="./styles/index.styl"/>
