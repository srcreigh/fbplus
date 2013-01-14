obj.sort(function(a,b){
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
  });