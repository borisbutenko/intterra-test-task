<template lang="pug">
label(:class="classes")
     input.button-group-item__radio(:name="$parent.name" type="radio" hidden)
     ui-btn.button-group-item__button(v-bind="$attrs" :color="selectedColor" @click="$parent.$emit('input', value)")
</template>

<script>
export default {
    inheritAttrs: false,

    props: {
        value: {
            type: null,
            required: true,
        },
        color: String,
    },

    computed: {
        isActive () {
            return this.$parent.value === this.value
        },

        classes () {
            return ["button-group-item", {
                "button-group-item--active": this.isActive,
            }]
        },

        selectedColor () {
            return this.isActive ? this.color : null
        },
    },
}
</script>

<style lang="stylus" scoped>
.button-group-item
    flex: 1 1 auto

    &__button
        width: 100%
        height: 100%
        padding: 15px 0
        border-radius: 0
        filter: none
        font-size: 11px
        font-weight: 500
        line-height: 13px
        text-transform: uppercase

    &:not(:last-child)
        border-right: 1px solid var(--lightgrey)
</style>
