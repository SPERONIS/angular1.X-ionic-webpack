require('./ionic/css/ionic.css');
require('./style.css');
require('./js/base64');
const angular = require('angular');
require('./ionic/js/ionic.bundle.min');
require('./js/oclazyload.min');
require('angular-ui-router');
require('./js/services');
const app = angular.module("app", ['ionic','oc.lazyLoad','app.services','ui.router']);

app.config(["$stateProvider", "$urlRouterProvider", function ($stateProvider, $urlRouterProvider) {

    //#region 
    
    $stateProvider
        // .state('parkingpay', {
        //     url: '/parkingpay',
        //     template: require('./parkingpay/parkingpay.html'),
        //     controller: 'parkingpayCtrl',
        //     resolve: {
        //         loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
        //             return require('./parkingpay/parkingpay.js');
        //         }]
        //     },
        //     cache: false
        // })
        .state('paysuccess', {
            url: '/paysuccess/:telephoneNum',
            template: require('./paysuccess/paysuccess.html'),
            controller: 'paysuccessCtrl',
            resolve: {
                loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return require("./paysuccess/paysuccess.js?v=201906081992");
                }]
            }
        })
        
        
    //#endregion
    $urlRouterProvider.otherwise('/paysuccess/-1/');
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