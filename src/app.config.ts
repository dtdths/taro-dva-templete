const config = (() => {
  // 添加h5页面时需在 ./config/config.js 里配置 H5_CUSTOM_ROUTES
  const _pages = [
    'pages/index/index',
  ];
  const _subpackages = [
    {
      root: 'pages/my',
      name: 'my',
      pages: ['index/index', 'setting/index'],
    },
  ];

  switch (process.env.TARO_ENV) {
    case 'weapp':
      return {
        pages: [..._pages],
        subpackages: [
          ..._subpackages,
        ]
      };
    default:
      return {
        pages: [..._pages],
        subpackages: [
          ..._subpackages,
        ]
      };
  }
})();

export default defineAppConfig({
  ...config,
  // pages: [
  //   'pages/index/index'
  // ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'black'
  }
})
