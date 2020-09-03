<template lang="pug">
i(:class="classes"): ui-icon(v-bind="$attrs")
</template>

<script>
export default {
    props: {
        color: {
            type: String,
            required: true,
        },
    },

    computed: {
        classes () {
            return ["icon-circle", `icon-circle--${this.color}`]
        },
    },
}
</script>

<style lang="stylus" scoped>
.icon-circle
    width: 16px
    height: 16px
    display: inline-flex
    align-items: center
    justify-content: center
    border-radius: 50%

    &--green
        background-color: var(--green)
        color: var(--white)
</style>
