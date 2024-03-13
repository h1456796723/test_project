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

export const getCompilationDetailApi = <T>(data: T) => {
  return request({
    url: 'compilation/detail',
    method: 'get',
    params: data
  })
}

export const addImageApi = <T>(data: T) => {
  return request({
    url: 'image/add',
    method: 'post',
    data
  })
}

export const getImageListApi = <T>(data: T) => {
  return request({
    url: 'image/get',
    method: 'get',
    params: data
  })
}

export const deleteImageApi = <T>(data: T) => {
  return request({
    url: 'image/delete',
    method: 'delete',
    params: data
  })
}