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
  var data;
  var singleCmd = new Boolean();

  if (text.search(" ") == -1) {
    singleCmd = true;
    } else {
    singleCmd = false;
  }

  if (singleCmd) { 
    cmd = text;                         
  } else {
    cmd = text.substr(0, text.indexOf(" ")); // otherwise cmd is the first word up to a space character
    data = text.substr(text.indexOf(" ") + 1);
  }

// The 'home' command
  if (cmd == "home") {
        chrome.tabs.getSelected( undefined, function(tab) {
        chrome.tabs.update(tab.id, {url: "http://www.facebook.com/"}, undefined);
        window.close(); 
  });}

  // The 'pics' command
  if (cmd == "pics") {
    if(singleCmd) {
      chrome.tabs.getSelected( undefined, function(tab) {
        chrome.tabs.update(tab.id, {url: "http://www.facebook.com/me/photos"}, undefined);
        window.close(); });
    } else {
       chrome.tabs.getSelected( undefined, function(tab) {
        chrome.tabs.update(tab.id, {url: "http://www.facebook.com/"+data+"/photos"}, undefined);
        window.close();  });
    }
  }




});