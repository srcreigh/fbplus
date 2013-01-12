function testAPI() {
  alert('Welcome!  Fetching your information.... ');
  FB.api('/me', function(response) {
    alert('Good to see you, ' + response.name + '.');
  });
}

function login() {
    FB.login(function(response) {
        if (response.authResponse) {
            // connected
            testAPI();
        } else {
            // cancelled
        }
    });
}

window.fbAsyncInit = function() {
  console.log("init started");
  // init the FB JS SDK
  FB.init({
    appId      : '478063252251631', // App ID from the App Dashboard
    status     : true, // check the login status upon init?
    cookie     : true, // set sessions cookies to allow your server to access the session?
    xfbml      : true  // parse XFBML tags on this page?
  });
  console.log("init complete");

  FB.getLoginStatus(function(response) {
    if (response.status === 'connected') {
      // connected
    } else if (response.status === 'not_authorized') {
      // not_authorized
      login();
    } else {
      // not_logged_in
      login();
    }
  });

};

// Load the SDK's source Asynchronously
// Note that the debug version is being actively developed and might 
// contain some type checks that are overly strict. 
// Please report such bugs using the bugs tool.
console.log("test 1");
(function(d, debug){
   var js, id = 'facebook-jssdk', ref = d.getElementsByTagName('script')[0];
   if (d.getElementById(id)) {return;}
   js = d.createElement('script'); js.id = id; js.async = true;
   js.src = "https://connect.facebook.net/en_US/all" + (debug ? "/debug" : "") + ".js";
   ref.parentNode.insertBefore(js, ref);
 }(document, /*debug*/ false));
console.log("test 2");