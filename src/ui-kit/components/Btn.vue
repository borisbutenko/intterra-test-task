<template lang="pug">
button(v-bind="$attrs" :class="classes" :type="$attrs.type || 'button'")
    i.button__icon: slot(name="icon")
    span.button__label: slot {{ label }}
</template>

<script>
import { listeners } from "@/utils"

export default {
    mixins: [listeners],

    props: {
        label: String,
        color: String,
        fit: Boolean,
    },

    computed: {
        classes () {
            return ["button", {
                [`button--${this.color}`]: this.color,
                "button--fit": this.fit,
            }]
        },
    },
}
</script>

<style lang="stylus" scoped>
.button
    padding: 12px 15px
    display: inline-flex
    align-items: center
    justify-content: center
    background-color: var(--white)
    border-radius: 50px
    border: 0
    filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1))
    cursor: pointer
    font-size: 13px
    line-height: 15px
    transition background-color color

    &--green
        background-color: var(--green)
        color: var(--white)

    &--yellow
        background-color: var(--yellow)

    &--red
        background-color: var(--red)
        color: var(--white)

    &--fit
        width: 100%
        height: 100%
        border-radius: 0

    &__icon
        &:not(:empty)
            margin-right: 7px
        &:empty
            display: none

    &:active
        transform: translateY(1px)
</style>
