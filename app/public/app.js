var TugaApp = angular.module('TugaApp', [
    'ngRoute',
    'ngStorage',
    'angular-toasty',
]);

TugaApp.config(function($routeProvider, $locationProvider) {
        $routeProvider.
        when('/', {
            templateUrl: '/public/partials/home.html',
            controller: 'homeController',
            resolve: {
                loggedin: checkLoggedout
            }
        }).
        when('/dashboard', {
            templateUrl: '/public/partials/dashboard.html',
            controller: 'homeController',
            resolve: {
                loggedin: checkLoggedin
            }
        }).
        otherwise({
            redirectTo: '/'
        });

        $locationProvider.html5Mode(true);

    })
    .run(['$rootScope', '$location',
        function($rootScope, $location, $window) {
            $rootScope.$on('$routeChangeStart', function(e, curr, prev) {
                if (curr.$$route && curr.$$route.resolve) {
                    $rootScope.waiting = true;
                }
            });
            $rootScope.$on('$routeChangeSuccess', function(e, curr, prev) {
                setTimeout(function() {
                    $rootScope.waiting = false;
                    $rootScope.$digest();
                }, 1000);
            });
            $rootScope.$on('$routeChangeError',
                function(event, current, previous, rejection, $localStorage) {
                    setTimeout(function() {
                        $rootScope.waiting = false;
                        $rootScope.$digest();
                    }, 1000);
                    if (rejection.reject == false) {
                        $location.path('/');
                    } else {
                        $location.path('/dashboard');
                    }
                });
        }
    ]);

var afterLogServer = "http://localhost:7000/api";

var checkLoggedout = function($q, $http, $localStorage) {
    var deferred = $q.defer();
    $http.post(afterLogServer + '/authenticateClientRoute').success(function(response) {
        if (response.authentication == true) {
            deferred.reject({
                reject: true
            });
        } else {
            $localStorage.$reset();
            deferred.resolve();
        }
        return deferred.promise;
    })
    return deferred.promise;
};

var checkLoggedin = function($http, $q, $localStorage) {
    var deferred = $q.defer();
    $http.post(afterLogServer + '/authenticateClientRoute').success(function(response) {
        if (response.authentication == false) {
            deferred.reject({
                reject: false
            });
            $localStorage.$reset();
        } else {
            deferred.resolve();
        }
        return deferred.promise;
    })
    return deferred.promise;
};
