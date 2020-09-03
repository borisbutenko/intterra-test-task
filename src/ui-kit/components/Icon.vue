<template lang="pug">
svg.icon(:width="size || width" :height="size || height"): use(:xlink:href="id")
</template>

<script>
export default {
    props: {
        name: {
            type: String,
            required: true,
        },
        size: [String, Number],
        width: [String, Number],
        height: [String, Number],
    },

    computed: {
        id () {
            return `#svg-${this.name}`
        },
    },
}
</script>

<style lang="stylus" scoped>
.icon
    fill: currentColor
    transition fill
</style>
