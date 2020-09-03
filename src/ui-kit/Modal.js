class Modal {
    #modals = new Map()

    constructor () {
        document.addEventListener("keyup", this.handleDocumentEvents.bind(this))
    }

    handleDocumentEvents (e) {
        switch (e.key) {
            case "Escape":
                for (let modal of this.#modals.values()) {
                    if (modal.isVisible) {
                        modal.close()
                    }
                }
                break
            case "Enter":
                for (let modal of this.#modals.values()) {
                    if (modal.isVisible) {
                        modal.submit()
                    }
                }
                break
            default:
                break
        }
    }

    add (modalName, modalMethods) {
        this.#modals.set(modalName, modalMethods)
    }

    show (modalName) {
        this._show(this._modal(modalName))
    }

    close (modalName) {
        this._close(this._modal(modalName))
    }

    _modal (modalName) {
        return this.#modals.get(modalName)
    }

    _show (modal) {
        modal.isVisible = true
        modal.show()
    }

    _close (modal) {
        modal.isVisible = true
        modal.close()
    }
}

export default {
    install (Vue) {
        Vue.prototype.$modal = new Modal()
    },
}
