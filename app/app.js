import angular from 'angular';
import ngRoute from 'angular-route';
import ngInfiniteScroll from 'ng-infinite-scroll';
import 'angular-scroll-animate';
import './css/bootstrap.css';
import './styles.scss';

(function(){
    var app = angular.module('app',['ngRoute', 'infinite-scroll', 'angular-scroll-animate'])
        .constant('posts', 'https://jsonplaceholder.typicode.com/posts')
        .constant('comments', 'https://jsonplaceholder.typicode.com/comments')
        .config(function($routeProvider, $locationProvider){
            $locationProvider.html5Mode({
              enabled: true,
              requireBase: false
            });
            $routeProvider.when( '/',
            {
                templateUrl: 'views/home.html',
            });
            $routeProvider.when('/add',
            {
                templateUrl: 'views/add.html',
                controller: 'createCtrl'
            });
            $routeProvider.when('/posts/:id',
            {
                templateUrl: 'views/post.html',
                controller: 'postCtrl'
            });
            $routeProvider.otherwise({redirectTo: '/'});
        });

    app.controller('mainCtrl', function($scope, $http, $location, posts, comments) {

        if (localStorage.getItem('posts')!== null){
            $scope.posts = JSON.parse(localStorage.getItem('posts'));
        }
        else{
            $http.get(posts).success(function(data){
               $scope.posts = data;
               localStorage.setItem('posts', JSON.stringify($scope.posts));
            });
        }

        if (localStorage.getItem('comments')!== null){
            $scope.comments = JSON.parse(localStorage.getItem('comments'));
        }
        else{
            $http.get(comments).success(function(data){
               $scope.comments = data;
               localStorage.setItem('comments', JSON.stringify($scope.comments));
            });
        }

        $scope.data = $scope.posts.slice(0, 13);
        $scope.getMoreData = function () {
            $scope.data = $scope.posts.slice(0, $scope.data.length + 5);
        }
        $scope.animateElementIn = function($el) {
            $el.removeClass('hidden');
            $el.addClass('animated fadeInUp');
        };

        $scope.commentsLimit = 3;

    });

    app.controller('postCtrl', function($scope, $http, $routeParams, $location, comments, posts) {

        for(var i=0;i<$scope.posts.length;i++){
            if ($scope.posts[i].id == $routeParams.id){
                $scope.item =  $scope.posts[i];
            }
        }

        $scope.limit = 3;
        $scope.postComments = [];
        for(var i=0;i<$scope.comments.length;i++){
            if ($scope.comments[i].postId == $routeParams.id){
                $scope.postComments.push($scope.comments[i]);
            }
        }

        $scope.addComment = function(){
            $scope.newComment.postId = +$routeParams.id,
            $scope.newComment.id = $scope.comments.length + 1;
            var res = $http.post(comments, $scope.newComment);
            res.success(function(data) {
                console.log($scope.newComment);
                $scope.comments.push($scope.newComment);
                $scope.postComments.push($scope.newComment);
                $scope.newComment = {};
                localStorage.setItem('comments', JSON.stringify($scope.comments));
            });
        }

        $scope.showMore = function(){
            $scope.limit += 3;
        }
    });

    app.controller('createCtrl', function($scope, $http, $location, posts) {
        $scope.title = 'Add post';

        $scope.addPost = function(){
            $scope.newPost.userId = 1;
            $scope.newPost.id = $scope.posts.length + 1;
            var res = $http.post(posts, $scope.newPost);
            res.success(function(data) {
                console.log($scope.newPost);
                $scope.posts.unshift($scope.newPost);
                $scope.newPost = {};
                localStorage.setItem('posts', JSON.stringify($scope.posts));
                $scope.getMoreData();
                $location.path('/');
            });
        }
    });
})();

