

/*obj.sort(function(a,b){
	if (a.name < b.name)
		return -1;
	if (a.name > b.name)
		return 1;
	return 0;
})

var list_players = []

chrome.omnibox.onInputChanged.addListener(
  function(text, suggest) {
  	list_players = obj.filter(function(elem){
  		return (text === elem.substr(0,text.length));
  	})
  	list_players = list_players.slice(0.5);
    console.log('inputChanged: ' + text);
    suggest([{content: 'hi', description: 'you ;)'}]);
  });*/

// This is copied straight from the example.
// This event is fired each time the user updates the text in the omnibox,
// as long as the extension's keyword mode is still active.

var commands = new Array("apps", "events", "friends", "gender", "groups", "home", "id", "msg", "pics", "username");

function buildResultsList(text) {
  var indexOfSpace = text.indexOf(" ");
  var results;

  if (text == "")
    return [];

  if (indexOfSpace == -1) {
    results = commands.filter(function(cmd) {
      if (cmd.length < text)
        return false;
      if (cmd.substr(0,text.length) == text)
        return true;
      return false;
    });

    return results.map(function(a) {
      return {content: a, description: "command: " + a};
    });
  }

  else {
    nameText = text.substr(indexOfSpace+1);

    var results = JSON.parse(localStorage['userData']);

    results = results.filter(function(a) {
      if (a.name.length <= nameText) {
        return false;
      }
      if (a.name.substr(0,nameText.length).toLowerCase() == nameText.toLowerCase()) {
        return true;
      }
      return false;
    });

    return results.map(function (a) {
      return {content: text.substr(0,indexOfSpace) + " " + a.name, description: a.name + "'s " + text.substr(0,indexOfSpace)};
    });
  }
}


chrome.omnibox.onInputChanged.addListener(
  function(text, suggest) {
    var results = buildResultsList(text);

    if (results.length > 5)
      suggest(results.slice(0,5));
    else
      suggest(results);
  });