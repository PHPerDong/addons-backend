import Vue from 'vue';
import VueRouter from 'vue-router';
import { isAuthPage } from 'js/config/menu-config';

Vue.use(VueRouter);

const initRouter = () => {
    const routerParam = {
        routes: [{
            path: '/',
            component: (resolve) => require(['components/app/app-frame'], resolve),
            children: [{
                    path: '',
                    name: 'Home',
                    component: (resolve) => require(['components/home/index'], resolve),
                    meta: { title: '首页', icon: 'icon-monitor' }
                }, {
                    path: '/system-error',
                    name: 'SystemError',
                    component: (resolve) => require(['components/error-pages/500'], resolve),
                    meta: { title: '系统错误' }
                }, {
                    path: '/permission-error',
                    name: 'PermissionError',
                    component: (resolve) => require(['components/error-pages/403'], resolve),
                    meta: { title: '权限错误' }
                },
                {
                    path: '/notfound-error',
                    name: 'NotfoundError',
                    component: (resolve) => require(['components/error-pages/404'], resolve),
                    meta: { title: '页面找不到' }
                },
                {
                    path: '*',
                    name: 'CommonNotfoundError',
                    component: (resolve) => require(['components/error-pages/404'], resolve),
                    meta: { title: '页面找不到' }
                },
            ]
        }]
    };

    let router = new VueRouter(routerParam);
    let isFirstRouter = true;

    router.beforeEach((to, from, next) => {
        if (to.name !== 'Login' && !Utils.getLocal('token')) {
            next({ name: 'Login' });
            return;
        }
        if (!isFirstRouter && !isAuthPage(to.name)) {
            next({ name: 'PermissionError' });
            return;
        }
        HeyUI.$LoadingBar.start();
        if (to.meta && to.meta.title) {
            document.title = to.meta.title + ' - MeEdu';
        } else {
            document.title = 'MeEdu';
        }
        isFirstRouter = false;
        next();
    });
    router.afterEach(() => {
        HeyUI.$LoadingBar.success();
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;
        let layoutContent = document.querySelector('.h-layout-content');
        if (layoutContent) {
            layoutContent.scrollTop = 0;
        }
    });
    return router;
};

export default initRouter;