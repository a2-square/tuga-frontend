var TugaApp = angular.module('TugaApp', [
    'ngRoute',
    'ngStorage',
    'angular-toasty'
]);

TugaApp.config(function($routeProvider, $locationProvider) {
        $routeProvider.
        when('/', {
            templateUrl: '/public/partials/home.html',
            controller: 'homeController'
        }).
        when('/dashboard', {
            templateUrl: '/public/partials/dashboard.html',
            controller: 'homeController'
        }).
        otherwise({
            redirectTo: '/'
        });

        $locationProvider.html5Mode(true);

    })
    .run(['$rootScope', '$location',
        function($rootScope, $location) {
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
                });
        }
    ]);