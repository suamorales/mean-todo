var app = angular.module('todo', ['ngMaterial']);


app.controller('mainCtrl', ['$scope', '$http', '$timeout',  function ($scope, $http, $timeout) {
	
	$scope.formData = {};

	$scope.getNotDoneTodos = function(){
		$http.get('/app/todos?done=false').then(function (data){
			$scope.notDone = data.data;
			console.log("data:", data.data, $scope.notDone.length);
		}, function (err){
			console.log("ERROR", error)
		});
	}

	$scope.getTodos = function() {
			$http.get('/app/todos').then(function (data){
			$scope.todos = data.data;
			console.log("data:", data.data, $scope.todos.length);
		}, function (err){
			console.log("ERROR", error)
		});
	}

	// $scope.getDoneTodos = function(){
	// 	$http.get('/app/todos?done=true').then(function (data){
	// 		$scope.doneTodos = data.data;
	// 		console.log("data:", data.data, $scope.doneTodos.length);
	// 	}, function (err){
	// 		console.log("ERROR", error)
	// 	});
	// }

	$scope.createTodo = function () {
		$http.post('/app/todos', $scope.formData)
			.then(function(response) {
				console.log("DATA", response.data)
				$scope.formData = {};
				$scope.getTodos();
			})
		};

	$scope.markAsDone = function(currentTodo) {
		//$timeout(
		$http.put('/app/todo/' + currentTodo.todo._id, {done:true})
			.then(function(data){
				console.log("markAsDone Data", data)
				
				$scope.getTodos()
			})
			//, 3000);

		//call a put for an ID
		// set property done
		//update scope
	}

	$scope.getTodos();

}]);
