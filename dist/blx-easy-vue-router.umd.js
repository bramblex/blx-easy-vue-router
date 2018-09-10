(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('vue-router')) :
  typeof define === 'function' && define.amd ? define(['vue-router'], factory) :
  (global.BLXEasyVueRouter = factory(global.VueRouter));
}(this, (function (VueRouter) { 'use strict';

  VueRouter = VueRouter && VueRouter.hasOwnProperty('default') ? VueRouter['default'] : VueRouter;

  function _typeof(obj) {
    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
      _typeof = function (obj) {
        return typeof obj;
      };
    } else {
      _typeof = function (obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
      };
    }

    return _typeof(obj);
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  }

  function _objectSpread(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i] != null ? arguments[i] : {};
      var ownKeys = Object.keys(source);

      if (typeof Object.getOwnPropertySymbols === 'function') {
        ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) {
          return Object.getOwnPropertyDescriptor(source, sym).enumerable;
        }));
      }

      ownKeys.forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    }

    return target;
  }

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function");
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        writable: true,
        configurable: true
      }
    });
    if (superClass) _setPrototypeOf(subClass, superClass);
  }

  function _getPrototypeOf(o) {
    _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
      return o.__proto__ || Object.getPrototypeOf(o);
    };
    return _getPrototypeOf(o);
  }

  function _setPrototypeOf(o, p) {
    _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
      o.__proto__ = p;
      return o;
    };

    return _setPrototypeOf(o, p);
  }

  function _assertThisInitialized(self) {
    if (self === void 0) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return self;
  }

  function _possibleConstructorReturn(self, call) {
    if (call && (typeof call === "object" || typeof call === "function")) {
      return call;
    }

    return _assertThisInitialized(self);
  }

  function _slicedToArray(arr, i) {
    return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest();
  }

  function _arrayWithHoles(arr) {
    if (Array.isArray(arr)) return arr;
  }

  function _iterableToArrayLimit(arr, i) {
    var _arr = [];
    var _n = true;
    var _d = false;
    var _e = undefined;

    try {
      for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);

        if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"] != null) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }

    return _arr;
  }

  function _nonIterableRest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance");
  }

  var adapters = {
    default: {
      from: function from(v) {
        return v;
      },
      to: function to(v) {
        return v;
      }
    },
    number: {
      from: function from(v) {
        return parseFloat(v);
      },
      to: function to(v) {
        return v.toString();
      }
    },
    time: {
      from: function from(v) {
        return new Date(v);
      },
      to: function to(v) {
        return (+v).toString();
      }
    },
    boolean: {
      from: function from(v) {
        return v === 'true' ? true : false;
      },
      to: function to(v) {
        return v.toString();
      }
    }
  };

  function template(tpl, re) {
    var matched = tpl.match(new RegExp(re, 'g'));
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = matched[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var token = _step.value;

        var _re$exec = re.exec(token),
            _re$exec2 = _slicedToArray(_re$exec, 2),
            name = _re$exec2[1];
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator.return != null) {
          _iterator.return();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }

    var tplFunc = new Function('env', 'return' + JSON.stringify(tpl).replace(re, '" + env.$1 + "'));
    return tplFunc;
  }

  function beforeCreate() {
    var _this = this;

    var easyMapRoute = this.$options.easyMapRoute;
    if (!easyMapRoute) return;

    var _arr = Object.entries(easyMapRoute);

    var _loop = function _loop() {
      var _arr$_i = _slicedToArray(_arr[_i], 2),
          alias = _arr$_i[0],
          _option = _arr$_i[1];

      var _adapter$default$repl = _objectSpread({
        adapter: adapters.default,
        default: null,
        replace: false
      }, _option),
          name = _adapter$default$repl.name,
          type = _adapter$default$repl.type,
          adapter = _adapter$default$repl.adapter,
          _default = _adapter$default$repl.default,
          replace = _adapter$default$repl.replace;

      var _adapters$default = _objectSpread({}, adapters.default, typeof adapter === 'string' ? adapters[adapter] : adapter),
          from = _adapters$default.from,
          to = _adapters$default.to;

      var getter = void 0,
          setter = void 0;

      getter = function getter() {
        var value = this.$route[type][name];
        return value ? from(value) : _default;
      };

      var method = replace ? 'replace' : 'push';

      if (type === 'query') {
        setter = function setter(value) {
          if (value === _default) {
            var query = _objectSpread({}, this.$route.query);

            delete query[name];
            this.$router[method]({
              query: query
            });
          } else {
            this.$router[method]({
              query: _objectSpread({}, this.$route.query, _defineProperty({}, name, to(value)))
            });
          }
        };
      } else if (type === 'params') {
        setter = function setter(value) {
          var path = this.$route.matched[this.$route.matched.length - 1].path;
          var toPath = template(path, /:([a-zA-Z0-9_-]+)/);
          this.$router[method]({
            path: toPath(_objectSpread({}, this.$route.params, _defineProperty({}, name, to(value)))),
            query: _objectSpread({}, this.$route.query)
          });
        };
      }

      if (!_this.$options.computed) _this.$options.computed = {};
      _this.$options.computed[alias] = {
        get: getter,
        set: setter
      };
    };

    for (var _i = 0; _i < _arr.length; _i++) {
      _loop();
    }
  }

  var BLXEasyVueRouter =
  /*#__PURE__*/
  function (_VueRouter) {
    _inherits(BLXEasyVueRouter, _VueRouter);

    _createClass(BLXEasyVueRouter, [{
      key: "forcePush",
      value: function forcePush(route) {
        var _this2 = this;

        this.refresh('/__empty');
        this.app.$nextTick(function () {
          _this2.push(route);
        });
      }
    }, {
      key: "forceReplace",
      value: function forceReplace(route) {
        var _this3 = this;

        this.refresh('/__empty');
        this.app.$nextTick(function () {
          _this3.replace(route);
        });
      }
    }, {
      key: "refresh",
      value: function refresh() {
        var _this4 = this;

        var route = this.currentRoute;
        this.replace('/__empty');
        this.app.$nextTick(function () {
          _this4.replace(route);
        });
      }
    }], [{
      key: "install",
      value: function install(Vue) {
        Vue.mixin({
          beforeCreate: beforeCreate
        });
      }
    }, {
      key: "traversalRoutes",
      value: function traversalRoutes(routes, func) {
        var state = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
        var _iteratorNormalCompletion2 = true;
        var _didIteratorError2 = false;
        var _iteratorError2 = undefined;

        try {
          for (var _iterator2 = routes[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
            var route = _step2.value;
            var next_state = func(route, state);

            if (route.children) {
              BLXEasyVueRouter.traversalRoutes(route.children, next_state);
            }
          }
        } catch (err) {
          _didIteratorError2 = true;
          _iteratorError2 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion2 && _iterator2.return != null) {
              _iterator2.return();
            }
          } finally {
            if (_didIteratorError2) {
              throw _iteratorError2;
            }
          }
        }
      }
    }]);

    function BLXEasyVueRouter(options) {
      _classCallCheck(this, BLXEasyVueRouter);

      return _possibleConstructorReturn(this, _getPrototypeOf(BLXEasyVueRouter).call(this, options));
    }

    return BLXEasyVueRouter;
  }(VueRouter);
  BLXEasyVueRouter.adapters = adapters; // 遵循 Vue 的标准，如果有 window.Vue 则自动 use

  if ((typeof window === "undefined" ? "undefined" : _typeof(window)) === 'object' && window.Vue && typeof window.Vue.use === 'function') {
    Vue.use({
      install: BLXEasyVueRouter.install
    });
  }

  return BLXEasyVueRouter;

})));
