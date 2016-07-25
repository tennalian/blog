import angular from 'angular';
import ngRoute from 'angular-route';
import ngResource from 'angular-resource';
import './css/bootstrap.css';

(function(){
    var blogApp = angular.module('blogApp',['ngRoute','ngResource'])
        .constant('posts', 'https://jsonplaceholder.typicode.com/posts')
        .constant('comments', 'https://jsonplaceholder.typicode.com/comments')
        .constant('site_prefix', '/blog')
        .config(function($routeProvider, $locationProvider, site_prefix){
            $locationProvider.html5Mode({
              enabled: true,
              requireBase: false
            });
            $routeProvider.when(site_prefix + '/',
            {
                templateUrl: site_prefix + '/views/home.html',
            });
            $routeProvider.when(site_prefix + '/create',
            {
                templateUrl:site_prefix + 'views/create.html',
                controller: 'createCtrl'
            });
            $routeProvider.when( site_prefix +'/posts/:id',
            {
                templateUrl: site_prefix +'views/post.html',
                controller: 'postCtrl'
            });
            $routeProvider.otherwise({redirectTo: '/'});
        });


    blogApp.controller('mainCtrl', function($scope, $resource, $location, posts, site_prefix) {
        var refreshData = $resource(posts, {});
        $scope.posts = refreshData.query();

        $scope.viewCreate = function(){
            $location.path(site_prefix + '/create');
        }

        $scope.viewHome = function(){
            $location.path(site_prefix + '/');
        }
    });

    blogApp.controller('postCtrl', function($scope, $resource, $location, posts, $routeParams, site_prefix) {
        var post = $resource(posts+'/:postId', { postId: $routeParams.id});
        $scope.item = post.get();

    });

    blogApp.controller('createCtrl', function($scope, $resource, $location, posts, site_prefix) {
        $scope.title = 'Create post';
        var post = $resource(posts, {});
        $scope.addPost = function(){
            $scope.post = post.save($scope.item);
        }
    });

})();

