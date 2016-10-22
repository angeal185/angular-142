// Ionic Starter App

var app = angular.module('ionicApp', ['ionic'])

    .run(function ($ionicPlatform, $rootScope, $state) {
        $rootScope.$state = $state;
        $ionicPlatform.ready(function () {
            setTimeout(function () {
                if (navigator && navigator.splashscreen) navigator.splashscreen.hide();
            }, 4000);
            if (window.cordova && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
                cordova.plugins.Keyboard.disableScroll(true);
            }
            if (window.StatusBar) {
                StatusBar.styleDefault();
            }
        });
    })


app.config(function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/')

    $stateProvider
        .state('home', {
            url: '/',
            templateUrl: 'home.html',
            controller: 'TodoCtrl'
        })
        .state('detail', {
            url: '/templates/detail/:id',
            templateUrl: 'templates/detail.html',
            controller: 'TodoCtrl'
        })
        .state('favorite', {
            url: '/',
            templateUrl: 'templates/favorite.html',
            controller: 'TodoCtrl'
        })
        .state('setting', {
            url: '/',
            templateUrl: 'templates/settings.html'
        })
})

app.controller('TodoCtrl', function ($scope, $http, $state, $stateParams, $filter) {

    $scope.initEvent = function () {
        if (typeof window.analytics !== "undefined") {
            window.analytics.trackEvent("Category", "Action", "Label", 25);
        }
    }

    if (window.localStorage['loadedData'] === "false") {
        $scope.tasks = JSON.parse(window.localStorage['post']);
    }
    else {
        $http.get('js/data.json').success(function (data) {
            window.localStorage['post'] = JSON.stringify(data);
            $scope.tasks = JSON.parse(window.localStorage['post']);
            window.localStorage['loadedData'] = "false";
        });
    }

    var index = $stateParams.id;
    $scope.details = function (id) {
        $state.go('detail', {id: id});
    }

    $scope.swipeLeft = function () {
        index++;
        getData(index);
    }

    $scope.swipeRight = function () {
        index--;
        getData(index);
    }

    var getData = function (index) {

        if (index) {
            var data = $scope.tasks.filter(function (item) {
                return item.id == index;
            });

            $scope.question = data[0].title;
            $scope.description = data[0].descr;
            $scope.fav = data[0].fav;

            if ($scope.fav == 1) {
                $scope.setfavicon = "ion-ios-star";
            }
            else {
                $scope.setfavicon = 'ion-ios-star-outline';
            }
        }
    }
    getData(index);

    $scope.setFav = function () {
        if ($scope.setfavicon == 'ion-ios-star-outline') {
            $scope.tasks[index - 1].fav = 1;
            $scope.tasks.$apply;
            window.localStorage['post'] = JSON.stringify($scope.tasks);
            $scope.setfavicon = "ion-ios-star";
        }
        else if ($scope.setfavicon == 'ion-ios-star') {
            $scope.tasks[index - 1].fav = 0;
            $scope.tasks.$apply;
            window.localStorage['post'] = JSON.stringify($scope.tasks);
            $scope.setfavicon = "ion-ios-star-outline";
        }
    }
});

  


