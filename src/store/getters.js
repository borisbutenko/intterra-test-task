export default {
    scheduledOperations: ({ operations }) =>
        operations.filter(operation => operation.assessment === null),

    performedOperations: ({ operations }) =>
        operations.filter(operation => operation.assessment !== null),
}
