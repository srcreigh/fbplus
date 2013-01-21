/* background.js
 * author: Liam Horne
 * project: fbplus
 *
 */

/* This is for after they press ENTER. 'text' is the string they send */
chrome.omnibox.onInputEntered.addListener(
  function(text) {

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
  
  userData = JSON.parse(localStorage['userData']);

 // If data is a name (i.e., FirstName LastName, convert to ID ########) 
 function ensureId (name) {
 if (data.search(" ") != - 1) {
     for (var i = 0; i < userData.length; i++) {
          if (name == userData[i].name) {
            return userData[i].username;
            break;
          }
        }
 } else {
     return name;
 }
}

data = ensureId(data);

  var commands = new Array();
  var numCommands = 0;
  function makeCommand (command, fun) {
      commands[numCommands] = new Array(2);
      commands[numCommands][0] = command;
      commands[numCommands][1] = fun;
      numCommands++;
  }

  function redirect (link, alternate) {
      if(singleCmd) {
            updateChromeTab (link);
          } else {
            updateChromeTab (alternate)
          }
  }

 function findField(info, name) {
    for(var i = 0; i < userData.length; i++) {
      if (name == userData[i].name || name == userData[i].username) {
          return userData[i][info];
          break;
      } 
    }
  }

   function findHometown(name) {
    for(var i = 0; i < userData.length; i++) {
      if (name == userData[i].name || name == userData[i].username) {
          return userData[i].hometown.name;
          break;
      } 
    }
  }

  var helpMessage = "Commands in FB Plus \n For commands with an <ID> parameter, \
use the Facebook ID of a specific user. If no ID is inputted, \
it will redirect to your own page. \
                    \n \
                    \n home - News Feed \
                    \n pics <ID> - Photos \
                    \n timelines <ID> - Timeline \
                    \n events - Events \
                    \n msg <ID> - Messages \
                    \n groups - Groups \
                    \n apps - Applications \
                    \n friends <ID> - Friends";



  // Database for redirect commands
  makeCommand("home", function() {redirect("http://www.facebook.com", undefined)});
  makeCommand("pics", function() {redirect("http://www.facebook.com/me/photos", "http://www.facebook.com/"+data+"/photos")});
  makeCommand("events", function() {redirect("https://www.facebook.com/events/list", undefined)});
  makeCommand("msg", function() {redirect("https://www.facebook.com/messages/", "https://www.facebook.com/messages/"+data)});
  makeCommand("groups", function() {redirect("https://www.facebook.com/bookmarks/groups", undefined)});
  makeCommand("apps", function() {redirect("https://www.facebook.com/bookmarks/apps", undefined)});
  makeCommand("timeline", function() {redirect("https://www.facebook.com/me/friends", "https://www.facebook.com/"+data)});
  makeCommand("friends", function() {redirect("https://www.facebook.com/me/friends", "https://www.facebook.com/"+data+"/friends")});
  makeCommand("gender", function() {alert(findField('gender',data))});
  makeCommand("id", function() {alert(findField('id',data))});
  makeCommand("username", function() {alert(findField('username',data))});

/*
  makeCommand("birthday", function() {alert(findField('birthday',data))});
  makeCommand("hometown", function() {alert(findHometown(data))});
  */
  makeCommand("help", function() {alert(helpMessage)});


  // The main function we use to check for redirect commands
  // It goes through each entry in redirects and checks if the input command is the 
  // 'command' value of the redirect, if it is then applies 'link' or 'alternate'
  function checkCommands () {
    for (var j = 0; j < numCommands; j++) {
       if (cmd == commands[j][0]) {
          commands[j][1]();
          break;
      }
    }
  }

  checkCommands();

});
