var app = angular.module('todo', ['ngMaterial']);


app.controller('mainCtrl', ['$scope', '$http',  function ($scope, $http) {
	
	$scope.formData = {};

	$http.get('/app/todos').then(function (data){
		$scope.todos = data.data;
		console.log("data:", data.data, $scope.todos.length);
	}, function (err){
		console.log("ERROR", error)
	});

	$http.get('/app/todos?done=true').then(function (data){
		$scope.doneTodos = data.data;
		console.log("data:", data.data, $scope.doneTodos.length);
	}, function (err){
		console.log("ERROR", error)
	});

	$scope.createTodo = function () {
		$http.post('/app/todos', $scope.formData)
			.success(function(data) {
				$scope.formData = {};
				$scope.todos = data;
				console.log(data);
			})
			.error(function (data) {
				console.log("ERROR: ", data)
			})
		};
	}]);
