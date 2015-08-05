'use strict';

angular.module('myApp.song', ['ngRoute', 'ngResource'])

.config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.when('/song/:songId', {
            templateUrl: 'song/song.html',
            controller: 'SongCtrl'
        });
    }
])

.controller('SongCtrl', ['$scope', '$location', '$http', '$routeParams', '$sce', 'SongDetail', 'Data',
    function($scope, $location, $http, $routeParams, $sce, SongDetail, Data) {

        if (!Data.visit) {
            if (!checkVisit()) {
                storeVisit($http, Data);
            } else {
                // this can occur with a page refresh (checkVisit returns true but Data.visit is gone)
                // find Visit
                findVisit($http, Data);
            }
        }

        $scope.song = SongDetail.get({
            id: $routeParams.songId
        }).$promise.then(function(data) {
            $scope.song = data;
            $scope.background = $sce.trustAsHtml($scope.song.background);
            // scroll to top
            $("html, body").animate({
                scrollTop: 0
            }, "slow");
        }, function(errorResponse) {
            console.log("Error...");
        });

        $(function() {
            $('.tooltip-test').tooltip({
                container: 'body'
            });
        });
    }
])

.factory('SongDetail', ['$resource',
    function($resource) {
        return $resource('/namesandsongs/api/song/:id', {}, {
            query: {
                method: 'GET',
                params: {
                    id: ''
                }
            }
        });
    }
]);