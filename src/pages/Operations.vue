<template lang="pug">
section.operations
    ui-title.operations__title(:label="title")
    header.operations__header
        navbar(:routes="routes")
        ui-btn(v-show="isScheduledOperations" @click="$modal.show(modals.scheduled)")
            template(v-slot:icon): icon-circle(name="plus" size="8" color="green")
            template(v-slot) {{ $t("add_operation") }}
    .operations__content(v-if="operations"): router-view(@edit="editOperation")
    modal-operation(:name="modals.scheduled" @submit="addOperation($event, modals.scheduled)")
    modal-operation(
            :name="modals.performed"
            :options="editableOperation"
            editable
            @submit="addOperation($event, modals.performed)"
            @close="editableOperation = null")
</template>

<script>
import { mapState, mapActions } from "vuex"

import Navbar from "@/components/Navbar"
import IconCircle from "@/components/IconCircle"
import ModalOperation from "@/modals/Operation"

import { children } from "@/router/routes"

export default {
    components: {
        Navbar,
        IconCircle,
        ModalOperation,
    },

    data () {
        return {
            routes: children,
            editableOperation: null,
            modals: {
                scheduled: "addScheduledOperation",
                performed: "addPerformedOperation",
            },
        }
    },

    computed: {
        ...mapState(["operations"]),
        title () {
            return `${this.$t("field_operations")} 112`
        },
        isScheduledOperations () {
            return this.$route.name === "operations:scheduled"
        },
    },

    created () {
        this.LOAD_OPERATIONS()
    },

    methods: {
        ...mapActions(["LOAD_OPERATIONS", "ADD_OPERATION"]),
        editOperation (operation) {
            this.editableOperation = operation
            this.$modal.show(this.modals.performed)
        },
        addOperation (operation, modal) {
            this.ADD_OPERATION(operation)
            this.LOAD_OPERATIONS()
            this.$modal.close(modal)
        },
    },
}
</script>

<style lang="stylus" scoped>
.operations
    &__header
        height: 40px
        display: flex
        align-items: center
        justify-content: space-between

    &__content
        margin-top: 25px
</style>
