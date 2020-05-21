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

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _createForOfIteratorHelper(o) { if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (o = _unsupportedIterableToArray(o))) { var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e2) { throw _e2; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var it, normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e3) { didErr = true; err = _e3; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

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

var file2path = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(file) {
    var name, base64, path;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            name = file.name;
            _context.next = 3;
            return file2Base64(file);

          case 3:
            base64 = _context.sent;
            _context.next = 6;
            return writeFile({
              path: "cache://".concat(name),
              data: base64
            });

          case 6:
            path = _context.sent;
            return _context.abrupt("return", {
              name: name,
              path: path
            });

          case 8:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function file2path(_x) {
    return _ref2.apply(this, arguments);
  };
}();

var transformConfig = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(config) {
    var fullPath, url, params, fileQueue, _iterator, _step, data, _data, key, value, files;

    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
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
              _context2.next = 15;
              break;
            }

            fileQueue = [];
            params.data.values = {};
            _iterator = _createForOfIteratorHelper(config.data);

            try {
              for (_iterator.s(); !(_step = _iterator.n()).done;) {
                data = _step.value;
                _data = _slicedToArray(data, 2), key = _data[0], value = _data[1];

                if (_utils["default"].isFile(value)) {
                  fileQueue.push(file2path(value));
                } else {
                  params.data.values[key] = value;
                }
              }
            } catch (err) {
              _iterator.e(err);
            } finally {
              _iterator.f();
            }

            _context2.next = 10;
            return Promise.all(fileQueue);

          case 10:
            files = _context2.sent;
            params.data.files = files.reduce(function (result, current) {
              return _objectSpread(_objectSpread({}, result), {}, _defineProperty({}, current.name, current.path));
            }, {});
            delete params.headers['Content-Type'];
            _context2.next = 16;
            break;

          case 15:
            params.data.body = config.data;

          case 16:
            return _context2.abrupt("return", params);

          case 17:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function transformConfig(_x2) {
    return _ref3.apply(this, arguments);
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

var _default = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(config) {
    var ajaxParams;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            if (window.api) {
              _context3.next = 2;
              break;
            }

            return _context3.abrupt("return", (0, _axios["default"])(_objectSpread(_objectSpread({}, config), {}, {
              adapter: _xhr["default"]
            })));

          case 2:
            _context3.next = 4;
            return transformConfig(config);

          case 4:
            ajaxParams = _context3.sent;
            return _context3.abrupt("return", new Promise(function (resolve, reject) {
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
            }));

          case 6:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function (_x3) {
    return _ref4.apply(this, arguments);
  };
}();

exports["default"] = _default;