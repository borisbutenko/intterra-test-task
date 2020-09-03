import { kebabCase } from "lodash-es"

import Modal from "./Modal"

const UI_KIT_COMPONENTS = require.context("./components", false, /\.vue$/).keys()

export default {
    install (Vue) {
        Vue.use(Modal)
        for (let relativePath of UI_KIT_COMPONENTS) {
            let basename = relativePath.replace(/(\.\/)|(.vue$)/g, "")
            let componentName = `ui-${kebabCase(basename)}`
            let component = require(`@/ui-kit/components/${basename}`)
            Vue.component(componentName, component.default || component)
        }
    },
}
