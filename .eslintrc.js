module.exports = {
    root: true,
    env: {
        node: true
    },
    'extends': [
        'plugin:vue/essential',
        '@vue/standard'
    ],
    rules: {
        'no-tabs': 0,
        'no-mixed-spaces-and-tabs': 0,
        'indent': ["off", "tab"],
        'no-trailing-spaces': 0,
        'no-console': 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        "indent": ["error", "tab"],
        "no-tabs": "off",
        "no-multi-spaces": "off",
        "no-extra-boolean-cast": "off",
        "no-multiple-empty-lines": "off"
    },
    parserOptions: {
        parser: 'babel-eslint'
    }
}
