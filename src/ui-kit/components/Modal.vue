<template lang="pug">
layout-modal(v-show="isVisible"): .modal
    ui-btn.modal__close(v-if="closable" @click="close")
        ui-icon.modal__times(name="times" size="24")
    .content.modal__content
        .content__body
            ui-title.content__title(:label="title" level="2")
            slot
        footer.content__footer: slot(name="footer")
</template>

<script>
import LayoutModal from "@/layouts/Modal"

export default {
    components: {
        LayoutModal,
    },

    props: {
        title: {
            type: String,
            required: true,
        },
        name: {
            type: String,
            required: true,
        },
        closable: {
            type: Boolean,
            default: true,
        },
    },

    data () {
        return {
            isVisible: false,
        }
    },

    created () {
        this.$modal.add(this.name, {
            submit: this.submit,
            show: this.show,
            close: this.close,
            isVisible: this.isVisible,
        })
    },

    methods: {
        submit () {
            this.$emit("submit")
        },
        show () {
            this.isVisible = true
            this.$emit("show")
        },
        close () {
            this.isVisible = false
            this.$emit("close")
        },
    },
}
</script>

<style lang="stylus" scoped>
.modal
    width: 100%
    height: 100%

    &__close
        position: fixed
        top: 30px
        right: 30px
        padding: 0
        background-color: transparent

    &__times
        fill: var(--white)

    &__content
        width: 100%
        height: 100%

.content
    display: grid
    grid-template-areas: "body" "footer"
    grid-template-rows: 1fr 60px
    background-color: var(--white)

    &__body
        grid-area: body

    &__title
        padding: 12px 20px 0

    &__footer
        grid-area: footer
</style>
