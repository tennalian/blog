import angular from 'angular';
import ngRoute from 'angular-route';
import './css/bootstrap.css';
import './styles.scss';

(function(){
    var blogApp = angular.module('blogApp',['ngRoute'])
        .constant('posts', 'https://jsonplaceholder.typicode.com/posts')
        .constant('comments', 'https://jsonplaceholder.typicode.com/comments')
        .constant('site_prefix', '')
        .config(function($routeProvider, $locationProvider, site_prefix){
            $locationProvider.html5Mode({
              enabled: true,
            });
            $routeProvider.when(site_prefix + '/blog',
            {
                templateUrl: site_prefix + '/views/home.html',
            });
            $routeProvider.when(site_prefix + '/add',
            {
                templateUrl: site_prefix + '/views/add.html',
                controller: 'createCtrl'
            });
            $routeProvider.when(site_prefix+'/posts/:id',
            {
                templateUrl: site_prefix + '/views/post.html',
                controller: 'postCtrl'
            });
            $routeProvider.otherwise({redirectTo: '/'});
        });


    blogApp.controller('mainCtrl', function($scope, $http, $location, posts, comments, site_prefix) {


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

        $scope.viewAdd = function(){
            $location.path(site_prefix + '/add');
        }

        $scope.viewHome = function(){
            $location.path(site_prefix + '/');
        }
    });

    blogApp.controller('postCtrl', function($scope, $http, $routeParams, $location, comments, posts, site_prefix) {

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
            $scope.newComment.id = $scope.posts.length + 1;

            var res = $http.post(comments, $scope.newComment);
            res.success(function(data) {
                console.log($scope.newComment);
                $scope.comments.push($scope.newComment);
                $scope.newComment = {};
                localStorage.setItem('comments', JSON.stringify($scope.comments));
            });
        }

        $scope.showMore = function(){
            $scope.limit += 3;
        }




    });

    blogApp.controller('createCtrl', function($scope, $http, $location, posts, site_prefix) {
        $scope.title = 'Add post';

        $scope.addPost = function(){
            $scope.newPost.userId = 1;
            $scope.newPost.id = $scope.posts.length + 1;
            var res = $http.post(posts, $scope.newPost);
            res.success(function(data) {
                console.log($scope.newPost);
                $scope.posts.push($scope.newPost);
                $scope.newPost = {};
                localStorage.setItem('posts', JSON.stringify($scope.posts));
                $location.path(site_prefix + '/');
            });
        }
    });

})();

