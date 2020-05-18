import axios from 'axios'
import utils from 'axios/lib/utils'
import settle from 'axios/lib/core/settle'
import httpAdapter from 'axios/lib/adapters/http'
import buildURL from 'axios/lib/helpers/buildURL'
import buildFullPath from 'axios/lib/core/buildFullPath'
import createError from 'axios/lib/core/createError'

const transformConfig = (config) => {
  const fullPath = buildFullPath(config.baseURL, config.url)
  const url = buildURL(fullPath, config.params, config.paramsSerializer)

  const params = {
    url,
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
  }

  if (utils.isFormData(config.data)) {
    params.data.values = {}
    params.data.files = {}
    for (const data of config.data) {
      const [key, value] = data
      if (utils.isFile(value)) {
        params.data.files[key] = value
      } else {
        params.data.values[key] = value
      }
    }
  } else {
    params.data.body = config.data
  }

  return params
}

const transformResponse = (rst, config) => {
  const status = rst.statusCode

  let statusText = ''
  if (status === 200) {
    statusText = 'OK'
  } else if (status === 400) {
    statusText = 'Bad Request'
  }

  const response = {
    status,
    statusText,
    headers: rst.headers,
    data: rst.body,
    config
  }

  return response
}

const transformError = (error, reject, config) => {
  const { code, msg } = error
  if (code === 0) {
    reject(createError('连接错误', config, msg))
  } else if (code === 1) {
    reject(createError('超出 ' + config.timeout + 'ms 的超时限制', config, 'ECONNABORTED', ''))
  } else if (code === 2) {
    reject(createError('授权错误', config, msg))
  } else if (code === 3) {
    reject(createError('数据类型错误', config, msg))
  } else if (code === 4) {
    reject(createError('不安全的数据', config, msg))
  } else {
    reject(createError('网络错误', config, null, ''))
  }
}

export default (config) => {
  if (!window.api) {
    return axios({ ...config, adapter: httpAdapter })
  }
  return new Promise((resolve, reject) => {
    const ajaxParams = transformConfig(config)
    window.api.ajax(ajaxParams, (ret, err) => {
      if (err) transformError(err, reject, config)
      const response = transformResponse(ret, config)
      settle(resolve, reject, response)
    })

    if (config.cancelToken) {
      // Handle cancellation
      config.cancelToken.promise.then((cancel) => {
        window.api.cancelAjax({
          tag: config.cancelToken
        })
        reject(cancel)
      })
    }
  })
}
