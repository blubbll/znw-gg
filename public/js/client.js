/**!checkes6 by Blubbll*/
var es6 = void 0 !== Array.from && void 0 !== Array.of && void 0 !== Math.acosh && void 0 !== Math.hypot && void 0 !== Math.imul && void 0 !== Number.isInteger && void 0 !== Number.isNaN && void 0 !== Number.EPSILON && void 0 !== Object.assign && void 0 !== Promise && void 0 !== Proxy && void 0 !== Map && void 0 !== Set && void 0 !== WeakMap && void 0 !== WeakSet && void 0 !== Symbol;

var angular = window.angular;

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
  
    var app = angular.module('znwgg', ["xeditable", "ngRoute"]);
    app.controller('app', function($scope) {
        $scope.user = "test"
    });
    app.controller('gamechanger', function($scope, $filter) {
        $scope.user = {};

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
            if(selected.length===1 && $scope.user.game !== selected)
            {
              $scope.user.game=selected;
              console.log(selected[0].value)
            }
            return ($scope.user.game && selected.length) ? selected[0].value : 'Not set';
        };
    });

    app.config(function($routeProvider) {
        var $base = '/views';
        //Navigations-Templates festlegen
        $routeProvider
            .when("/start", {
                templateUrl: $base + "/start.htm"
            })
            .when("/cw", {
                templateUrl: $base + "/archive.htm"
            })
            .when("/archive", {
                templateUrl: $base + "/archive.htm"
            })
            .when("/account", {
                templateUrl: $base + "/account.htm"
            })
      ;
    });
  
  
      //Nach ngRoute-Navigation fixedNav refreshen
    app.controller('views', function ($scope, $location, $rootScope, $log, $route, $http) {
        //$.refreshView = function () {
        //    $(".toast").toast("hide").find(".toast-body").html(String.Empty);
        //    $route.reload();
        //};
      
        //Wenn View geladen ist
        $scope.$watch('$viewContentLoaded', function () {
            //$scope.loaded === void 0 ? [$("[data-loading-text]").remove(), $scope.loaded = true] : [];
        });

        //Zu einem View gehen
        $root.gotoView = function (view) {
            location.hash = decodeURIComponent("#!") + view;

            //Views sollten immer mit nem Slash beginnen...
            !view.startsWith("/") && [view = "/" + view];

            //Buttons inaktiv machen
            $($.navElem).removeClass("active");

            //Navbutton, der mit View übereinstimmt, aktiv machen
            $($.navElem + '[data-href="' + view + '"]').addClass("active");
        };

        setTimeout($root.gotoView("/account"),999)
      
        //Aktuellen View-Namen erhalten (Anwendungspfad)
        $root.getView= function () {
            return $location.$$path;
        };

        //Bei Navigation
        $rootScope.$on("$locationChangeStart", function (event, next, current) {
            //$.fixUrl();
        });

        //Routenwechsel schlägt fehl.
        $rootScope.$on("$routeChangeError", function (errorReloadMsg) {
            alert("Navigation fehlgeschlagen.\n" + errorReloadMsg);
            location.reload();
        });

        //Bei erfolgreichem Routenwechsel
        $rootScope.$on("$routeChangeSuccess", function (event, current, previous) {
            //wohin gehen wir?
            console.log(current.$$route)
            switch (current.$$route.originalPath) {
                case "/": {
                    console.log("willkommen beim uploader");
                    //$3.uploader.init();
                } break;
                case "/archive": {
                    //$3.archive.init();
                    //$3.archive.getData();
                    //$3.debug(sn, "willkommen beim archive");
                } break;
            }
            //setTimeout($3.fixedNav.refresh(), 0);
        });
    });
  
      //Nach ngRoute-Navigation fixedNav refreshen
    app.controller('nav', ['$scope', '$http', function ($scope, $http) {
    
        function getFromServer(){
          var path = $root.getView();
          
          $scope.path = path;
          
           $scope.links = [];
           $scope.links.push({
                      "href": "/start",
                      "text": "Start"
                  })
          
          if(path === "/")path="/start"
            $http({
                method: 'GET',
                url: '/menu' + path + ".json"
             }).then(function (res){
                  
                    for(var i in res.data){
                        $scope.links.push(res.data[i])
                    }
                    
              
               $scope.links.push({
                      "href": "/account",
                      "text": "Account"
                  })
              
             },function (error){

             });
          
          
        };
      
      setTimeout(getFromServer,0);
      
     }]);
  

  
}()];