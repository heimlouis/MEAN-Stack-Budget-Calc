const myApp = angular.module('myApp', []);
myApp.controller('AppCtrl', ['$scope', '$http', function($scope, $http) {
    console.log("Hello from controller");

    // the /contactlist is the route used where we are getting the data //
    // this route is what will be used in the server.js //
    const refresh = function() {
        $http.get('/contactlist').then(function (success){
            console.log('I got the data I requested');
            $scope.contactlist = success.data;
            // $scope.contact = '';
        });    
    };

    refresh();

        $scope.addContact = function() {
            console.log($scope.contact);
            $http({
                    method: 'POST',
                    url: '/contactlist',
                    data: $scope.contact
                })
                .then(function(response) {
                    $scope.contact = {};
                    // $scope.contact = ""; //Clear input box
                    console.log('POST Response: ' + response.statusText);
                    refresh();
            });
          };

        $scope.remove = function (id) {
          console.log(id);//this will log the id to the console
            $http.delete('/contactlist/' + id).then(function(response){
                $scope.contact = response;
            refresh();
        });
    }

        $scope.edit =function (id) {
            console.log(id);//this will log the id to the console
            $http.get('/contactlist/' + id).then(function(response){
                $scope.contact = response.data;
        });
    };

    // commented this out as this has been added to the server.js
    // person1 = {
    //     name: 'Dude',
    //     email: 'dude@email1.com',
    //     number: '(507) 111-1111'
    // };

    // person2 = {
    //     name: 'Dudet',
    //     email: 'dudet@email1.com',
    //     number: '(508) 111-1111'
    // };

    // person3 = {
    //     name: 'Dudester',
    //     email: 'dudester@email1.com',
    //     number: '(509) 111-1111'
    // };

    //  let contactlist = [person1, person2, person3];
    // // $scope - the glue between the application controller and view(index.html)
    // // Without the $scope.contactlist = contacts, nothing will display on the DOM //
    // $scope.contactlist = contactlist;

}]);