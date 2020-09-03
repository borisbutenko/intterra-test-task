<template lang="pug">
.table-container
    table.table(v-show="data.length")
        thead: tr: th.table__th(
                v-for="{ sort, label, width } in colsList"
                :key="label"
                :width="width"
                :class="{ [`sort-${sortDict[sort]}`]: sortDict[sort] }"
                @click="sortBy(sort)")
            | {{ label }}
        tbody: operations-table-item(
                v-for="(item, i) in sortedData"
                v-bind="item"
                :key="item.id || i"
                :class="{ 'editable': editable }"
                @click.native="editable && $parent.$emit('edit', data[i])")
    p.table-empty(v-show="!data.length") {{ $t("empty_operations") }}
</template>

<script>
import { orderBy } from "lodash-es"

import OperationsTableItem from "./OperationsTableItem"

export default {
    components: {
        OperationsTableItem,
    },

    props: {
        data: {
            type: Array,
            required: true,
        },
        editable: {
            type: Boolean,
            default: true,
        },
    },

    data () {
        return {
            sortDict: {},
            colsList: [
                { label: this.$t("date"), sort: "date", width: "100px" },
                { label: this.$t("operation"), sort: "type", width: "auto" },
                { label: this.$t("crop"), sort: "crop", width: "200px" },
                { label: this.$t("quality"), sort: "assessment", width: "200px" },
            ],
        }
    },

    computed: {
        mappedData () {
            let getDate = date => new Date(date.year, date.month, date.day)
            return this.data.map(item => ({ ...item, date: getDate(item.date) }))
        },
        sortedData () {
            let sortableEntries = Object.entries(this.sortDict)
            let sort = sortableEntries.map(entry => entry[0])
            let order = sortableEntries.map(entry => entry[1])
            return orderBy(this.mappedData, sort, order)
        },
    },

    methods: {
        sortBy (name) {
            switch (this.sortDict[name]) {
                case "asc": this.sortDict[name] = "desc"; break
                case "desc": delete this.sortDict[name]; break
                default: this.sortDict[name] = "asc"; break
            }
            this.sortDict = { ...this.sortDict }
        },
    },
}
</script>

<style lang="stylus" scoped>
.table-container
    font-size: 11px
    line-height: 13px

.table
    width: 100%
    table-layout: fixed
    border-collapse: collapse

    &__th
        padding: 15px 10px
        background-color: var(--grey)
        text-align: left
        cursor: pointer
        transition background-color

        &::after
            content: ""
            width: 10px
            height: 5px
            margin-left: 5px
            display: inline-block
            border-left: 6px solid transparent
            border-right: 6px solid transparent
            border-top: 6px solid var(--lightgray)
            transition: background-color, transform

        &.sort-asc::after,
        &.sort-desc::after
            border-top-color: var(--blue)

        &.sort-desc::after
            transform: rotateX(180deg)

        &:hover
            background-color: rgba(0, 0, 0, 0.1)

    .editable
        cursor: pointer

        &:hover
            background-color: rgba(0, 0, 0, 0.1)

.table-empty
    padding: 50px
    opacity: 0.5
    font-size: 25px
    line-height: 31px
    text-align: center
</style>
