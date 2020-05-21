"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _axios = _interopRequireDefault(require("axios"));

var _utils = _interopRequireDefault(require("axios/lib/utils"));

var _settle = _interopRequireDefault(require("axios/lib/core/settle"));

var _xhr = _interopRequireDefault(require("axios/lib/adapters/xhr"));

var _buildURL = _interopRequireDefault(require("axios/lib/helpers/buildURL"));

var _buildFullPath = _interopRequireDefault(require("axios/lib/core/buildFullPath"));

var _createError = _interopRequireDefault(require("axios/lib/core/createError"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _asyncIterator(iterable) { var method; if (typeof Symbol !== "undefined") { if (Symbol.asyncIterator) { method = iterable[Symbol.asyncIterator]; if (method != null) return method.call(iterable); } if (Symbol.iterator) { method = iterable[Symbol.iterator]; if (method != null) return method.call(iterable); } } throw new TypeError("Object is not async iterable"); }

var writeFile = function writeFile(_ref) {
  var path = _ref.path,
      data = _ref.data;
  return new Promise(function (resolve, reject) {
    window.api.writeFile({
      path: path,
      data: data
    }, function (ret, err) {
      if (ret.status) {
        resolve(path);
      } else {
        reject(err);
      }
    });
  });
};

var file2Base64 = function file2Base64(file) {
  return new Promise(function (resolve) {
    var reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = function () {
      resolve(reader.result);
    };
  });
};

var transformConfig = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(config) {
    var fullPath, url, params, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, _value, data, _data, key, value, base64Data, path;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            fullPath = (0, _buildFullPath["default"])(config.baseURL, config.url);
            url = (0, _buildURL["default"])(fullPath, config.params, config.paramsSerializer);
            params = {
              url: url,
              method: config.method,
              data: {},
              encode: config.encode,
              tag: config.cancelToken,
              cache: config.cache,
              timeout: config.timeout,
              dataType: config.responseType || 'text',
              charset: config.responseEncoding,
              headers: config.headers,
              report: config.report,
              certificate: config.certificate,
              safeMode: config.safeMode,
              proxy: config.proxy,
              returnAll: true
            };

            if (!_utils["default"].isFormData(config.data)) {
              _context.next = 52;
              break;
            }

            params.data.values = {};
            params.data.files = {};
            _iteratorNormalCompletion = true;
            _didIteratorError = false;
            _context.prev = 8;
            _iterator = _asyncIterator(config.data);

          case 10:
            _context.next = 12;
            return _iterator.next();

          case 12:
            _step = _context.sent;
            _iteratorNormalCompletion = _step.done;
            _context.next = 16;
            return _step.value;

          case 16:
            _value = _context.sent;

            if (_iteratorNormalCompletion) {
              _context.next = 34;
              break;
            }

            data = _value;
            _data = _slicedToArray(data, 2), key = _data[0], value = _data[1];

            if (!_utils["default"].isFile(value)) {
              _context.next = 30;
              break;
            }

            _context.next = 23;
            return file2Base64(value);

          case 23:
            base64Data = _context.sent;
            _context.next = 26;
            return writeFile({
              path: "cache://".concat(value.name),
              data: base64Data
            });

          case 26:
            path = _context.sent;
            params.data.files[key] = path;
            _context.next = 31;
            break;

          case 30:
            params.data.values[key] = value;

          case 31:
            _iteratorNormalCompletion = true;
            _context.next = 10;
            break;

          case 34:
            _context.next = 40;
            break;

          case 36:
            _context.prev = 36;
            _context.t0 = _context["catch"](8);
            _didIteratorError = true;
            _iteratorError = _context.t0;

          case 40:
            _context.prev = 40;
            _context.prev = 41;

            if (!(!_iteratorNormalCompletion && _iterator["return"] != null)) {
              _context.next = 45;
              break;
            }

            _context.next = 45;
            return _iterator["return"]();

          case 45:
            _context.prev = 45;

            if (!_didIteratorError) {
              _context.next = 48;
              break;
            }

            throw _iteratorError;

          case 48:
            return _context.finish(45);

          case 49:
            return _context.finish(40);

          case 50:
            _context.next = 53;
            break;

          case 52:
            params.data.body = config.data;

          case 53:
            return _context.abrupt("return", params);

          case 54:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[8, 36, 40, 50], [41,, 45, 49]]);
  }));

  return function transformConfig(_x) {
    return _ref2.apply(this, arguments);
  };
}();

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
      adapter: _xhr["default"]
    }));
  }

  return new Promise( /*#__PURE__*/function () {
    var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(resolve, reject) {
      var ajaxParams;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return transformConfig(config);

            case 2:
              ajaxParams = _context2.sent;
              window.api.ajax(ajaxParams, function (ret, err) {
                if (err) {
                  transformError(err, reject, config);
                  return;
                }

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

            case 5:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }));

    return function (_x2, _x3) {
      return _ref3.apply(this, arguments);
    };
  }());
};

exports["default"] = _default;