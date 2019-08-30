/**!checkes6 by Blubbll*/
var es6 = void 0 !== Array.from && void 0 !== Array.of && void 0 !== Math.acosh && void 0 !== Math.hypot && void 0 !== Math.imul && void 0 !== Number.isInteger && void 0 !== Number.isNaN && void 0 !== Number.EPSILON && void 0 !== Object.assign && void 0 !== Promise && void 0 !== Proxy && void 0 !== Map && void 0 !== Set && void 0 !== WeakMap && void 0 !== WeakSet && void 0 !== Symbol;
if (!es6) {
    alert("Your browser is too shitty, please update it.");
    throw ("browser too old.")
}
//imports
const angular = window.angular,
    swal = window.swal;
//https://stackoverflow.com/a/23176223
var showOffline = function() {
    var status = (
        '<h2><u>Status</u>: </h2>' +
        'Shit went down boi' + '<br/>' +
        '&copy; by Blubbll'
    );
    document.body.innerHTML = status;
}
var msg = {
    clientConnect: "Client connected to server",
    clientDisconnect: "Client lost connection to server"
}
//browserchannel
var socket = window.BCSocket('/channel', {
    reconnect: true,
    debug: false
});
socket.onopen = function() {
    if (socket.readyState === socket.OPEN)
        socket.send({
            aktion: "ping"
        });
};
//server response
socket.onmessage = function(msg) {
    switch (msg) {
        case 'pong':
            {
                console.log("Server said " + msg);
            }
    }
};
socket.onclose = function(message) {
    showOffline();
};
"use strict";
[function() {
    var $root = {};
    window.root = $root;
    //$root.currentuser = {name: "test", id: "43432-432432-432432"}



    var loader = setInterval(function() {


        if (null === document.documentElement.innerText.match(/{{.*}}/g)) {
            $(".loader").remove();
            $("#wrapper")[0].setAttribute("style", null);
        }
        clearInterval(loader);

    }, 500);

    $root.logout = function() {
        console.log("bye")
    }
    var app = angular.module('znwgg', ['xeditable', 'ngRoute', 'ngAnimate']);
    app.controller('app', function($scope, $rootScope) {

        $root.setUser = function(user) {
            $scope.user = user;
        }

        $root.updateGui = function() {
            $scope.$digest();
        }

    });
    app.controller('gamechanger', function($scope, $filter) {
        $scope.user = {
            game: 'none'
        };
        //$scope.user = {
        //  game: 'mc'
        //}; 
        $scope.games = [{
                value: 'cw',
                text: 'Cube World'
            },
            {
                value: 'mc',
                text: 'Minecraft'
            },
            {
                value: 3,
                text: 'status3'
            },
            {
                value: 4,
                text: 'status4'
            }
        ];
        $scope.changeGame = function() {
            var selected = $filter('filter')($scope.games, {
                value: $scope.user.game
            });
            if (selected.length === 0)
                $('.editable-controls>select>option[value="?"]').text("Not set");

            //option
            if (selected.length === 1 && $root.currentGame !== selected[0].value) {
                var val = selected[0].value;
                $scope.user.game = val;
                $root.currentGame = val;
            }
            return ($scope.user.game && selected.length) ? selected[0].value : 'Not set';
        };
    });
    app.config(function($routeProvider) {
        var $base = '/views';
        /* .when("/start", {
             templateUrl: $base + "/start.htm"
         })
         */
        $routeProvider.when('/:page/:name*', {
            templateUrl: function(urlattr) {
                return $base + '/' +
                    urlattr.page + '/' + urlattr.name + '.htm';
            },
        }).when('/:page', {
            templateUrl: function(urlattr) {
                return $base + '/' + urlattr.page + '.htm';
            },
        });
    });
    //Nach ngRoute-Navigation fixedNav refreshen
    app.controller('views', function($scope, $location, $rootScope, $log, $route, $http) {
        $root.refreshView = function() {
            $route.reload();
        };
        //Wenn View geladen ist
        $scope.$watch('$viewContentLoaded', function() {
            //$scope.loaded === void 0 ? [$("[data-loading-text]").remove(), $scope.loaded = true] : [];
        });
        //Zu einem View gehen
        $root.gotoView = function(view) {
            location.hash = decodeURIComponent("#!") + view;
            //Views sollten immer mit nem Slash beginnen...
            !view.startsWith("/") && [view = "/" + view];
            //Buttons inaktiv machen
            $($.navElem).removeClass("active");
            //Navbutton, der mit View übereinstimmt, aktiv machen
            $($.navElem + '[data-href="' + view + '"]').addClass("active");
        };
        //setTimeout($root.gotoView("/account/overview"), 999)
        //Aktuellen View-Namen erhalten (Anwendungspfad)
        $root.getView = function() {
            return $location.$$path;
        };
        //Bei Navigation
        $rootScope.$on("$locationChangeStart", function(event, next, current) {

            $("#sidebar-wrapper>nav").addClass("loading");
            switch (next.split('#!')[1]) {
                case '/logout':
                    {
                        event.preventDefault();
                        $("#sidebar-wrapper>nav").removeClass("loading");
                        swal({
                            title: "Are you sure?",
                            text: "Please confirm your logout.",
                            icon: "warning",
                            buttons: true,
                            dangerMode: true,
                        })
                        .then((doLogout) => {
                            if (doLogout) $root.logout();
                        });
                    }
                    break;
            }
            //$.fixUrl();
        });
        //Routenwechsel schlägt fehl.
        $rootScope.$on("$routeChangeError", function(errorReloadMsg) {
            console.log("Navigation fehlgeschlagen.\n" + errorReloadMsg);
            //location.reload();
        });
        //Bei erfolgreichem Routenwechsel
        $rootScope.$on("$routeChangeSuccess", function(event, current, previous) {

            //wohin gehen wir?
            //console.log(current.$$route)
            $root.refreshNavi();
            switch (current.$$route.originalPath) {
                case "/":
                    {
                        console.log("willkommen beim uploader");
                        //$3.uploader.init();
                    }
                    break;
                case "/archive":
                    {
                        //$3.archive.init();
                        //$3.archive.getData();
                        //$3.debug(sn, "willkommen beim archive");
                    }
                    break;
            }
        });
    });
    //Nach ngRoute-Navigation fixedNav refreshen
    app.controller('nav', ['$scope', '$http', function($scope, $http) {

        $root.refreshNavi = function() {
            var path = $root.getView();
            if (path === "/") path = "/start";

            //only first layer
            path = '/' + path.split("/")[1];

            if ($root.currentGame !== void 0) path = '/' + $root.currentGame;

            $scope.path = path;
            $scope.links = [];
            $http({
                method: 'GET',
                url: '/menu' + path + ".json"
            }).then(function(res) {
                for (var i in res.data) {
                    var link = res.data[i];
                    $scope.links.push({
                        href: link.href.replace("$", path.split("/")[1]),
                        text: link.text
                    });
                    setTimeout(function() {
                        $("#sidebar-wrapper>nav").removeClass("loading");
                    }, 50)
                }
            }, function(error) {});
        };



    }]);
}()];