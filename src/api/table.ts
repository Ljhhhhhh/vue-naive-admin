import { request } from '@/utils';

export const getPosts = (params = {}) => request.get('posts', { params });
export const getPostById = (id: number) => request.get(`/post/${id}`);
export const addPost = (data: any) => request.post('/post', data);
export const updatePost = (data: any) => request.put(`/post/${data.id}`, data);
export const deletePost = (id: number) => request.delete(`/post/${id}`);
