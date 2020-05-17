import axios from 'axios'
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
    tag: config.tag,
    cache: config.cache,
    timeout: config.timeout,
    dataType: config.dataType,
    charset: config.charset,
    headers: config.headers,
    report: config.report,
    certificate: config.certificate,
    safeMode: config.safeMode,
    proxy: config.proxy,
    returnAll: true
  }

  const dataType = config.data.toString()

  if (dataType === '[object FormData]') {
    params.data.values = {}
    params.data.files = {}
    for (const data of config.data) {
      const [key, value] = data
      if (value.toString() === '[object File]') {
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
  const { code } = error
  if (code === 1) {
    // timeout
    reject(createError('timeout of ' + config.timeout + 'ms exceeded', config, 'ECONNABORTED', ''))
  } else {
    // NetWordError
    reject(createError('Network Error', config, null, ''))
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
  })
}
