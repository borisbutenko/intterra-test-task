<template lang="pug">
.scheduled: operations-table(:data="scheduledOperations")
</template>

<script>
import { mapGetters } from "vuex"

import OperationsTable from "@/components/OperationsTable"

export default {
    components: {
        OperationsTable,
    },

    computed: mapGetters(["scheduledOperations"]),
}
</script>
