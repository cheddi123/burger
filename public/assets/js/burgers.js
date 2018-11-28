// Make sure we wait to attach our handlers until the DOM is fully loaded.
$(function () {

    $(".create-form ").on("submit", function (event) {
        // Make sure to preventDefault on a submit event.
        event.preventDefault();
        console.log("you clicked me")
        var newBurger = {
            burger_name: $("#addBurger").val().trim(),
            devoured: 0
        };
        console.log(newBurger)
        // Send the POST request.
        $.ajax("/api/burgers/", {
            type: "POST",
            data: newBurger
        }).then(
            function () {
                console.log("created new burger");
                // Reload the page to get the updated list
                location.reload();
            }
        );
    });

    $(".eatme").on("click", function (event) {
        // Make sure to preventDefault on a submit event.
        event.preventDefault();
        var id = $(this).data("id");
        var newstate = {
            devoured: 1
        };

        $.ajax("/api/burgers/" + id, {
            type: "PUT",
            data: newstate
        }).then(function () {
            console.log("I am devoured")
            // Reload the page to get the updated list
            location.reload();
        });
        console.log("I am devoured")

    });


    $(".delete").on("click", function(event){
        // Make sure to preventDefault on a submit event.
        event.preventDefault();
        var id = $(this).data("id");

        $.ajax("/api/burgers/" +id,{
            type:"DELETE"
        }).then(function(){
            console.log("burger id number"+ id + "deleted");
            location.reload()
        });


    });


});