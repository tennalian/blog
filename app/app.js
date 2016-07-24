(function(){
    var blogApp = angular.module('blogApp',['ngRoute'])
        .constant('baseUrl', 'http://jsonplaceholder.typicode.com/posts')
        .config(function($routeProvider, $locationProvider){
            $locationProvider.html5Mode({
              enabled: true,
              requireBase: false
            });
            $routeProvider.when('/',
            {
                templateUrl:'/views/home.html',
            });
            $routeProvider.when('/create',
            {
                templateUrl:'/views/create.html',
                controller: 'createCtrl'
            });
            $routeProvider.when('/posts/:id',
            {
                templateUrl:'/views/post.html',
                controller: 'postCtrl'
            });
            $routeProvider.otherwise({redirectTo: '/'});
        });


    blogApp.controller('mainCtrl', function($scope, $http, $location, baseUrl) {
        $scope.refreshData = function(){
            $http.get(baseUrl).success(function(data){
                $scope.posts = data;
            });
        }


        $scope.viewCreate = function(){
            $location.path('/create');
        }

        $scope.viewHome = function(){
            $location.path('/');
        }

         $scope.refreshData();
    });

    blogApp.controller('postCtrl', function($scope, $http, $location, baseUrl, $routeParams) {
        $http.get(baseUrl+"/"+$routeParams.id).success(function(data){
            $scope.item = data;
        });
    });

    blogApp.controller('createCtrl', function($scope, $http, $location, baseUrl) {
        $scope.title = 'Create post';

        var id = +$scope.posts.length;

        $scope.item = {};
        $scope.item.userId = 1;
        $scope.createPost = function(){
            var res = $http.post(baseUrl, $scope.item);
            res.success(function(data) {
                $location.path('/posts/' + id);
            });

        }
    });

})();

