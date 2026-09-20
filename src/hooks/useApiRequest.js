import { useRequest } from 'ahooks';
import requestInstance from '@utils/requestInstance';

/**
 * 判断是否为普通 Object
 */
const isPlainObject = (value) => {
  if (value === null || typeof value !== 'object') {
    return false;
  }

  return Object.prototype.toString.call(value) === '[object Object]';
};

/**
 * 判断是否有有效对象属性
 */
const hasObjectValue = (value) => {
  return isPlainObject(value) && Object.keys(value).length > 0;
};

/**
 * 判断是否存在有效 Body
 */
const hasBodyValue = (value) => {
  if (value === undefined || value === null) {
    return false;
  }

  // 普通 Object
  if (isPlainObject(value)) {
    return Object.keys(value).length > 0;
  }

  // FormData / Blob / ArrayBuffer / String 等
  return true;
};

/**
 * 合并 Request Body
 *
 * 普通 Object：
 *   config.data + run(data)
 *
 * 非普通 Object：
 *   直接使用 run(data)
 */
const mergeRequestData = (configData, params) => {
  const hasConfigData = configData !== undefined;
  const hasParams = params !== undefined;

  if (!hasConfigData && !hasParams) {
    return undefined;
  }

  if (!hasConfigData) {
    return params;
  }

  if (!hasParams) {
    return configData;
  }

  /**
   * 只有普通 Object 才进行对象合并
   *
   * {
   *   ...config.data,
   *   ...params
   * }
   */
  if (isPlainObject(configData) && isPlainObject(params)) {
    return {
      ...configData,
      ...params,
    };
  }

  /**
   * FormData / Blob / ArrayBuffer 等
   * run(data) 优先
   */
  return params;
};

/**
 * 通用请求 Hook
 *
 * ============================================================
 * 一、GET
 * ============================================================
 *
 * run(params)
 *
 * GET /user/list?page=1&pageSize=10
 *
 *
 * ============================================================
 * 二、POST / PUT / PATCH / DELETE
 * ============================================================
 *
 * run(data)
 *
 * 第一个参数 → Request Body
 *
 * run(data, query)
 *
 * 第一个参数 → Request Body
 * 第二个参数 → URL Query
 *
 *
 * ============================================================
 * 三、POST / PUT / PATCH / DELETE 只有 Query
 * ============================================================
 *
 * run({}, query)
 *
 * 不主动发送空 Body
 *
 *
 * ============================================================
 * 四、强制 Query 模式
 * ============================================================
 *
 * useQueryParams: true
 *
 * 不管 HTTP Method 是什么，
 * 第一个参数全部作为 Query。
 *
 *
 * ============================================================
 * 五、单次请求 Axios 配置
 * ============================================================
 *
 * run(data, query, requestConfig)
 *
 * 例如：
 *
 * run(
 *   {
 *     username: 'tanwei',
 *   },
 *   {
 *     tenantId: '1001',
 *   },
 *   {
 *     headers: {
 *       Authorization: 'Bearer xxx',
 *     },
 *     timeout: 5000,
 *   },
 * );
 *
 *
 * ============================================================
 * 六、FormData
 * ============================================================
 *
 * run(formData)
 *
 * 不会尝试展开 FormData。
 *
 *
 * ============================================================
 * 七、默认 Axios 配置 + 单次覆盖
 * ============================================================
 *
 * useApiRequest({
 *   url: '/user',
 *   headers: {
 *     'X-Client': 'admin',
 *   },
 * });
 *
 * run(
 *   {},
 *   {},
 *   {
 *     headers: {
 *       Authorization: 'Bearer xxx',
 *     },
 *   },
 * );
 *
 * 最终：
 *
 * headers:
 * {
 *   'X-Client': 'admin',
 *   Authorization: 'Bearer xxx',
 * }
 */
const useApiRequest = (config = {}, options = {}) => {
  const { defaultParams, useQueryParams = false, ...restConfig } = config;

  /**
   * 请求函数
   *
   * @param {*} params
   * @param {object} queryOverrides
   * @param {object} requestOverrides
   */
  const requestService = (params = {}, queryOverrides = {}, requestOverrides = {}) => {
    /**
     * HTTP Method
     */
    const requestMethod = (restConfig?.method || 'GET').toUpperCase();

    /**
     * GET / 强制 Query
     */
    const isQueryMode = useQueryParams || requestMethod === 'GET';

    /**
     * ========================================================
     * 基础 Axios Request Config
     * ========================================================
     *
     * 优先级：
     *
     * useApiRequest config
     *        ↓
     * run 第三个参数
     *
     * run 的配置优先级更高
     */
    const requestConfig = {
      ...restConfig,
      ...requestOverrides,

      method: requestMethod,

      /**
       * Header 做深一层合并
       *
       * 默认 Header
       * +
       * 单次请求 Header
       */
      headers: {
        ...restConfig.headers,
        ...requestOverrides?.headers,
      },
    };

    /**
     * ========================================================
     * GET / 强制 Query 模式
     * ========================================================
     */
    if (isQueryMode) {
      const hasConfigParams = restConfig.params !== undefined;

      const hasParams = hasObjectValue(params);

      const hasQueryOverrides = hasObjectValue(queryOverrides);

      if (hasConfigParams || hasParams || hasQueryOverrides) {
        requestConfig.params = {
          ...(isPlainObject(restConfig.params) ? restConfig.params : {}),

          ...(isPlainObject(params) ? params : {}),

          ...(isPlainObject(queryOverrides) ? queryOverrides : {}),
        };
      }
    } else {
      /**
       * ======================================================
       * POST / PUT / PATCH / DELETE
       * ======================================================
       */

      /**
       * Request Body
       */
      const requestData = mergeRequestData(restConfig.data, params);

      if (hasBodyValue(requestData)) {
        requestConfig.data = requestData;
      } else {
        /**
         * 防止：
         *
         * data: {}
         *
         * 被主动发送
         */
        delete requestConfig.data;
      }

      /**
       * ======================================================
       * URL Query
       * ======================================================
       */
      const hasConfigParams = restConfig.params !== undefined;

      const hasQueryOverrides = hasObjectValue(queryOverrides);

      if (hasConfigParams || hasQueryOverrides) {
        requestConfig.params = {
          ...(isPlainObject(restConfig.params) ? restConfig.params : {}),

          ...(isPlainObject(queryOverrides) ? queryOverrides : {}),
        };
      }
    }

    /**
     * ========================================================
     * 发起 Axios 请求
     * ========================================================
     */
    return requestInstance.request(requestConfig);
  };

  /**
   * ==========================================================
   * ahooks useRequest
   * ==========================================================
   *
   * 不主动修改 ahooks 默认能力。
   *
   * 因此下面这些能力仍然可以直接使用：
   *
   * debounceWait
   * throttleWait
   * pollingInterval
   * retryCount
   * onSuccess
   * onError
   * onFinally
   * refreshDeps
   * cacheKey
   * loadingDelay
   * ...
   */
  const requestOptions = {
    manual: true,
    ...options,
  };

  /**
   * 只有真正传入 defaultParams
   * 才设置 defaultParams。
   *
   * 避免：
   *
   * defaultParams: [undefined]
   */
  if (defaultParams !== undefined) {
    requestOptions.defaultParams = [defaultParams];
  }

  return useRequest(requestService, requestOptions);
};

export default useApiRequest;
