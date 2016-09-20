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