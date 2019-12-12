require('./ionic/css/ionic.css');
require('./style.css');
// require('./js/base64');
const angular = require('angular');
require('./ionic/js/ionic.bundle');
require('./js/oclazyload.min');
require('angular-ui-router');
require('./js/services');
const app = angular.module("app", ['ionic','oc.lazyLoad','app.services','ui.router']);

app.config(["$stateProvider", "$urlRouterProvider", function ($stateProvider, $urlRouterProvider) {

    //#region 
    
    $stateProvider
        .state('success', {
            url: '/success',
            template: require('./success/success.html'),
            controller: 'successCtrl',
            resolve: {
                loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return require("./success/success.js?v=201906081992");
                }]
            }
        })
        
        
    //#endregion
    $urlRouterProvider.otherwise('/success');
}])
    .controller("AppCtrl", require('./js/controllers'))
    .directive('errSrc', function () {
        return {
            link: function (scope, element, attrs) {
                element.bind('error', function () {
                    if (attrs.src != attrs.errSrc) {
                        attrs.$set('src', attrs.errSrc);
                    }
                })
            }
        }
    });

    require('./js/app');