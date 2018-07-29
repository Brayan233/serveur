$(function() {
    $( "#btn1" ).click(function() {

        $.get( "https://bserver-apirest.herokuapp.com/api/persons", function( data ) {
            $( ".card-footer" ).html( data );
            alert( "Load was performed." );
          });

    });
  });