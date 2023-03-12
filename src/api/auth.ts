import { request } from '@/utils';
import type { RequestConfig } from '~/types/axios';

export const login = (data = {}) => request.post('/auth/login', data, { noNeedToken: true } as RequestConfig);
export const getUser = () => request.get('/user');
export const refreshToken = () => request.post('/auth/refreshToken');
