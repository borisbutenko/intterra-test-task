module.exports = {
    root: true,

    parserOptions: {
        parser: "babel-eslint",
        ecmaVersion: 2020,
        sourceType: "module",
    },

    env: {
        browser: true,
    },

    extends: [
        "eslint:recommended",
        "standard",
        "plugin:vue/essential",
    ],

    plugins: [
        "vue",
    ],

    globals: {
        process: true,
    },

    rules: {
        "generator-star-spacing": "off",

        "arrow-parens": "off",
        "one-var": "off",

        "import/first": "off",
        "import/named": "error",
        "import/namespace": "error",
        "import/default": "error",
        "import/export": "error",
        "import/extensions": "off",
        "import/no-unresolved": "off",
        "import/no-extraneous-dependencies": "off",
        "prefer-promise-reject-errors": "off",
        "prefer-const": "off",

        indent: ["error", 4],
        quotes: ["error", "double"],
        "comma-dangle": ["error", "always-multiline"],

        "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",
        "no-console": process.env.NODE_ENV === "production" ? "error" : "off",
    }
}
