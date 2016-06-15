// Define the `phonecatApp` module
var myApp = angular.module("myApp", []);
// Define the `PhoneListController` controller on the `phonecatApp` module

myApp.controller("MyController", function($scope, MyFactory){
    this.todos = MyFactory.getTodos();
    this.addTodos = function(){
        if ($scope.todoInput.length > 0){
            MyFactory.addTodos($scope.todoInput, false);
        };
        $scope.todoInput = "";
    };
    this.toggleDone = function(idx){
        MyFactory.toggleDone(idx);
    };
    this.deleteDone = function(){
        MyFactory.deleteDone();
    };
    this.deleteAll = function(){
        MyFactory.deleteAll();
    };
    this.countDone = function(){
        var count = MyFactory.countDone();
        return count;
    }
});

myApp.factory("MyFactory", function(){

    var todos = [];

    var factory = {};

    factory.getTodos = function(){
        return todos;
    };
    factory.addTodos = function(n, d){
        todos.push({name: n, done: d});
        return todos;
    };
    factory.toggleDone = function(el){
        if (el.done === true){
            el.done = false;
        } else {
            el.done = true;
        }
    };
    factory.deleteDone = function(){
        for (var i = 0; i < todos.length; i++){
            if(todos[i].done === true){
                todos.splice(i, 1);
                i --
            };

        };
    };

    factory.countDone = function(){
        var count = todos.length;
        for (var i = 0; i < todos.length; i++){
            if(todos[i].done === true){
                count -= 1;
            };

        };
        return count;
    };

    factory.deleteAll = function(){
        todos.splice(0, todos.length);
    }

    return factory;

});

myApp.filter("reverse", function(){
    return function(items){
        return items.slice().reverse();
    }
})
