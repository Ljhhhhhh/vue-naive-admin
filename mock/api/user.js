import { resolveToken } from '../utils';

const users = {
  admin: {
    id: 1,
    name: '皮皮卢',
    avatar: 'https://assets.qszone.com/images/avatar.jpg',
    email: 'Ronnie@123.com',
    role: 'admin',
  },
  user: {
    id: 3,
    name: '访客',
    avatar: 'https://assets.qszone.com/images/avatar.jpg',
    role: 'user',
  },
};
export default [
  {
    url: '/api/user',
    method: 'get',
    response: ({ headers }) => {
      const token = resolveToken(headers?.authorization);
      return {
        code: 0,
        data: {
          ...users[token],
        },
      };
    },
  },
];
