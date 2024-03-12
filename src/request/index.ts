import request from './request';

export const addCompilationApi = <T>(data: T) => {
  return request({
    url: 'compilation/add',
    method: 'post',
    data
  })
}

export const getCompilationApi = <T>(data: T) => {
  return request({
    url: 'compilation/get',
    method: 'get',
    params: data
  })
}

export const deleteCompilationApi = <T>(data: T) => {
  return request({
    url: 'compilation/delete',
    method: 'delete',
    params: data
  })
}