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

  var cmd; // variable that will become the first command. e.g., "msg Liam" => cmd = msg

  if (text.search(" ") == -1) { // If there is no space character in the string they send, this returns -1
       cmd = text;                         // so we assume the whole string is a command
  } else {
    cmd = text.substr(0, text.indexOf(" ")); // otherwise cmd is the first word up to a space character
  }

  if (cmd == "home") {
    chrome.tabs.getSelected( undefined, function(tab) {
        chrome.tabs.update(tab.id, {url: "http://www.facebook.com/"}, undefined);
        window.close(); 
      });}

});