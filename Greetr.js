// ( to trick the compiler and scope the code in an IIFE context rather than the global context
// ; to make sure that even if some other included lib/framework doesn't finish their ; properly, 
// our lib still works fine
;(function(global, $) {
    
    // 'new' an object
    var Greetr = function(firstName, lastName, language) {
        return new Greetr.init(firstName, lastName, language);
    }

    // hidden within the scope of the IIFE and never directly accessible
    var supportedLangs = ['en', 'hi'];

    // informal greetings
    var greetings = {
        en: 'Hello',
        hi: 'नमस्ते'
    };    


    // formal greetings
    var formalGreetings = {
        en: 'Greetings',
        hi: 'नमस्कार'
    };

    // logger messages
    var logMessages = {
        en: 'Logged in',
        hi: 'लॉग इन'
    }

    // prototype holds methods (to save memory space)
    Greetr.prototype = {

        // 'this' refers to the calling object at execution time
        fullName: function() {
            return this.firstName + ' ' + this.lastName; 
        },

        validate: function() {
            // check that is a valid language
            // references the externally inaccessible 'supportedLangs' within the closure
            if (supportedLangs.indexOf(this.language) === -1) {
                throw "Invalid language";
            }
        },
        
        // retrieve messages from object by referring to properties using [] syntax
        greeting: function() {
            return greetings[this.language] + ' ' + this.firstName + '!';
        },

        formalGreeting: function() {
            return formalGreetings[this.language] + ', ' + this.fullName();
        },

        // chainable methods return their own containing object
        greet: function(formal) {
            
            var msg;

            // if undefined or null it will be coerced to 'false'
            if (formal) {
                msg = this.formalGreeting();
            } else {
                msg = this.greeting();
            }

            if(console) {
                console.log(msg);
            }

            // 'this' refers to the calling object at execution time
            // makes the method chainable
            return this;

        },

        log: function() {
            if (console) {
                console.log(logMessages[this.language] + ': ' + this.fullName());
            }
            
            // make chainable
            return this;
        },

        setLang: function(lang) {

            // set the language
            this.language = lang;

            // validate
            this.validate();
            
            // make chainable
            return this;
        },

        HTMLGreeting: function(selector, formal) {
            if (!$) {
                throw 'JQuery not loaded';
            }

            if (!selector) {
                throw 'Missing JQuery selector';
            }

            var msg;

            // determine the message
            if (formal) {
                msg = this.formalGreeting();
            } else {
                msg = this.greeting();
            }

            // inject the message in the chosen place in the DOM
            $(selector).html(msg);
            
            // make chainable
            return this;
        }

    };

    // the actual object is created here, allowing us to 'new' an object without calling 'new'
    Greetr.init = function(firstName, lastName, language) {
        
        var self = this;
        self.firstName = firstName || '';
        self.lastName = lastName || '';
        self.language = language || 'en';
        
        self.validate();
    
    }

    // trick borrowed from JQuery so we don't have to use the 'new' keyword
    Greetr.init.prototype = Greetr.prototype;

    // attach our Greetr to the global object, and provide a shorthand '$G' 
    // to ease our poor fingers
    global.Greetr = global.G$ = Greetr;

}(window, jQuery));