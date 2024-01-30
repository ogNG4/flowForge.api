module.exports = {
    '*.{js,ts}': ['prettier --write "src/**/*.ts" "test/**/*.ts"'],
    'src/**/*.ts': [() => 'tsc -p tsconfig.json --noEmit', 'eslint --fix --max-warnings 0'],
};
