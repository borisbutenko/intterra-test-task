import Vue from "vue"

import App from "./App"

import UIKit from "./ui-kit"
import store from "./store"
import router from "./router"
import i18n from "./i18n"

// https://css-tricks.com/the-trick-to-viewport-units-on-mobile/
function calculateViewport () {
    let vh = window.innerHeight * 0.01
    document.documentElement.style.setProperty("--vh", `${vh}px`)
}

Vue.use(UIKit)
window.addEventListener("resize", calculateViewport)

new Vue({
    el: "#app",
    beforeCreate: calculateViewport,
    render: h => h(App),
    router,
    store,
    i18n,
})
