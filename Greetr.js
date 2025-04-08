;(function(global, $) {
    
    var Greetr = function(firstName, lastName, language) {
        return new Greetr.init(firstName, lastName, language);
    }

    var supportedLangs = ['en', 'hi', 'pl'];

    var greetings = {
        en: 'Hello',
        hi: 'नमस्ते',
        pl: 'Cześć',
    };    

    var formalGreetings = {
        en: 'Greetings',
        hi: 'नमस्कार',
        pl: 'Dzień dobry', // Updated formal Polish greeting
    };

    var logMessages = {
        en: 'Logged in',
        hi: 'लॉग इन',
        pl: 'Zalogowano' // Updated impersonal form
    }

    Greetr.prototype = {

        fullName: function() {
            return this.firstName + ' ' + this.lastName; 
        },

        validate: function() {
            if (supportedLangs.indexOf(this.language) === -1) {
                throw "Invalid language";
            }
            if (!this.firstName) { // Ensure firstName is provided
                throw "First name is required";
            }
        },
        
        greeting: function() {
            return `${greetings[this.language]} ${this.firstName}!`;
        },

        formalGreeting: function() {
            return `${formalGreetings[this.language]}, ${this.fullName()}`;
        },

        greet: function(formal) {
            var msg = formal ? this.formalGreeting() : this.greeting();
            if (console) console.log(msg);
            return this;
        },

        log: function() {
            if (console) {
                console.log(`${logMessages[this.language]}: ${this.fullName()}`);
            }
            return this;
        },

        setLang: function(lang) {
            this.language = lang;
            this.validate();
            return this;
        },

        HTMLGreeting: function(selector, formal) {
            if (!$) throw 'jQuery not loaded'; // Fixed typo
            if (!selector) throw 'Missing jQuery selector';
            
            const msg = formal ? this.formalGreeting() : this.greeting();
            $(selector).html(msg);
            return this;
        }
    };

    Greetr.init = function(firstName, lastName, language) {
        this.firstName = firstName || '';
        this.lastName = lastName || '';
        this.language = language || 'en';
        this.validate(); // Now checks for firstName
    }

    Greetr.init.prototype = Greetr.prototype;
    global.Greetr = global.G$ = Greetr;

}(window, jQuery));