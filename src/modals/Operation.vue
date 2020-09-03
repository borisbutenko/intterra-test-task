<template lang="pug">
ui-modal(:name="name" :title="$t('add_operation_2')" @submit="submit" @close="clear").add-modal
    template(v-slot)
        form.add-modal__content(:id="formId" @submit.prevent="submit")
            .field.add-modal__row
                .field__color
                .field__desc
                    span.text-uppercase.field__label {{ $t("field") }}
                    span.field__title 112
                .field__info
                    span.field__title.field__title--normal {{ $t("winter_wheat") }}
                    span.text-uppercase.field__label {{ $t("victory") }} 50
                ui-icon.field__icon(name="wheat" size="34")
            .settings.add-modal__row(:class="{ 'settings--editable': editable }")
                .settings__field
                    ui-dropdown(
                            v-model="operation.type"
                            :options="typeOptions"
                            :label="$t('operation')"
                            :error="errors.type")
                .settings__field.settings__field--row
                    ui-datepicker.settings__datepicker(
                            v-model="operation.date"
                            :label="$t('date_of')"
                            :error="errors.date")
                    ui-input.settings__input(
                            v-model.number="operation.area"
                            :label="$t('qty_of_ha_for_processing')"
                            :error="errors.area")
            .comment.add-modal__row
                ui-textarea(v-model="operation.comment" :placeholder="`${$t('comment_operation')} ...`" rows="6")
            .quality.add-modal__row(v-if="editable")
                ui-title(level="6").text-uppercase {{ $t("quality_of_operation") }}
                ui-btn-group(v-model="operation.assessment" :error="errors.assessment")
                    ui-btn-group-item(:value="assessmentOptions.EXCELLENT" :label="excellentLabel" color="green")
                    ui-btn-group-item(:value="assessmentOptions.SATISFACTORILY" :label="satisfactorilyLabel" color="yellow")
                    ui-btn-group-item(:value="assessmentOptions.BADLY" :label="badlyLabel" color="red")
    template(v-slot:footer)
        ui-btn.text-uppercase.add-modal__submit(
                :form="formId"
                :label="editable ? $t('perform_operation') : $t('add_operation')"
                :color="editable ? 'yellow' : 'green'"
                type="submit"
                fit)
</template>

<script>
import { uniqueId, merge, pick, keys, pickBy, identity } from "lodash-es"
import { getDate, getMonth, getYear } from "date-fns"

import { Assessment, OperationType } from "@/api/models/Operation"

const SLICE_LABEL_LENGTH = 5

export default {
    props: {
        name: {
            type: String,
            default: "addOperation",
        },
        options: [Object, null],
        editable: Boolean,
    },

    data () {
        let operationList = {
            type: null,
            date: null,
            area: null,
            comment: null,
            assessment: null,
        }
        return {
            formId: uniqueId("operation_"),
            operation: operationList,
            errors: pick(operationList, ["type", "date", "area"]),
            typeOptions: [
                { label: this.$t("plowing"), value: OperationType.PLOWING },
                { label: this.$t("bowling"), value: OperationType.BOWLING },
                { label: this.$t("fertilization"), value: OperationType.FERTILIZATION },
                { label: this.$t("watering"), value: OperationType.WATERING },
                { label: this.$t("rigging"), value: OperationType.RIGGING },
                { label: this.$t("harvesting"), value: OperationType.HARVESTING },
            ],
            assessmentOptions: Assessment,
        }
    },

    computed: {
        excellentLabel () {
            return this.sliceLabel(this.$t("excellent"))
        },
        satisfactorilyLabel () {
            return this.sliceLabel(this.$t("satisfactorily"))
        },
        badlyLabel () {
            return this.sliceLabel(this.$t("badly"))
        },
        hasErrors () {
            let errorsDict = pickBy(this.errors, identity)
            let errorsCount = keys(errorsDict).length
            return Boolean(errorsCount)
        },
        formData () {
            let formData = pick(this.operation, ["type", "area", "comment", "assessment"])
            let date = this.operation.date
            return merge(formData, {
                id: this.operation.id ?? null,
                date: {
                    day: getDate(date),
                    month: getMonth(date) + 1,
                    year: getYear(date),
                },
            })
        },
    },

    watch: {
        options: {
            deep: true,
            handler (newVal) {
                if (newVal) {
                    let { year, month, day } = newVal.date
                    this.operation = merge(this.operation, newVal, { date: new Date(year, month, day) })
                    this.errors = { ...this.errors, assessment: null }
                }
            },
        },
        operation: {
            deep: true,
            handler () {
                this.$emit("input", this.formData)
            },
        },
    },

    methods: {
        sliceLabel (label, len = SLICE_LABEL_LENGTH) {
            let slicedLabel = label.slice(0, len)
            return slicedLabel.length < label.length ? `${slicedLabel}.` : slicedLabel
        },
        clear () {
            for (let prop in this.operation) {
                this.operation[prop] = null
            }
            for (let prop in this.errors) {
                this.errors[prop] = null
            }
            this.$emit("close")
        },
        submit () {
            this.calculateErrors()
            if (this.hasErrors) {
                return
            }
            this.$emit("submit", this.formData)
        },
        calculateErrors () {
            for (let prop in this.errors) {
                this.errors[prop] = this.operation[prop] === null
            }
        },
    },
}
</script>

<style lang="stylus" scoped>
.add-modal
    &__content
        height: calc(100% - 60px)
        display: flex
        flex-direction: column

    &__row
        padding: 12px 20px
        border-top: 1px solid var(--grey)

    &__submit
        font-size: 11px
        line-height: 13px

.field
    display: flex
    flex-basis: 50px

    &__desc,
    &__info
        display: inline-flex
        flex-direction: column

    &__desc &__label,
    &__info &__title
        margin-bottom: 5px

    &__title
        font-weight: 500
        font-size: 15px

        &--normal
            font-weight: normal

    &__label
        font-size: 9px
        opacity: 0.7

    &__info
        margin-right: 8px
        margin-left: auto
        text-align: right

    &::before
        content: ""
        width: 30px
        height: 30px
        margin-right: 8px
        display: inline-block
        background: var(--lightgreen)
        border: 1px solid var(--green)

.settings
    display: flex
    flex-wrap: wrap
    flex-basis: 140px

    &--editable
        position: relative

        &::after
            content: ""
            position: absolute
            top: 0
            left: 0
            z-index: 10
            width: 100%
            height: 100%
            display: block
            background-color: rgba(0, 0, 0, 0.05)
            cursor: not-allowed

    &__field
        &--row
            width: 100%
            display: flex
            align-items: center
            justify-content: space-between

        &:not(&--row)
            width: 100%

        &:not(:last-child)
            margin-bottom: 12px

    &__datepicker
        margin-right: 12px

.comment
    display: flex
    flex-basis: 90px

.quality
    display: flex
    flex-direction: column
    flex-basis: 100%

.error
    outline: 1px solid var(--red)
</style>
