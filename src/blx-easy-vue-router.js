
import VueRouter from 'vue-router'
import pathToRegexp from 'path-to-regexp'

function beforeCreate() {
    const easyMapRoute = this.$options.easyMapRoute
    if (!easyMapRoute) return

    for (const [alias, _option] of Object.entries(easyMapRoute)) {

        const {
            name,
            type,
            adapter,
            default: _default,
            replace
        } = {
            adapter: adapters.default,
            default: null,
            replace: false,
            ..._option
        }

        let getter, setter

        getter = function () {
            const value = this.$route[type][name]
            return value ? adapter.from(value) : _default
        }

        const method = replace ? 'replace' : 'push'

        if (type === 'query') {
            setter = function (value) {
                if (value === _default) {
                    const query = { ...this.$route.query }
                    delete query[name]
                    this.$router[method]({ query })
                } else {
                    this.$route[method]({
                        ...this.$route.query,
                        [name]: adapter.to(value)
                    })
                }
            }
        } else if (type === 'params') {
            setter = function (value) {
                const { path } = this.$route.matched.pop()
                this.$router[method]({
                    path: pathToRegexp.compile(path)({ ...this.$route.params, [name]: adapter.to(value) }),
                    query: { ...this.$route.query }
                })
            }
        }

        this.$options.computed[alias] = { get: getter, set: setter }
    }
}

export default class BLXEasyVueRouter extends VueRouter {

    static install(Vue) {
        Vue.mixin({ beforeCreate })
    }

    static traversalRoutes(routes, func, state = null) {
        for (const route of routes) {
            const next_state = func(route, state)
            if (route.children) { BLXEasyVueRouter.traversalRoutes(route.children, next_state) }
        }
    }

    refresh() {
        const route = this.currentRoute
        this.replace('/_empty')
        this.app.$nextTick(() => { this.replace(route) })
    }

    constructor(options) {
        super(options)
    }

}

const adapters = {
    default: { from: v => v, to: v => v, },
    number: { form: v => parseFloat(v), to: v => v.toString() },
    time: { from: v => new Date(v), to: v => (+v).toString() }
}

BLXEasyVueRouter.adapters = adapters

// 遵循 Vue 的标准，如果有 window.Vue 则自动 use
if (typeof window === 'object' && window.Vue && typeof window.Vue.use === 'function') {
    Vue.use({ install })
}