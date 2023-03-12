import type { RouteType } from '~/types/router';
const Layout = () => import('@/layout/index.vue');

export default {
  name: 'Exception',
  path: '/exception',
  component: Layout,
  redirect: '/exception/404',
  meta: {
    title: 'Exception',
    order: 99,
    icon: 'mdi:alert-circle-outline',
  },
  children: [
    {
      name: 'Exception-404',
      path: '404',
      component: () => import('@/views/exception/404.vue'),
      meta: {
        title: '404',
        icon: 'tabler:error-404',
      },
    },
  ],
} as RouteType;
