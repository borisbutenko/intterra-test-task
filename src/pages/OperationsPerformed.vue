<template lang="pug">
.performed: operations-table(:data="performedOperations" :editable="false")
</template>

<script>
import { mapGetters } from "vuex"

import OperationsTable from "@/components/OperationsTable"

export default {
    components: {
        OperationsTable,
    },

    computed: mapGetters(["performedOperations"]),
}
</script>
