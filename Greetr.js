/*
* Greetr v0.0.1
* Author: Matthew Volk
* A simple framework used to display greetings on a front end UI.
*/

(function(global, $) {

  // Set up greetr so that it generates a new object
  var Greetr = function(firstName, lastName, language){
    // Return new object
    return new Greetr.init(firstName, lastName, language);

  }

  // Create properties
  var supportedLangs = ['en', 'es'];

  var greetings = {
    en: "Hello",
    es: "Hola"
  };

  var formalGreetings = {
    en: "Greetings",
    es: "Saludos"
  };

  var logMessages = {
    en: "Logged in",
    es: "Inició sesión"
  };

  // create Greetr methods
  Greetr.prototype = {

    fullName: function() {
      return this.firstName + ' ' + this.lastName;
    },

    validate: function() {

      // check to see if Lang is in supportedLangs array
      if (supportedLangs.indexOf(this.language) === -1) {
        throw "Invalid Langauge";
      }

    },

    greeting: function() {
      return greetings[this.language] + ' ' + this.firstName + '!';
    },

    formalGreeting: function() {
      return formalGreetings[this.language] + ', ' + this.fullName();
    },

    greet: function(formal) {
      var msg;

      // if undefined or null, it will be coerced to false
      if (formal) {
        msg = this.formalGreeting();
      }
      else {
        msg = this.greeting();
      }

      if (console) {
        console.log(msg);
      }

      // 'this' refers to the calling object at execution time
      // it makes this method chainable
      return this;
    },

    log: function() {

      // check earlier versions of IE for console presence
      if (console) {
        console.log(logMessages[this.language] + ': ' + this.fullName())
      }

      return this;
    },

    setLang: function(lang) {
      // allow user to pass desired language
      this.language = lang;

      // validate passed language
      this.validate();

      return this;
    },

    HTMLGreeting: function(selector, formal) {
      if (!$) {
        throw 'jQuery not loaded.';
      }

      if (!selector) {
        throw "Missing jQuery selector";
      }

      var msg;
      if (formal) {
        msg = this.formalGreeting();
      }
      else {
        msg = this.greeting();
      }

      $(selector).html(msg);
      return this;

    }

  };

  Greetr.init = function(firstName, lastName, language) {
    var self = this;

    // Set default values for params (ES5)
    self.firstName = firstName || "";
    self.lastName = lastName || "";
    self.language = language || "en";

    self.validate();
    
  }

  Greetr.init.prototype = Greetr.prototype;
  global.Greetr = global.G$ = Greetr

})(window, jQuery);
