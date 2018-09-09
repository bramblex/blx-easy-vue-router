
const babel = require('rollup-plugin-babel')

export default {
    input: 'src/blx-easy-vue-router.js',
    output: {
        file: 'dist/blx-easy-vue-router.umd.js',
        name: 'BLXEasyVueRouter',
        format: 'umd',
        globals: {
            'vue-router': 'VueRouter',
        },
        external: ['vue-router']
    },
    plugins: [
        babel(),
    ]
}