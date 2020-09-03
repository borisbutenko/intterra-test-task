<template lang="pug">
tr.table-item
    td.text-uppercase.table-item__td {{ dateLabel }}
    td.table-item__td.table-item__type {{ typeLabel }}
    td.table-item__td: .crop
        ui-icon.crop__icon(name="wheat" size="34")
        label.crop__label {{ $t("wheat_winter") }}
    td.table-item__td: .quality(:class="`quality--${assessmentColor}`") {{ assessmentLabel }}
</template>

<script>
import { format } from "date-fns"

import { Assessment, OperationType } from "@/api/models/Operation"

const LOCALES = require("date-fns/locale")

export default {
    props: {
        assessment: [Number, null],
        comment: [String, null],
        id: String,
        area: Number,
        date: Date,
        type: Number,
    },

    data () {
        return {
            format: "d MMM yyyy",
            locale: null,
            types: {
                [OperationType.PLOWING]: this.$t("plowing"),
                [OperationType.BOWLING]: this.$t("bowling"),
                [OperationType.FERTILIZATION]: this.$t("fertilization"),
                [OperationType.WATERING]: this.$t("watering"),
                [OperationType.RIGGING]: this.$t("rigging"),
                [OperationType.HARVESTING]: this.$t("harvesting"),
            },
            assessments: {
                [Assessment.EXCELLENT]: { label: this.$t("excellent"), color: "green" },
                [Assessment.SATISFACTORILY]: { label: this.$t("satisfactorily"), color: "yellow" },
                [Assessment.BADLY]: { label: this.$t("badly"), color: "red" },
                "-1": { label: this.$t("no_rating"), color: "gray" },
            },
        }
    },

    computed: {
        dateLabel () {
            let locale = LOCALES[this.$i18n.locale]
            return format(this.date, this.format, { locale })
        },
        typeLabel () {
            return this.types[this.type]
        },
        assessmentLabel () {
            return this.assessments[this.assessment ?? -1].label
        },
        assessmentColor () {
            return this.assessments[this.assessment ?? -1].color
        },
    },
}
</script>

<style lang="stylus" scoped>
.table-item
    transition background-color

    &__td
        padding: 15px 10px
        border-bottom 1px solid var(--grey)

    &__type
        font-weight: 500
        font-size: 13px
        line-height: 13px

.crop
    display: flex
    align-items: center

    &__icon
        margin-right: 10px

.quality
    display: flex
    align-items: center

    &--green::before
        background-color: var(--green)

    &--yellow::before
        background-color: var(--yellow)

    &--red::before
        background-color: var(--red)

    &--gray
        opacity: 0.3

        &::before
            background-color: var(--lightgray)

    &::before
        content: ""
        width: 20px
        height: 10px
        margin-right: 10px
        display: inline-block
        border-radius: 5px
</style>
