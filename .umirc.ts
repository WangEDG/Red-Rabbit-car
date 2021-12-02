import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  routes: [
    { path: '/', redirect: '/home' },
    { path: '/login', component: '@/pages/login' },
    {
      path: '/',
      component: '@/pages/MenuView/MenuView',
      routes: [
        {
          path: '/home',
          component: '@/pages/home/home',
        },
        {
          path: '/coupon',
          component: '@/pages/coupon/coupon',
          routes: [
            {
              path: '/coupon/coupon',
              component: '@/pages/coupon/coupon/coupon',
            },
          ],
        },
        {
          path: '/gen',
          component: '@/pages/gen/gen',
          routes: [
            {
              path: '/gen/goods',
              component: '@/pages/gen/goods/goods',
            },
            {
              path: '/gen/goodstype',
              component: '@/pages/gen/goodstype/goodstype',
            },
          ],
        },
        {
          path: '/job',
          component: '@/pages/job/job',
          routes: [
            {
              path: '/job/job',
              component: '@/pages/job/job/job',
            },
            {
              path: '/job/log',
              component: '@/pages/job/log/log',
            },
          ],
        },
        {
          path: '/judgement',
          component: '@/pages/judgement/judgement',
          routes: [
            {
              path: '/judgement/chargejudgement',
              component: '@/pages/judgement/chargejudgement/chargejudgement',
            },
            {
              path: '/judgement/goodsjudgement',
              component: '@/pages/judgement/goodsjudgement/goodsjudgement',
            },
            {
              path: '/judgement/servicejudgement',
              component: '@/pages/judgement/servicejudgement/servicejudgement',
            },
          ],
        },
        {
          path: '/marketingmanagement',
          component: '@/pages/marketingmanagement/marketingmanagement',
          routes: [
            {
              path: '/marketingmanagement/ad',
              component: '@/pages/marketingmanagement/ad/ad',
            },
            {
              path: '/marketingmanagement/goodsrecommend',
              component:
                '@/pages/marketingmanagement/goodsrecommend/goodsrecommend',
            },
          ],
        },
        {
          path: '/message',
          component: '@/pages/message/message',
        },
        {
          path: '/monitor',
          component: '@/pages/monitor/monitor',
          routes: [
            {
              path: '/monitor/httptrace',
              component: '@/pages/monitor/httptrace/httptrace',
            },
            {
              path: '/monitor/online',
              component: '@/pages/monitor/online/online',
            },
            {
              path: '/monitor/online',
              component: '@/pages/monitor/online/online',
            },
            {
              path: '/monitor/redisinfo',
              component: '@/pages/monitor/redisinfo/redisinfo',
            },
            {
              path: '/monitor/systemlog',
              component: '@/pages/monitor/systemlog/systemlog',
            },
            {
              path: '/monitor/system',
              component: '@/pages/monitor/system/system',
              routes: [
                {
                  path: '/monitor/system/jvminfo',
                  component: '@/pages/monitor/system/jvminfo/jvminfo',
                },
                {
                  path: '/monitor/system/systeminfo',
                  component: '@/pages/monitor/system/systeminfo/systeminfo',
                },
                {
                  path: '/monitor/system/tomcatinfo',
                  component: '@/pages/monitor/system/tomcatinfo/tomcatinfo',
                },
              ],
            },
          ],
        },
        {
          path: '/order',
          component: '@/pages/order/order',
          routes: [
            {
              path: '/order/ChargeOrder',
              component: '@/pages/order/ChargeOrder/ChargeOrder',
            },
            {
              path: '/order/data',
              component: '@/pages/order/data/data',
            },
            {
              path: '/order/GoodsOrder',
              component: '@/pages/order/GoodsOrder/GoodsOrder',
            },
            {
              path: '/order/ServiceOrder',
              component: '@/pages/order/ServiceOrder/ServiceOrder',
            },
            {
              path: '/order/test',
              component: '@/pages/order/test/test',
            },
          ],
        },
        {
          path: '/profile',
          component: '@/pages/profile/profile',
        },
        {
          path: '/serve',
          component: '@/pages/serve/serve',
          routes: [
            {
              path: '/serve/category',
              component: '@/pages/serve/category/category',
            },
            {
              path: '/serve/commission',
              component: '@/pages/serve/commission/commission',
            },
            {
              path: '/serve/shopCategory',
              component: '@/pages/serve/shopCategory/shopCategory',
            },
            {
              path: '/serve/statistics',
              component: '@/pages/serve/statistics/statistics',
            },
          ],
        },
        {
          path: '/shop',
          component: '@/pages/shop/shop',
          routes: [
            {
              path: '/shop/apply',
              component: '@/pages/shop/apply/apply',
            },
            {
              path: '/shop/charge',
              component: '@/pages/shop/charge/charge',
            },
            {
              path: '/shop/complain',
              component: '@/pages/shop/complain/complain',
            },
            {
              path: '/shop/shop',
              component: '@/pages/shop/shop/shop',
            },
          ],
        },
        {
          path: '/system',
          component: '@/pages/system/system',
          routes: [
            {
              path: '/system/dict',
              component: '@/pages/system/dict/dict',
            },
            {
              path: '/system/menu',
              component: '@/pages/system/menu/menu',
            },
            {
              path: '/system/role',
              component: '@/pages/system/role/role',
            },
            {
              path: '/system/user',
              component: '@/pages/system/user/user',
            },
          ],
        },
        {
          path: '/*',
          component: '@/pages/404/errmessage',
        },
      ],
    },
  ],

  dva: {
    immer: true,
  },

  theme: {
    '@primary-color': '#096dd9',
  },

  // 跨域
  proxy: {
    '/api': {
      target: 'http://xawn.f3322.net:8012',
      changeOrigin: true,
      pathRewrite: { '^/api': '' },
    },
  },
});
