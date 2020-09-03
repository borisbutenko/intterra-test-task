import Vue from "vue"
import VueRouter from "vue-router"

import routes, { children } from "./routes"

Vue.use(VueRouter)

export default new VueRouter({
    base: "/",
    routes: [...routes, { path: "*", redirect: children[0] }],
})
