module.exports = {
    root: true,

    env: {
        browser: true,
        es2021: true,
        node: true,
    },

    extends: [
        "eslint:recommended",
        "plugin:vue/essential",
        "standard",
    ],

    parserOptions: {
        parser: "babel-eslint",
        ecmaVersion: 12,
        sourceType: "module",
    },

    plugins: [
        "vue",
    ],

    globals: {
        process: true,
        require: true,
        document: true,
        window: true,
        global: true,
        sessionStorage: true,
    },

    rules: {
        "no-new": "off",
        "prefer-const": "off",

        indent: ["error", 4, { MemberExpression: "off", SwitchCase: 1 }],
        quotes: ["error", "double"],
        "comma-dangle": ["error", "always-multiline"],

        "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",
        "no-console": process.env.NODE_ENV === "production" ? "error" : "off",
    },
}
