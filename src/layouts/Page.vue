<template lang="pug">
main.page-layout: slot
</template>

<style lang="stylus" scoped>
.page-layout
    max-width: 1024px
    width: 100%
    margin: 0 auto
    padding: 25px 30px
    background-color: var(--white)
    box-shadow: 10px 10px 10px rgba(0, 0, 0, 0.2)
</style>
