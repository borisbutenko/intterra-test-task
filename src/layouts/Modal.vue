<template lang="pug">
transition(name="modal-wrapper"): section.modal-wrapper
    aside.modal-wrapper__aside: slot
</template>

<style lang="stylus" scoped>
.modal-wrapper
    position: fixed
    top: 0
    left: 0
    z-index: 100
    width: calc(var(--vw) * 100)
    height: calc(var(--vh) * 100)
    background-color: rgba(0, 0, 0, 0.7)

    &-enter-active,
    &-leave-active
        transition opacity

    &-enter,
    &-leave-to
        opacity: 0

    &-leave,
    &-enter-to
        opacity: 1

    &-enter-active &__aside,
    &-leave-active &__aside
        transition left

    &-enter &__aside,
    &-leave-to &__aside
        left: -320px

    &-leave &__aside,
    &-enter-to &__aside
        left: 0

    &__aside
        position: relative
        width: 320px
        height: 100%
</style>
