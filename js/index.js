var app = angular.module('app', ["firebase"])
  .controller('appCtrl', function($scope, $firebase) {

    var ref = new Firebase("https://discovery4kassets.firebaseio.com/assets");
    var sync = $firebase(ref);

    var refSessions = new Firebase("https://discovery4kassets.firebaseio.com/sessions");
    var session = $firebase(refSessions);

    $scope.sessions = session.$asArray();
    $scope.DB = sync.$asArray();
    var unwatch = $scope.sessions.$watch(function() {
      console.log("data changed!");
      if ($scope.playSession) {
        console.log($scope.playSession);
        var now = new Date().getTime();
        if ($scope.playSession.time + 60 * 1000 > now) $scope.setVideoSrc($scope.playSession.active);
      }
    });
    $scope.$on("$destroy", function() {
      if (unwatch) {
        console.log("removing watch!");
        unwatch();
      }
    });
    $scope.title = 'Demo Discovery HDR/SDR';
    $scope.categories = ['HDR', 'SDR']

    $scope.app = {
      src: '',
      title: '',
      category: '',
      thumbnail: ''
    }

    $scope.add = function() {
      $scope.DB.$add($scope.app);
      $scope.app = {
        src: '',
        title: '',
        category: '',
        thumbnail: ''
      }

    }
    

    angular.element(document).ready(function() {
        console.log("adding video events ");
        var myvideo = document.getElementById('myvideo');
        var media_events = new Array();
        media_events["loadstart"] = 0;
        media_events["progress"] = 0;
        media_events["suspend"] = 0;
        media_events["abort"] = 0;
        media_events["error"] = 0;
        media_events["emptied"] = 0;
        media_events["stalled"] = 0;
        media_events["loadedmetadata"] = 0;
        media_events["loadeddata"] = 0;
        media_events["canplay"] = 0;
        media_events["canplaythrough"] = 0;
        media_events["playing"] = 0;
        media_events["waiting"] = 0;
        media_events["seeking"] = 0;
        media_events["seeked"] = 0;
        media_events["ended"] = 0;
        media_events["durationchange"] = 0;
        media_events["timeupdate"] = 0;
        media_events["play"] = 0;
        media_events["pause"] = 0;
        media_events["ratechange"] = 0;
        media_events["resize"] = 0;
        media_events["volumechange"] = 0;
        for (key in media_events) {
           
            myvideo.addEventListener(key, function(event){console.log(event.type+":"+JSON.stringify(event));}, false);
        
        }
    });
    $scope.edit = function(value) {
      $scope.app = value
    }
    $scope.delete = function(item) {
      $scope.DB.$remove(item)
    }
    $scope.changedValue = function(item) {
      $scope.playSession = item;
    }
    $scope.setVideoSrc = function(src) {
      var myvideo = document.getElementById('myvideo');
      if (!myvideo.paused) {

        myvideo.pause();
      }
      myvideo.src = src;
      myvideo.play();
    }
    $scope.play = function(item) {
      console.log(JSON.stringify(item));
      $scope.setVideoSrc(item.src);
      if ($scope.playSession) {
        $scope.playSession.active = item.src;
        $scope.playSession.time = new Date().getTime();
        console.log($scope.playSession);
        $scope.sessions.$save($scope.playSession).then(function() {
          console.log("updated playing url");
        });
      }
    }

  });

    app.filter('trusted', ['$sce', function ($sce) {
    return function(url) {
        return $sce.trustAsResourceUrl(url);
        };
    }]);
    console.log = (function (old_function, div_log) { 
    return function (text) {
        old_function(text);
        var msg;
        if (typeof text === 'string' || text instanceof String)
            msg = text;
        else
            msg = JSON.stringify(text);
        div_log.innerHTML += "<p>"+new Date()+" : "+msg+"</p>";
    };
} (console.log.bind(console), document.getElementById("logs")));