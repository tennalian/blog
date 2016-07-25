import angular from 'angular';
import ngRoute from 'angular-route';
import ngResource from 'angular-resource';
import './css/bootstrap.css';

(function(){
    var blogApp = angular.module('blogApp',['ngRoute','ngResource'])
        .constant('posts', 'https://jsonplaceholder.typicode.com/posts')
        .constant('comments', 'https://jsonplaceholder.typicode.com/comments')
        .config(function($routeProvider, $locationProvider){
            $locationProvider.html5Mode({
              enabled: true,
              requireBase: false
            });
            $routeProvider.when('/blog',
            {
                templateUrl:'/blog/views/home.html',
            });
            $routeProvider.when('/blog/create',
            {
                templateUrl:'/blog/views/create.html',
                controller: 'createCtrl'
            });
            $routeProvider.when('/blog/posts/:id',
            {
                templateUrl:'/blog/views/post.html',
                controller: 'postCtrl'
            });
            $routeProvider.otherwise({redirectTo: '/'});
        });


    blogApp.controller('mainCtrl', function($scope, $resource, $location, posts) {
        var refreshData = $resource(posts, {});
        $scope.posts = refreshData.query();

        $scope.viewCreate = function(){
            $location.path('/blog/create');
        }

        $scope.viewHome = function(){
            $location.path('/blog');
        }
    });

    blogApp.controller('postCtrl', function($scope, $resource, $location, posts, $routeParams) {
        var post = $resource(posts+'/:postId', { postId: $routeParams.id});
        $scope.item = post.get();

    });

    blogApp.controller('createCtrl', function($scope, $resource, $location, posts) {
        $scope.title = 'Create post';
        var post = $resource(posts, {});
        $scope.addPost = function(){
            $scope.post = post.save($scope.item);
        }
    });

})();

