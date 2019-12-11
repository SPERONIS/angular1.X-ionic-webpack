angular = require('angular');
module.exports = angular.module('app.services', [])
    .service('addressinfo',request);


    request.$inject=['$http', '$ionicPopup','$ionicLoading'];

    function request($http,  $ionicPopup, $ionicLoading) {
        var
            code ,  //微信返回的code,
            qrId,
            plateformCode,
            isBackToPayDetail = false,
            popStateCount = 0,
        var userAgent = getUserAgent();
        var mstate = GetQueryString("state") || '';
        
        /**
        * 获取参数
        * */
        function GetQueryString(name) {
            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
            var r = window.location.search.substr(1).match(reg);
            if (r != null) {
                return unescape(r[2]);
            }
            return null;
        }
        /**
         * 设置cookie
         * key 设置的cookie名
         * value 设置的cookie值
         * expires  有效时间(小时)
         * */
        function setCookie(key, value, expires) {
            var exp = new Date();
            exp.setTime(exp.getTime() + expires * 60 * 60 * 1000);
            document.cookie = key + "=" + escape(value) + ";expires=" + exp.toGMTString();
        }
        /**
         * 获取cookie
         * */
        function getCookie(key) {
            if (document.cookie.length > 0) {
                var cookie_start = document.cookie.indexOf(key + "=");
                if (cookie_start !== -1) {
                    cookie_start = cookie_start + key.length + 1;
                    var cookie_end = document.cookie.indexOf(";", cookie_start);
                    if (cookie_end === -1) {
                        cookie_end = document.cookie.length;
                    }
                    return decodeURIComponent(document.cookie.substring(cookie_start, cookie_end));
                }
            }
            return "";
        }
        /**
        * 设置localStorage
        * */
        function setItem(key, value) {
            window.localStorage.setItem(key, JSON.stringify(value));
        }
        /**
        * 获取localStorage
        * */
        function getItem(key) {
            var item = window.localStorage.getItem(key) || '';
            if (item == '') {
                return item;
            } else {
                return JSON.parse(item);
            }
        }
        /**
        * 设置sessionStorage
        * */
        function setSessionItem(key, value) {
            window.sessionStorage.setItem(key, JSON.stringify(value));
        }
        /**
         * 获取sessionStorage
         * */
        function getSessionItem(key) {
            var item = window.sessionStorage.getItem(key) || '';
            if (item == '') {
                return item;
            } else {
                return JSON.parse(item);
            }
        }

        /**
         * ajax请求
         * method 请求方式 get or post
         * url 请求地址
         * data 请求参数
         * successCallback 请求成功后的回调方法
         * failCallback 请求成功后，返回false执行的方法
         * errMsg 请求失败弹出信息
         * */
        function ajax(method, url, data, successCallback, failCallback, finallyCallback, errMsg) {
            $ionicLoading.show({
                template: '<ion-spinner icon="ios"></ion-spinner><p style="margin:5px 0 0 0;">请等待···</p>'
            });
            if(userAgent == 'ali') {
                AP.getNetworkType(function(res){
                    if(!res.networkAvailable){
                        $ionicPopup.alert({
                            title: '网络连接失败',
                        });
                        $ionicLoading.hide();
                    }
                  });
            } else if(userAgent == 'wechat') {
                wx.getNetworkType({fail:function(res) {
                    $ionicPopup.alert({
                        title: '网络连接失败',
                    });
                    $ionicLoading.hide();
                  }
                });
            }


            $http({
                url: url,
                data: data,
                method: method
            }).success(function (data) {
                if (data.success == true) {
                    successCallback(data);
                } else {
                    if (failCallback) {
                        failCallback(data);
                    } else {
                        $ionicPopup.alert({
                            title: '提示信息',
                            template: data.errMsg || errMsg
                        });
                    }
                }
            }).error(function (data) {
                if (failCallback) {
                    failCallback(data);
                } else {
                    $ionicPopup.alert({
                        title: '提示信息',
                        template: data.errMsg || errMsg
                    });
                }
            }).finally(function (data) {
                if (finallyCallback) finallyCallback(data);
                $ionicLoading.hide();
            });
        }

       
        /**
         * 获取浏览器类型
         */
        function getUserAgent() {
            var userAgent = navigator.userAgent.toLowerCase()
            if (userAgent.indexOf('alipay') > -1) {
                return 'ali'
            } else if (userAgent.indexOf('micromessenger') > -1) {
                return 'wechat'
            }
            return ''
        }

      
       


        function closeWindow() {
            if (userAgent == 'ali') {
                AP && AP.popWindow();
            } else {
                WeixinJSBridge.call('closeWindow');
            }
        }

        return {
            code: code,
            qrId: qrId,
            plateformCode: plateformCode,
            ajax: ajax,
            setItem: setItem,
            getItem: getItem,
            setCookie: setCookie,
            getCookie: getCookie,
            setSessionItem: setSessionItem,
            getSessionItem: getSessionItem,
            GetQueryString: GetQueryString,
            isBackToPayDetail: isBackToPayDetail,
            userAgent : userAgent,
            popStateCount : popStateCount,
            closeWindow : closeWindow,
        };
    }