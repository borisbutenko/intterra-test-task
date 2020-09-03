<template lang="pug">
component(:is="tag" :class="classes"): slot {{ label }}
</template>

<script>
const LEVELS = [1, 2, 3, 4, 5, 6]

export default {
    props: {
        level: {
            type: [String, Number],
            default: 1,
            validator: val => ~LEVELS.indexOf(Number(val)),
        },
        label: String,
    },

    computed: {
        tag () {
            return `h${this.level}`
        },
        classes () {
            return ["title", `title--${this.level}`]
        },
    },
}
</script>

<style lang="stylus" scoped>
.title
    margin: 0
    font-weight: 500

    &--1
        margin-bottom: 25px
        font-size: 25px
        line-height: 31px

    &--2
        margin-bottom: 14px
        font-size: 21px
        line-height: 24px

    &--6
        margin-bottom: 14px
        font-size: 11px
        line-height: 13px
</style>
