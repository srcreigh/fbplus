/* This is for WHILE the user is typing in his/her command
   so we can add suggestions  */
chrome.omnibox.onInputChanged.addListener(
  function(text, suggest) {
    console.log('inputChanged: ' + text);
    suggest([
      {content: text + " one", description: "the first one"},
      {content: text + " number two", description: "the second entry"}
      ]);
  });

/* This is for after they press ENTER. 'text' is the string they send */
chrome.omnibox.onInputEntered.addListener(
  function(text) {



  // redirects : Creates a one-dimensional array redirects
  var redirects = new Array();

  // numRedirects : Variable to store number of commands we are specifying.
  var numRedirects = 0;

  // This function is for our use, we use it to make a new entry in our "database" of commands
  // makeRedirect(command, link, alternate) gives the user access to:
  // command -> redirects to link
  // command data -> redirects to alternate
  function makeRedirect (command, link, alternate) {
    redirects[numRedirects] = new Array(3);
    redirects[numRedirects][0] = command;
    redirects[numRedirects][1] = link;
    redirects[numRedirects][2] = alternate;
    numRedirects = numRedirects + 1;
  }

  // Function to update a Chrome tab
  function updateChromeTab (address) {
    chrome.tabs.getSelected( undefined, function(tab) {
            chrome.tabs.update(tab.id, {url: address}, undefined);
            window.close(); });
  }

  // cmd : The variable that stores the first word in user input
  var cmd; 

  // data : The variable that stores the rest of the input
  var data = "";

  // singleCmd : Boolean to determine if the input is just one command
  var singleCmd = new Boolean();

  // Determines if there is a space character in the input and sets singleCmd
  // search() produces -1 when there is no space
  if (text.search(" ") == -1) {
    singleCmd = true;
    } else {
    singleCmd = false;
  }

  // Sets the value for cmd and possibly data
  if (singleCmd) { 
    cmd = text;                         
  } else {
    cmd = text.substr(0, text.indexOf(" ")); // otherwise cmd is the first word up to a space character
    data = text.substr(text.indexOf(" ") + 1);
  }

  // Database for redirect commands
  makeRedirect("home", "http://www.facebook.com", undefined);
  makeRedirect("pics", "http://www.facebook.com/me/photos", "http://www.facebook.com/"+data+"/photos");
  makeRedirect("events", "https://www.facebook.com/events/list", undefined);

  // The main function we use to check for redirect commands
  // It goes through each entry in redirects and checks if the input command is the 
  // 'command' value of the redirect, if it is then applies 'link' or 'alternate'
  function checkRedirects () {
    for (var j = 0; j < numRedirects; j++) {
       if (cmd == redirects[j][0]) {
          if(singleCmd) {
            updateChromeTab (redirects[j][1]);
          } else {
            updateChromeTab (redirects[j][2])
          }
          break;
      }
    }
  }

  checkRedirects();

});