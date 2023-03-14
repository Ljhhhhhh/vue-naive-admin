import { defineStore } from 'pinia';
import { removeToken, toLogin } from '@/utils';
import { useTabStore } from '@/store';
import { resetRouter } from '@/router';
import { getUser } from '@/api/auth';
import { filterAsyncRoutes } from './helpers';
import { asyncRoutes, basicRoutes } from '@/router/routes';
import type { RoutesType } from '~/types/router';

interface UserInfo {
  id?: string;
  name?: string;
  avatar?: string;
  role?: string;
}

export const useUserStore = defineStore('user', {
  state() {
    return {
      userInfo: <UserInfo>{},
      accessRoutes: <RoutesType>[],
    };
  },
  getters: {
    userId(): string {
      return this.userInfo.id || '';
    },
    name(): string {
      return this.userInfo.name || '';
    },
    avatar(): string {
      return this.userInfo.avatar || '';
    },
    role(): string {
      return this.userInfo.role || '';
    },
    routes(): RoutesType {
      return basicRoutes.concat(this.accessRoutes);
    },
    menus(): RoutesType {
      return this.routes.filter((route) => route.name && !route.isHidden);
    },
  },
  actions: {
    async getUserInfo() {
      try {
        const res: any = await getUser();
        if (res.code === 0) {
          const { id, name, avatar, role } = res.data;
          this.userInfo = { id, name, avatar, role };
          return Promise.resolve(res.data);
        } else {
          return Promise.reject(res);
        }
      } catch (error) {
        return Promise.reject(error);
      }
    },
    generateRoutes(role: string): RoutesType {
      const accessRoutes = filterAsyncRoutes(asyncRoutes, role);
      this.accessRoutes = accessRoutes;
      return accessRoutes;
    },
    resetPermission() {
      this.accessRoutes = [];
    },
    async logout() {
      const { resetTabs } = useTabStore();
      removeToken();
      this.resetPermission();
      resetTabs();
      resetRouter();
      this.$reset();
      toLogin();
    },
    setUserInfo(userInfo = {}) {
      this.userInfo = { ...this.userInfo, ...userInfo };
    },
  },
});
