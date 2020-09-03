<template lang="pug">
div(:class="classes" @click="toggle")
    span.text-uppercase.dropdown__label {{ label }}
    span.dropdown__value {{ valueLabel }}
    i.dropdown__icon: ui-icon(name="angle" width="12" height="8")
    transition(name="dropdown")
        ul.dropdown-list.dropdown__list(v-show="isOpen")
            li.dropdown-list__item(
                    v-for="{ label, value } in options"
                    :key="value"
                    @click="$emit('input', value)")
                | {{ label }}
</template>

<script>
export default {
    props: {
        value: {
            type: null,
            required: true,
        },
        /**
         * @namespace options
         * @property options.label {String}
         * @property options.value {(String|Number)}
         */
        options: {
            type: Array,
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
            isOpen: false,
        }
    },

    computed: {
        classes () {
            return ["dropdown", {
                "dropdown--opened": this.isOpen,
                "dropdown--selected": this.value !== null,
                "dropdown--error": this.error,
            }]
        },
        valueLabel () {
            return this.options[this.value]?.label ?? this.placeholderLabel
        },
        placeholderLabel () {
            return this.placeholder ?? this.$t("select")
        },
    },

    mounted () {
        let closestSelector = `.${this.$el.className}`
        this.$root.$el.addEventListener("click", e => {
            if (e.target.closest(closestSelector) || !this.isOpen) {
                return
            }
            this.close()
        })
    },

    methods: {
        toggle () {
            this.isOpen = !this.isOpen
        },
        open () {
            this.isOpen = true
        },
        close () {
            this.isOpen = false
        },
    },
}
</script>

<style lang="stylus" scoped>
.dropdown
    position: relative
    width: 100%
    height: max-content
    padding: 5px 0
    display: flex
    flex-wrap: wrap
    cursor: pointer

    &-enter-active,
    &-leave-active
        transition opacity

    &-enter,
    &-leave-to
        opacity: 0

    &-leave,
    &-enter-to
        opacity: 1

    &--opened &__icon
        transform: translateY(-50%) rotate(180deg)

    &--error
        outline: 1px dashed var(--red)

    &__label,
    &:not(&--selected) &__value
        opacity: 0.7

    &__label
        width: 100%
        margin-bottom: 4px
        font-size: 8px
        font-weight: 500
        line-height: 11px

    &__value
        font-size: 13px
        line-height: 15px

    &__icon
        position: absolute
        top: 50%
        right: 0
        transform: translateY(-50%)
        transition transform

    &__list
        position: absolute
        z-index: 10
        top: 100%
        left: 0

.dropdown-list
    width: 100%
    margin: 0
    padding: 0
    list-style-type: none
    background-color: var(--white)
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2)

    &__item
        padding: 10px
        transition background-color

        &:hover
            background-color: var(--lightgrey)
</style>
