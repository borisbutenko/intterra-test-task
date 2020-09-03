<template lang="pug">
ul.nav: li.nav__item(v-for="{ name, path, meta } in routes" :key="name")
    router-link.nav__link(:to="path" active-class="nav__link--active")
        | {{ $t(meta.i18n.label) }}
</template>

<script>
export default {
    props: {
        routes: {
            type: Array,
            required: true,
        },
    },
}
</script>

<style lang="stylus" scoped>
.nav
    margin: 0
    padding: 0
    display: flex
    list-style-type: none

    &__item:not(:last-child)
        margin-right: 18px

    &__link
        color: var(--blue)
        font-size: 11px
        font-weight: 500
        line-height: 13px
        text-transform: uppercase
        text-decoration: none
        transition color

        &--active
            color: var(--dark)
            cursor: default
</style>
