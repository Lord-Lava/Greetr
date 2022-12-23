
// gets a new object (the architechture allows us to 
// not have to use the 'new' keyword here)
var g = G$('John', 'Doe');

// use our chainable methods
g.greet().setLang('hi').greet(true).log();

// let's use our object on the click of the login button
$('#login').click(function() {

    // create a new 'Greetr' object (let's pretend we know the name from the login)
    var loginGtr = G$('John', 'Doe');

    $('#logindiv').hide();

    // fire off an HTML greeting, passing the '#greeting' as the selector 
    // and the chosen language, and log the welcome as well
    loginGtr.setLang($('#lang').val()).HTMLGreeting('#greeting', true).log();

});