TugaApp.controller('homeController',['$scope', '$http', '$location', '$localStorage', 'toasty', '$rootScope', 
    function($scope, $http, $location, $localStorage, toasty, $rootScope) {

    var server = "http://localhost:7000";

    $scope.signup = function(data) {
        $rootScope.waiting = true;
        $http.post(server + '/signup', data).success(function(response) {
            if (response.authentication == true) {
                $scope.userSignupForm = false;
                toasty.info({
                    title: 'SignUp Notification',
                    msg: data.firstName + ' have successfully registered',
                    showClose: true,
                });
            } else {
                $rootScope.waiting = false;
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
        window.open(server + '/auth/linkedin',"_blank", "height=350px,width=750px,alwaysRaised=yes");

/*            $rootScope.waiting = true;
            $http.get(server + '/auth/linkedin').success(function(response) {
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
            window.open(server + '/auth/facebook',"_blank", "height=350px,width=750px,alwaysRaised=yes");
            //$rootScope.waiting = true;
/*            $http.get(server + '/auth/facebook').success(function(response) {
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
            $http.post(server + '/login', data).success(function(response) {
                if (response.authentication == true) {
                    $location.path('/dashboard');
                    toasty.info({
                        title: 'Login Notification',
                        msg: response.message,
                        showClose: true,
                    })
                } else {
                    $rootScope.waiting = false;
                    toasty.error({
                        title: 'Login Notification',
                        msg: response.message,
                        showClose: true,
                    })
                }

            })

        }
    }


    $scope.logout = function(){
        $rootScope.waiting = true;
        $http.get(server +'/logout').success(function(response){
            if(response.authentication==true){
                $location.path('/');
                toasty.info({
                    title: 'Logout Notification',
                    msg: 'logout successfully',
                    showClose: true,
                });
            }else{
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

}]);