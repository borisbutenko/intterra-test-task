<template lang="pug">
.input(:class="{ 'input--error': this.error }")
    span.text-uppercase.input__label {{ label }}
    input.input__field(v-bind="$attrs" v-model.trim="model" :placeholder="placeholder")
</template>

<script>
import { model, listeners } from "@/utils"

export default {
    inheritAttrs: false,

    mixins: [model, listeners],

    props: {
        label: String,
        error: Boolean,
    },

    computed: {
        placeholder () {
            return this.$attrs.placeholder ?? this.$t("ask")
        },
    },
}
</script>

<style lang="stylus" scoped>
.input
    width: 100%
    display: flex
    flex-direction: column
    justify-content: center

    &--error
        outline: 1px dashed var(--red)

    &__label
        margin-bottom: 4px
        font-size: 8px
        line-height: 11px
        opacity: 0.7

    &__field
        width: 100%
        border: 0
        outline: 0
        font-size: 18px
        line-height: 21px

        &::placeholder
            color: var(--lightgray)
</style>
