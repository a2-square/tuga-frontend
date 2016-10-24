TugaApp.controller('homeController', ['$scope', '$http', '$location', '$localStorage', 'toasty', '$rootScope', '$window',
    function($scope, $http, $location, $localStorage, toasty, $rootScope, $window) {

        /////////////////////////Config and Default Portion////////////////////////////

        var beforeLogServer = "http://localhost:7000";
        var afterLogServer = "http://localhost:7000/api"

        $scope.userData = $localStorage.userData;

        //////////////////////////////////////////////////////////////////////////////

        $scope.signup = function(data) {
            $rootScope.waiting = true;
            $http.post(beforeLogServer + '/signup', data).success(function(response) {
                $rootScope.waiting = false;
                if (response.authentication == true) {
                    $scope.userSignupForm = false;
                    toasty.info({
                        title: 'SignUp Notification',
                        msg: data.firstName + ' have successfully registered',
                        showClose: true,
                    });
                } else {
                    toasty.error({
                        title: 'SignUp Notification',
                        msg: response.message,
                        showClose: true,
                    })
                }
            });
        }

        $scope.login = function(data, type) {
            if (type == "linkedin") {
                window.open(beforeLogServer + '/auth/linkedin', "_blank", "height=350px,width=750px,alwaysRaised=yes");

                /*            $rootScope.waiting = true;
                            $http.get(beforeLogServer + '/auth/linkedin').success(function(response) {
                                $rootScope.waiting = false;
                                if (response.authentication == true) {
                                    $location.path('/dashboard');
                                    toasty.info({
                                        title: 'Login Notification',
                                        msg: response.message,
                                        showClose: true,
                                    })
                                } else {
                                    toasty.error({
                                        title: 'Login Notification',
                                        msg: response.message,
                                        showClose: true,
                                    })
                                }

                            })
                */
            } else if (type == "facebook") {
                window.open(beforeLogServer + '/auth/facebook', "_blank", "height=450px,width=850px,alwaysRaised=yes");
                //$rootScope.waiting = true;
                /*            $http.get(beforeLogServer + '/auth/facebook').success(function(response) {
                                $rootScope.waiting = false;
                                if (response.authentication == true) {
                                    $location.path('/dashboard');
                                    toasty.info({
                                        title: 'Login Notification',
                                        msg: response.message,
                                        showClose: true,
                                    })
                                } else {
                                    toasty.error({
                                        title: 'Login Notification',
                                        msg: response.message,
                                        showClose: true,
                                    })
                                }

                            })*/

            } else {
                $rootScope.waiting = true;
                $http.post(beforeLogServer + '/login', data).success(function(response) {
                    $rootScope.waiting = false;
                    if (response.authentication == true) {
                        $localStorage.userData = response.data;
                        $http.defaults.headers.common['access_token'] = response.access_token;
                        $location.path('/dashboard');
                    } else {
                        toasty.error({
                            title: 'Login Notification',
                            msg: response.message,
                            showClose: true,
                        })
                    }

                })

            }
        }

        $scope.logout = function() {
            $rootScope.waiting = true;
            $http.get(afterLogServer + '/logout').success(function(response) {
                $http.defaults.headers.common['access_token'] = " ";
                if (response.authentication == true) {
                    $location.path('/');
                    toasty.info({
                        title: 'Logout Notification',
                        msg: 'logout successfully',
                        showClose: true,
                    });
                } else {
                    $rootScope.waiting = false;
                    toasty.error({
                        title: 'logout Notification',
                        msg: response.message,
                        showClose: true,
                    })
                }
            })
        }

        $scope.clear = function() {
            $scope.sign_up_form.$submitted = false;
            $scope.login_form.$submitted = false;
            $scope.userSignUpData = "";
            $scope.userLoginData = "";
        }

    }
]);
