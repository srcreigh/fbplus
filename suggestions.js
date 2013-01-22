/* background.js
 * author: Shane Creighton-Young
 * project: fbplus
 *
 */

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
      if (a.name.substr(0,nameText.length) == nameText) {
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