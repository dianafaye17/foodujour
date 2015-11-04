app.controller('mealView', ['$scope', '$http', '$state', 'MealForm', 'ConvertDate', 
  function($scope, $http, $state, MealForm, ConvertDate) {

  $http.get('/api/meals')
  .then(function(data){
    // console.log('Data: ', data.data)
    $scope.meals = data.data;


    $http.get("/api/entries")
     .then(function(data){
      // console.log("what is:", data.data)
        $scope.entries = data.data;
     })
   }); 

// Filter to reverse order of ng-repeat on main view
  $scope.reverse = function() {
    return function(items) {
      return items.slice().reverse();
    }
  };

  $scope.showModal = function(m) {
    $scope.meal = m;
  };

  $scope.editMeal = function(m){
    MealForm.meal.entries = m.entries;
    MealForm.meal.name = m.name;
    
    MealForm.meal.date = ConvertDate.convert(m.date);
    MealForm.meal.location = m.location;
    MealForm.meal.rating = m.rating;
    MealForm.meal.notes = m.notes;
    MealForm.meal.image = m.image;
    MealForm.meal.id = m.id;

    MealForm.mode.newMeal = false;
  }


 $scope.deleteMeal = function (m) {
    $scope.meal = m;
    // console.log('mea',$scope.meal.id)
    $http.get('api/meals/delete/' + $scope.meal.id)
    .then(function() {
      $state.reload();
    })
  };

}]);

