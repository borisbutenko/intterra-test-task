<template lang="pug">
datepicker(
        v-bind="props"
        :value="value"
        :class="classes"
        @input="$emit('input', $event)")
    template(v-slot:input)
        span.text-uppercase.datepicker__label {{ label }}
        span.datepicker__value {{ valueLabel }}
    template(v-slot:icon-calendar): ui-icon(name="calendar" size="16")
</template>

<script>
import Datepicker from "vue2-datepicker"

import { format } from "date-fns"

export default {
    components: {
        Datepicker,
    },

    props: {
        value: {
            type: null,
            required: true,
        },
        label: {
            type: String,
            required: true,
        },
        placeholder: String,
        error: Boolean,
    },

    data () {
        return {
            props: {
                clearable: false,
                format: "dd.MM.yyyy",
            },
        }
    },

    computed: {
        classes () {
            return ["datepicker", {
                "datepicker--selected": this.value,
                "datepicker--error": this.error,
            }]
        },
        valueLabel () {
            return this.value
                ? format(this.value, this.props.format)
                : this.placeholderLabel
        },
        placeholderLabel () {
            return this.placeholder ?? this.$t("select")
        },
    },
}
</script>

<style src="vue2-datepicker/index.css"></style>

<style lang="stylus">
.mx-input-wrapper
    display: flex
    flex-direction: column
    justify-content: center
</style>

<style lang="stylus" scoped>
.datepicker
    width: 100%
    min-width: 120px
    cursor: pointer

    &--error
        outline: 1px dashed var(--red)

    &__label
        opacity: 0.7

    &__value
        font-size: 18px
        line-height: 21px

    &__label
        margin-bottom: 4px
        font-size: 8px
        line-height: 11px

    &:not(&--selected) &__value
        color: var(--lightgray)
        opacity: 0.5
</style>
