# xx小程序

## prd

- [xx](https://cf.jd.com/)

- [xxx](https://cf.jd.com/)

## ui

- [ui](https://relay.jd.com/)

## 项目相关

- [xx期排期](<https://docs.qq.com/sheet/DRlNsQkJlWnRITUJW?tab=BB08J2>

## 前端设计

- xx一期[设计文档](./doc/xxx.md)

## 目录

```menu
components // 公共组件
|
|--anchor   // 锚点
|--backTop   // 回顶
|
config // 配置
|
|--api // api配置
|--enums // 枚举
|
models // model
｜
｜
pages // 页面
|
|--detail // 商详
|--index // 首页
|
service // api
｜
｜
static // 静态文件
|
|
stytle
|
|
utils
|--h5Utils // h5 方法
|--hooks // 公共hooks
|--request // 请求封装
```

## 微信公众平台

- <https://mp.weixin.qq.com>

- appid: xxx

## 页面路径

### h5

- [商详](https://xxxx)

- [404](https://xxxx)

## 部署

- h5

  - 测试： <http://xxxxx>

  - 预发

  - 上线：预发步骤完成后

## 测试用例

- [xxx测试用例](http://2stest.jd.com/mind/editor?id=181)

## tips

- 安卓 小程序 webview visibilitychange 事件无法监听

  [visibilitychange](https://developers.weixin.qq.com/community/develop/doc/000aaa1242cb08728539a647356c00?highLine=visibilitychange)

  解决方案：安卓 webview 跳转前原页面增加全局点击事件/mask

- **h5 不支持-3.0.16** 标签上无法添加 data-\*

  [git issue](https://github.com/NervJS/taro/issues/7313)

- **h5 不支持-3.0.16** Taro.nextTick 不支持

  使用 requestAnimationFrame 或 setTimeout，后续关注升级

- **h5 不支持-3.0.16** Taro.pageScrollTo bug, 不支持

  [git issue](https://github.com/NervJS/taro/issues/7235)，后续关注升级

- h5 bug 随机部分元素不展示，重新渲染后展示

  [git issue](https://github.com/NervJS/taro/issues/7908), 加 visibility: visible

- 多行省略偶发失效

  [增加 visibility: visible;](https://www.it1352.com/1816823.html)

- h5 style 必须加单位，否则 h5 中不会渲染

  style={{height: 200}} 无效 ；必须写成 style={{height: '200px'}}

- h5 history 模式无法获取 url 参数， getCurrentInstance().router 是 null

  [git issue](https://github.com/NervJS/taro/issues/7039)

  需自行处理 url

- h5 ScrollView 外层被含有 onTouchMove 的 View 包裹时, ScrollView 无法触发,导致无法滚动

  [git issue](https://github.com/NervJS/taro/issues/4000) 3.0.16 存在

- h5 bug Image 触发 onError 后，设置默认 src 不起作用，src 已经重新赋值但 dom 中的 src 并未改变

  [git issue](https://github.com/NervJS/taro/issues/8151)

- h5 ios 长按唤出 ios 原生保存图片功能，之后小程序假死，所有跳转失效。解决方式图片加 -webkit-touch-callout: none;

  [增加 -webkit-touch-callout: none;](https://developers.weixin.qq.com/community/develop/doc/00084803af44f8ea724af437c5b000)

- 如何防止滚动穿透？

  无法编译 catchtouchmove，暂时使用原生组件混合包装

  [git issue](https://github.com/NervJS/taro/issues/5984)

  [git issue](https://github.com/NervJS/taro/issues/3980)

  3.10 版本可能已修复

  [git issue](https://github.com/NervJS/taro/issues/7959)

- 唤起 app

  1. h5 里的 openapp.paipai 协议在 web-view 里不生效

  2. 微信 h5 里 launchApplication 不生效。[具体代码](http://coding.jd.com/app/move-h5-c2c/blob/master/src/js/downLoadForChannel.js) [页面链接](https://paipai.m.jd.com/c2c/appDown.html?ad_od=20201106)

  [方案](https://www.jianshu.com/p/06030421ead3)

- 适配 iphonex +

  使用 safe-area-inset-bottom。首先设置 **viewport-fit=contain** ，否则不生效。constant 为已淘汰写法，新版为 env。同时兼容时顺序不能写反。

  ```css
  border-bottom: constant(safe-area-inset-bottom) solid #f7f7f7; /* 兼容 iOS < 11.2 */

  border-bottom: env(safe-area-inset-bottom) solid #f7f7f7; /* 兼容 iOS >= 11.2 */
  ```

- [dva 学习](https://redux-saga.js.org/docs/advanced/NonBlockingCalls.html)

  1. call 异步阻塞调用
  2. fork 异步非阻塞调用，无阻塞的执行 fn，执行 fn 时，不会暂停 Generator
  3. put 相当于 dispatch，分发一个 action; put.resolve 会阻塞，返回结果
  4. select 相当于 getState，用于获取 store 中相应部分的 state
  5. take 监听 action，暂停 Generator，匹配的 action 被发起时，恢复执行。take 结合 fork，可以实现 takeEvery 和 takeLatest 的效果
  6. takeEvery 监听 action，每监听到一个 action，就执行一次操作
  7. takeLatest 监听 action，监听到多个 action，只执行最近的一次
  8. cancel 指示 middleware 取消之前的 fork 任务，cancel 是一个无阻塞 Effect。也就是说，Generator 将在取消异常被抛出后立即恢复
  9. race 竞速执行多个任务，类似 Promise.rece
  10. all 执行多个认为，类似 Promise.all
  11. throttle 节流

## TODO

```js
{
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module',
    allowImportExportEverywhere: true,
  },
  env: {
    browser: true,
  },
  extends: ['airbnb'],
  plugins: ['react-hooks'],
  rules: {
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    'react/jsx-filename-extension': [
      1,
      {
        extensions: ['.js', '.jsx'],
      },
    ],
    'generator-star-spacing': 'off',
    'linebreak-style': ['off', 'windows'],
    'import/no-named-as-default': 0,
    'jsx-a11y/click-events-have-key-events': 0,
    'jsx-a11y/no-noninteractive-element-interactions': 0,
    'max-len': [1, 250],
    'no-param-reassign': 0,
    'no-script-url': 0,
    'react/jsx-one-expression-per-line': 0,
    'no-lonely-if': 0,
    'no-nested-ternary': 0,
    'jsx-a11y/label-has-for': 0,
    'react/no-array-index-key': 0,
    'no-console': 'off',
    'no-debugger': 'off',
    'react/forbid-foreign-prop-types': 0,
  },
}
```
