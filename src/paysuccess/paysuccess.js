/**
 * Created by 43241 on 2018/7/4.
 */
app.controller('paysuccessCtrl', function($scope, $state, $http, addressinfo, $ionicPopup, $stateParams, $ionicLoading) {
    $scope.back = function() {
        if(addressinfo.userAgent == 'ali'){
            AP && AP.popWindow();
        }else {
            wx.ready(function() {
                wx.closeWindow();
            });
        }
    };
    $scope.showTip = addressinfo.userAgent == 'wechat';
    if (!addressinfo.isBackToPayDetail) {
        addressinfo.isBackToPayDetail = true;
    }
    $scope.telephoneNum = $stateParams.telephoneNum;
    $scope.freeTime = $stateParams.freeTime;
});