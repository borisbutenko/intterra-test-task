export let children = [
    {
        name: "operations:scheduled",
        path: "scheduled",
        component: () => import("@/pages/OperationsScheduled"),
        meta: {
            i18n: {
                label: "scheduled_operations",
            },
        },
    },
    {
        name: "operations:performed",
        path: "performed",
        component: () => import("@/pages/OperationsPerformed"),
        meta: {
            i18n: {
                label: "performed_operations",
            },
        },
    },
]

export default [
    {
        name: "operations",
        path: "/operations",
        component: () => import("@/pages/Operations"),
        children,
    },
]
