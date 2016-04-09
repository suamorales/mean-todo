var app = angular.module('todo', []);

app.controller('mainCtrl', ['$scope', '$http',  function ($scope, $http) {
	$scope.formData = {};

	console.log("HIS THIS RUNNING");
	
	$http.get('/app/todos').then(function (data){
		$scope.todos = data;
		console.log("data:", data);
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
