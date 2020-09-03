import FieldService from "@/api/FieldService"
import Operation from "@/api/models/Operation"

const FIELD_SERVICE = new FieldService()

export default {
    async LOADING ({ commit }, action) {
        commit("SET_LOADING_STATE", true)
        action().then(() => commit("SET_LOADING_STATE", false))
    },

    LOAD_OPERATIONS ({ commit, dispatch }) {
        dispatch("LOADING", () =>
            FIELD_SERVICE.getOperations()
                .then(operations => commit("SET_OPERATIONS", operations)))
    },

    ADD_OPERATION ({ dispatch, getters }, operation) {
        dispatch("LOADING", () =>
            FIELD_SERVICE.saveOperation(new Operation(operation)))
    },
}
