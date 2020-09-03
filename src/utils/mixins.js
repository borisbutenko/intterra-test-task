export let model = {
    props: {
        value: null,
    },

    data () {
        return {
            model: null,
        }
    },

    watch: {
        value: {
            immediate: true,
            handler (newVal) {
                if (newVal instanceof Event) {
                    return
                }
                this.model = newVal
            },
        },
        model (newVal) {
            this.$emit("input", newVal)
        },
    },
}

export let listeners = {
    mounted () {
        for (let listener in this.$listeners) {
            this.$el.addEventListener(listener, this.$emit.bind(this, listener))
        }
    },
}
