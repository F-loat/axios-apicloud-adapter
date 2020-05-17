import axios from 'axios'
import settle from 'axios/lib/core/settle'
import httpAdapter from 'axios/lib/adapters/http'
import buildURL from 'axios/lib/helpers/buildURL'
import buildFullPath from 'axios/lib/core/buildFullPath'
import createError from 'axios/lib/core/createError'

const transformConfig = (config) => {
  const fullPath = buildFullPath(config.baseURL, config.url)
  const url = buildURL(fullPath, config.params, config.paramsSerializer)
  return {
    url,
    method: config.method,
    encode: config.encode,
    tag: config.tag,
    cache: config.cache,
    timeout: config.timeout,
    dataType: config.dataType,
    charset: config.charset,
    headers: config.headers,
    report: config.report,
    data: config.data,
    certificate: config.certificate,
    safeMode: config.safeMode,
    proxy: config.proxy,
    returnAll: true
  }
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
