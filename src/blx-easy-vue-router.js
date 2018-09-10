
import VueRouter from 'vue-router'

const adapters = {
    default: { from: v => v, to: v => v, },
    number: { from: v => parseFloat(v), to: v => v.toString() },
    time: { from: v => new Date(v), to: v => (+v).toString() },
    boolean: { from: v => v === 'true' ? true : false, to: v => v.toString() }
}

function template(tpl, re) {
    const matched = tpl.match(new RegExp(re, 'g'))
    const tmp = {}
    for (const token of matched) {
        const [, name] = re.exec(token)
        tmp[name] = true
    }
    const tplFunc = new Function('env', 'return' + JSON.stringify(tpl).replace(re, '" + env.$1 + "'))
    return tplFunc
}

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

        const { from, to } = {
            ...adapters.default,
            ...(typeof adapter === 'string' ? adapters[adapter] : adapter)
        }

        let getter, setter

        getter = function () {
            const value = this.$route[type][name]
            return value ? from(value) : _default
        }

        const method = replace ? 'replace' : 'push'

        if (type === 'query') {
            setter = function (value) {
                if (value === _default) {
                    const query = { ...this.$route.query }
                    delete query[name]
                    this.$router[method]({ query })
                } else {
                    this.$router[method]({
                        query: {
                            ...this.$route.query,
                            [name]: to(value)
                        }
                    })
                }
            }
        } else if (type === 'params') {
            setter = function (value) {
                const { path } = this.$route.matched[this.$route.matched.length - 1]
                const toPath = template(path, /:([a-zA-Z0-9_-]+)/)
                this.$router[method]({
                    path: toPath({ ...this.$route.params, [name]: to(value) }),
                    query: { ...this.$route.query }
                })
            }
        }

        if (!this.$options.computed) this.$options.computed = {}
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

    forcePush(route) {
        this.refresh('/__empty')
        this.app.$nextTick(() => { this.push(route) })
    }

    forceReplace(route) {
        this.refresh('/__empty')
        this.app.$nextTick(() => { this.replace(route) })
    }

    refresh() {
        const route = this.currentRoute
        this.replace('/__empty')
        this.app.$nextTick(() => { this.replace(route) })
    }

    constructor(options) {
        super(options)
    }

}

BLXEasyVueRouter.adapters = adapters

// 遵循 Vue 的标准，如果有 window.Vue 则自动 use
if (typeof window === 'object' && window.Vue && typeof window.Vue.use === 'function') {
    Vue.use({ install: BLXEasyVueRouter.install })
}