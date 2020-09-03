<template lang="pug">
textarea.textarea(v-bind="$attrs" v-model.trim="model" :class="{ 'textarea--error': this.error }")
</template>

<script>
import { model, listeners } from "@/utils"

export default {
    mixins: [model, listeners],

    props: {
        error: Boolean,
    },
}
</script>

<style lang="stylus" scoped>
.textarea
    width: 100%
    border: 0
    outline: 0
    resize: none

    &--error
        outline: 1px dashed var(--red)

    &::placeholder
        color: var(--lightgray)
</style>
