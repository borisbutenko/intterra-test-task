<template lang="pug">
.main-layout
    layout-header.main-layout__header: slot(name="header")
    layout-page.main-layout__page: slot
</template>

<script>
import LayoutHeader from "./Header"
import LayoutPage from "./Page"

export default {
    components: {
        LayoutHeader,
        LayoutPage,
    },
}
</script>

<style lang="stylus" scoped>
.main-layout
    height: 100%
    display: grid
    grid-template-areas: "header" "page"
    grid-template-rows: 80px 1fr

    &__header
        grid-area: header

    &__page
        grid-area: page
</style>
