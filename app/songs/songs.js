'use strict';

angular.module('myApp.songs', ['ngRoute', 'ngResource'])

.config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.when('/songs', {
            templateUrl: 'songs/songs.html',
            controller: 'SongsCtrl'
        });
    }
])

.controller('SongsCtrl', ['$scope', '$location', '$resource', '$http', 'Song', 'Data',
    function($scope, $location, $resource, $http, Song, Data) {

        if (!Data.visit) {
            if (!checkVisit()) {
                storeVisit($http, Data);
            } else {
                // this can occur with a page refresh (checkVisit returns true but Data.visit is gone)
                // find Visit
                findVisit($http, Data);
            }
        }

        $scope.sizes = [{
            code: 5,
            name: '5'
        }, {
            code: 10,
            name: '10'
        }, {
            code: 20,
            name: '20'
        }, {
            code: 50,
            name: '50'
        }];
        $scope.count = $scope.sizes[1];
        $scope.page = 0;
        $scope.sortTitle = 'asc';
        $scope.sortT = 'glyphicon-sort-by-alphabet';
        $scope.sortArtist = '';
        $scope.sortA = 'glyphicon-sort';
        $scope.s = false;

        $scope.songs = Song.query({
            count: $scope.count.code,
            page: $scope.page,
            filterArtist: '',
            filterTitle: '',
            sortingTitle: $scope.sortTitle
        });

        $scope.update = function() {
            Song.query({
                count: $scope.count.code,
                page: $scope.page,
                filterArtist: $scope.artist,
                filterTitle: $scope.title,
                sortingTitle: $scope.sortTitle,
                sortingArtist: $scope.sortArtist
            }).$promise.then(function(data){
                $scope.songs = data;
            });
        }

        $http.get('/namesandsongs/api/song/count', {
            params: {
                filterArtist: $scope.artist,
                filterTitle: $scope.title
            }
        })
            .success(function(data) {
                $scope.max = data;
            });

        $scope.artistFilter = function() {
            if (event.keyCode === 13) {
                $scope.s = true;
                filterArtist();
            } else {
                $scope.s = false;
            }
        }

        $scope.artistFilterBlur = function() {
            if (!$scope.s){
                filterArtist();
            }
        }

        function filterArtist() {
            $http.get('/namesandsongs/api/song/count', {
                params: {
                    filterArtist: $scope.artist,
                    filterTitle: $scope.title
                }
            })
                .success(function(data) {
                    $scope.max = data;
                });
            if ($scope.artist) {
                storeSearchInstruction($http, 'Artist: ' + $scope.artist, Data.visit);
            }
            $scope.page = 0;
            $scope.update();
        }

        $scope.titleFilter = function() {
            if (event.keyCode === 13) {
                $scope.s = true;
                filterTitle();
            } else {
                $scope.s = false;
            }
        }

        $scope.titleFilterBlur = function() {
            if (!$scope.s){
                filterTitle();
            }
        }

        function filterTitle() {
            $http.get('/namesandsongs/api/song/count', {
                params: {
                    filterArtist: $scope.artist,
                    filterTitle: $scope.title
                }
            })
                .success(function(data) {
                    $scope.max = data;
                });
            if ($scope.title) {
                storeSearchInstruction($http, 'Title: ' + $scope.title, Data.visit);
            }
            $scope.page = 0;
            $scope.update();
        }

        $scope.bla = function() {
            if ($scope.page == 0) {
                return true;
            }
            return false;
        };

        $scope.bla2 = function() {
            if (($scope.page + 1) * $scope.count.code > $scope.max) {
                return true;
            }
            return false;
        }

        $scope.srtTitle = function() {
            $scope.sortArtist = '';
            $scope.sortA = 'glyphicon-sort';
            if ($scope.sortTitle == 'asc') {
                $scope.sortTitle = 'desc';
                $scope.sortT = 'glyphicon-sort-by-alphabet-alt';
            } else {
                $scope.sortTitle = 'asc';
                $scope.sortT = 'glyphicon-sort-by-alphabet';
            }
            $scope.update();
        };

        $scope.srtArtist = function() {
            $scope.sortTitle = '';
            $scope.sortT = 'glyphicon-sort';
            if ($scope.sortArtist == 'asc') {
                $scope.sortArtist = 'desc';
                $scope.sortA = 'glyphicon-sort-by-alphabet-alt';
            } else {
                $scope.sortArtist = 'asc';
                $scope.sortA = 'glyphicon-sort-by-alphabet';
            }
            $scope.update();
        };

        $scope.first = function() {
            if ($scope.page != 0) {
                $scope.page = 0;
                $scope.update();
            }
        };

        $scope.previous = function() {
            if ($scope.page > 0) {
                $scope.page--;
                $scope.update();
            }
        };

        $scope.next = function() {
            $scope.page++;
            $scope.update();
        };

        $scope.last = function() {
            $scope.page = Math.floor($scope.max / $scope.count.code);
            if ($scope.max % $scope.count.code == 0) {
                $scope.page--;
            }
            $scope.update();
        };
    }
])

.factory('Song', ['$resource',
    function($resource) {
        return $resource('/namesandsongs/api/song/:id', {
            id: '@id'
        }, {
            query: {
                method: 'GET',
                params: {
                    page: '',
                    count: '',
                    sortingArtist: '',
                    sortingTitle: '',
                    filterArtist: '',
                    filterTitle: ''
                },
                isArray: true
            },
            get: {
                method: 'GET',
                params: {
                    id: ''
                },
                isArray: false
            },
            /*save: {
                method: 'POST',
                params: {
                    title: ''
                }
            },*/
            update: {
                method: 'PUT',
                params: {
                    artist: '',
                    title: ''
                }
            }
        });
    }
]);