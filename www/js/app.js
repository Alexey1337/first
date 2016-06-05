angular.module('Your assistant', ['ionic'])



.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

.controller('TESTCtrl',function( $scope,$ionicModal, $timeout){

  if(! angular.isUndefined(window.localStorage['tasks'])){
      $scope.tasks = JSON.parse(window.localStorage['tasks']);
  } else{
    $scope.tasks = [
        
   ];
  }

    if(! angular.isUndefined(window.localStorage['enter'])){
      $scope.taken = JSON.parse(window.localStorage['enter']);

  } else{
    $scope.taken = [
        
   ];
  }
     
 $ionicModal.fromTemplateUrl('views/task.html',function(modal){
      $scope.taskModal = modal;
      },{
        scope: $scope,
        animation: 'slide-in-up'
   });

   $scope.currentTaskId =-1;

   $scope.addNewTask = function(){
    $scope.activeTask = {
      title:'',
      description:'',
      done: false
    }
    $scope.taskModal.show();
     $scope.currentTaskId = -1;
   }

   $scope.closeTask = function(){
    $scope.taskModal.hide();
   }

$scope.openTask = function( id , name){
  $scope.currentTask = name;
  if(! angular.isUndefined(window.localStorage['enter' + name])){
      $scope.taken = JSON.parse(window.localStorage['enter' + name]);

  } else{
    $scope.taken = [
        
   ];
  }
    var task = $scope.tasks[id];
    $scope.activeTask = {
      title: task.title,
      description: task.description,
      done: task.done
    }
    $scope.currentTaskId = id;
    $scope.taskModal.show();
  }

   $scope.deleteTask = function(id){
      $scope.tasks.splice(id,1);
      saveItems();
   }

$scope.submitTask = function(task) {
    if($scope.currentTaskId ==-1){
      $scope.tasks.push({
        title: task.title,
        description: task.description,
        done: task.done
      });
    } else {
      var id = $scope.currentTaskId;
      $scope.tasks[id].title = task.title;
      $scope.tasks[id].description = task.description;
      $scope.tasks[id].done = task.done;
    }

    saveItems();

    $scope.taskModal.hide();
   }

    $scope.saveTasks = function(){
      $timeout(function(){
      saveItems();
    });
    }

   function saveItems(){
    window.localStorage['tasks'] = angular.toJson($scope.tasks);
   }



})

.controller('clickCtrl', function($scope, $ionicActionSheet, $timeout) {

 // Triggered on a button click, or some other target
 $scope.show = function() {

   // Show the action sheet
   var hideSheet = $ionicActionSheet.show({
     buttons: [
       { text: '<span>Выбрать как текущую</span>' },
       { text: '<span>Отметить как пройденную</span>' }
     ],
     titleText: '<b>Опции</b>',
     cancelText: 'Cancel',
     cancel: function() {
      console.log('cancel');
        },
     buttonClicked: function(index) {
      if(index === 0) {
        console.log('vibrano');
       return true;
      }
      if(index === 1) {
        console.log('otmetit');
        return true;
      }

     }
   });

   // For example's sake, hide the sheet after two seconds
   $timeout(function() {
     hideSheet();
   }, 20000);

 };
})

.controller('taskCtrl', ['$scope', '$timeout', function($scope, $timeout) {
$scope.init = function(memes) {
}
  $scope.showContent = function($fileContent){
        $scope.content = '<li class="item memes">' + $fileContent.replace(/(?:\r\n|\r|\n)/g, '</li><li class="item memes">' );
        $scope.data = [];  
        $timeout(function() {
          $( "li.memes" ).each(function( index ) {
            $scope.data.push({title: $( this ).text()});
          });
        }, 10);
    };

    $scope.saveNetTask = function() {
        window.localStorage['enter' + $scope.currentTask] = angular.toJson($scope.data);
    }
}])

.directive('onReadFile', function ($parse) {
  return {
    restrict: 'A',
    scope: false,
    link: function(scope, element, attrs) {
            var fn = $parse(attrs.onReadFile);
            
      element.on('change', function(onChangeEvent) {
        var reader = new FileReader();
                
        reader.onload = function(onLoadEvent) {
          scope.$apply(function() {
            fn(scope, {$fileContent:onLoadEvent.target.result});
          });
        };

        reader.readAsText((onChangeEvent.srcElement || onChangeEvent.target).files[0], "CP1251");
      });
    }
  };
});


  var processFiles = function(files) {
    var file = files[0];
    
    reader.readAsText(file, 'CP1251');
    //console.log(s);
    

 }
var reader = new FileReader();
  
  reader.onload = function (e) {
    var counter = 0;
    // Когда это событие активируется, данные готовы.
    // Вставляем их в страницу в элемент <div>
       
       var s=reader.result;
   // var lexa = e.target.result;
   var output = document.getElementById("fileOutput");
    str = s.replace(/(?:\r\n|\r|\n)/g, '</li><li class="item">' );
    $('#fileOutput').append('<ul class="list"><li class="item">' + str + '</ul>');
    
};
