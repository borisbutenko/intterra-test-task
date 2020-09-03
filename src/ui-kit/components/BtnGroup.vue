<template lang="pug">
.button-group(:class="{ 'button-group--error': this.error }"): slot
</template>

<script>
import { uniqueId } from "lodash-es"

export default {
    props: {
        value: {
            type: null,
            required: true,
        },
        error: Boolean,
    },

    data () {
        return {
            name: uniqueId("button_group_"),
        }
    },
}
</script>

<style lang="stylus" scoped>
.button-group
    display: flex
    align-items: center
    background: var(--lightgrey)
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2)
    border-radius: 20px
    overflow: hidden

    &--error
        outline: 1px dashed var(--red)
</style>
