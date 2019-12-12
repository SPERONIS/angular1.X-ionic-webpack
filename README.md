# angular1.X-ionic-webpack
本项目仅为改造静态到打包工程中的脚手架工具，`angular`和`ionic`版本较老，`webpack`也使用`3.X`版本

使用：
``` 
npm install
npm run dev
npm run build

```
在注入`ionic`的时候，使用`node_modules`里无法注入，只能以下面的方式：
```
require('./ionic/js/ionic.bundle.min');
require('./js/oclazyload.min');
require('angular-ui-router');
require('./js/services');
const app = angular.module("app", ['ionic','oc.lazyLoad','app.services','ui.router']);

```

