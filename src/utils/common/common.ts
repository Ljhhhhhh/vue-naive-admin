import dayjs from 'dayjs';

type Time = undefined | string | Date;

/** 格式化时间，默认格式：YYYY-MM-DD HH:mm:ss */
export function formatDateTime(time: Time, format = 'YYYY-MM-DD HH:mm:ss'): string {
  return dayjs(time).format(format);
}

/** 格式化日期，默认格式：YYYY-MM-DD */
export function formatDate(date: Time = undefined, format = 'YYYY-MM-DD') {
  return formatDateTime(date, format);
}

/**
 * Add the object as a parameter to the URL
 * @param baseUrl url
 * @param obj
 * @returns {string}
 * eg:
 *  let obj = {a: '3', b: '4'}
 *  setObjToUrlParams('www.baidu.com', obj)
 *  ==>www.baidu.com?a=3&b=4
 */
export function objToUrlParams(baseUrl: string, obj: any): string {
  let parameters = '';
  for (const key in obj) {
    parameters += key + '=' + encodeURIComponent(obj[key]) + '&';
  }
  parameters = parameters.replace(/&$/, '');
  return /\?$/.test(baseUrl) ? baseUrl + parameters : baseUrl.replace(/\/?$/, '?') + parameters;
}
