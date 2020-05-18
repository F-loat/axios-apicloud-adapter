"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _axios = _interopRequireDefault(require("axios"));

var _utils = _interopRequireDefault(require("axios/lib/utils"));

var _settle = _interopRequireDefault(require("axios/lib/core/settle"));

var _http = _interopRequireDefault(require("axios/lib/adapters/http"));

var _buildURL = _interopRequireDefault(require("axios/lib/helpers/buildURL"));

var _buildFullPath = _interopRequireDefault(require("axios/lib/core/buildFullPath"));

var _createError = _interopRequireDefault(require("axios/lib/core/createError"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _createForOfIteratorHelper(o) { if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (o = _unsupportedIterableToArray(o))) { var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e2) { throw _e2; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var it, normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e3) { didErr = true; err = _e3; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var transformConfig = function transformConfig(config) {
  var fullPath = (0, _buildFullPath["default"])(config.baseURL, config.url);
  var url = (0, _buildURL["default"])(fullPath, config.params, config.paramsSerializer);
  var params = {
    url: url,
    method: config.method,
    data: {},
    encode: config.encode,
    tag: config.cancelToken,
    cache: config.cache,
    timeout: config.timeout,
    dataType: config.responseType,
    charset: config.responseEncoding,
    headers: config.headers,
    report: config.report,
    certificate: config.certificate,
    safeMode: config.safeMode,
    proxy: config.proxy,
    returnAll: true
  };

  if (_utils["default"].isFormData(config.data)) {
    params.data.values = {};
    params.data.files = {};

    var _iterator = _createForOfIteratorHelper(config.data),
        _step;

    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var data = _step.value;

        var _data = _slicedToArray(data, 2),
            key = _data[0],
            value = _data[1];

        if (_utils["default"].isFile(value)) {
          params.data.files[key] = value;
        } else {
          params.data.values[key] = value;
        }
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }
  } else {
    params.data.body = config.data;
  }

  return params;
};

var transformResponse = function transformResponse(rst, config) {
  var status = rst.statusCode;
  var statusText = '';

  if (status === 200) {
    statusText = 'OK';
  } else if (status === 400) {
    statusText = 'Bad Request';
  }

  var response = {
    status: status,
    statusText: statusText,
    headers: rst.headers,
    data: rst.body,
    config: config
  };
  return response;
};

var transformError = function transformError(error, reject, config) {
  var code = error.code,
      msg = error.msg;

  if (code === 0) {
    reject((0, _createError["default"])('连接错误', config, msg));
  } else if (code === 1) {
    reject((0, _createError["default"])('超出 ' + config.timeout + 'ms 的超时限制', config, 'ECONNABORTED', ''));
  } else if (code === 2) {
    reject((0, _createError["default"])('授权错误', config, msg));
  } else if (code === 3) {
    reject((0, _createError["default"])('数据类型错误', config, msg));
  } else if (code === 4) {
    reject((0, _createError["default"])('不安全的数据', config, msg));
  } else {
    reject((0, _createError["default"])('网络错误', config, null, ''));
  }
};

var _default = function _default(config) {
  if (!window.api) {
    return (0, _axios["default"])(_objectSpread(_objectSpread({}, config), {}, {
      adapter: _http["default"]
    }));
  }

  return new Promise(function (resolve, reject) {
    var ajaxParams = transformConfig(config);
    window.api.ajax(ajaxParams, function (ret, err) {
      if (err) transformError(err, reject, config);
      var response = transformResponse(ret, config);
      (0, _settle["default"])(resolve, reject, response);
    });

    if (config.cancelToken) {
      // Handle cancellation
      config.cancelToken.promise.then(function (cancel) {
        window.api.cancelAjax({
          tag: config.cancelToken
        });
        reject(cancel);
      });
    }
  });
};

exports["default"] = _default;