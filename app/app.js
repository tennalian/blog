import angular from 'angular';
import ngRoute from 'angular-route';
import './css/bootstrap.css';
import './styles.scss';

(function(){
    var blogApp = angular.module('blogApp',['ngRoute'])
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
            $routeProvider.when(site_prefix + '/add',
            {
                templateUrl: site_prefix + '/views/add.html',
                controller: 'createCtrl'
            });
            $routeProvider.when( site_prefix +'/posts/:id',
            {
                templateUrl: site_prefix +'/views/post.html',
                controller: 'postCtrl'
            });
            $routeProvider.otherwise({redirectTo: '/'});
        });


    blogApp.controller('mainCtrl', function($scope, $http, $location, posts, site_prefix) {
        $scope.refreshData = function(){
            $http.get(posts).success(function(data){
                 $scope.posts = data;
            });
        }

        $scope.viewAdd = function(){
            $location.path(site_prefix + '/add');
        }

        $scope.viewHome = function(){
            $location.path(site_prefix + '/');
        }
        $scope.refreshData();
    });

    blogApp.controller('postCtrl', function($scope, $http, $routeParams, posts, comments) {
        $http.get(posts+"/"+$routeParams.id).success(function(data){
            $scope.item = data;
        });

        $scope.limit = 3;
        $http.get(comments+'?postId='+$routeParams.id).success(function(data){
            $scope.comments = data.reverse();
        });

        $scope.newComment={};
        $scope.addComment = function(){
            $scope.newComment.postId = $routeParams.id;
            var res = $http.post(comments, $scope.newComment);
            res.success(function(data) {
                $scope.comments.push($scope.newComment);
                console.log($scope.newComment)
                $scope.newComment = {};
            });
        }

        $scope.showMore = function(){
            $scope.limit += 3;
        }

        // $scope.moreLimit = function(){
        //     return ($scope.comments.length > $scope.limit) ? true : false;
        // }

    });

    blogApp.controller('createCtrl', function($scope, $http, $location, posts, site_prefix) {
        $scope.title = 'Add post';
        $scope.newPost = {};
        $scope.addPost = function(){
            $scope.newPost.userId = 1;
            var res = $http.post(posts, $scope.newPost);
            res.success(function(data) {
                $scope.posts.push($scope.newPost);
                console.log($scope.newPost)
                $scope.newPost = {};
            });
        }
    });

})();

