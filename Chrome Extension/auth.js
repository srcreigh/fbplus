// I am so proud of this. --- Shane

var user_data = "";

function auth() {
  // client_id is our application ID
  var validate_url = "https://graph.facebook.com/oauth/authorize?type=user_agent&client_id=478063252251631&redirect_uri=https://obscure-reaches-7009.herokuapp.com/&scope=read_stream,offline_access";
  // to check that it's loaded
  var isLoaded = false;
  var accessToken = "";
  var token_url = "";

  if (!isLoaded) {
    window.open(validate_url);  
  }

  // listens for the right pageload
  chrome.tabs.onUpdated.addListener(
    function(tabId, changeInfo, tab) {
      token_url = changeInfo.url;
      // 1) the page hasn't been loaded previously
      // 2) the URL matches (er, close enough)
      if (!isLoaded && token_url.substr(0,14) === "https://obscur") {
        isLoaded = true;

        accessToken = token_url.substring(token_url.indexOf("#access_token") + 14, token_url.indexOf("&"));
        
        chrome.tabs.remove(tabId);

        user_data = "https://graph.facebook.com/me?fields=friends.fields(name,username)&access_token=" + accessToken;
      }
    });
}

auth();