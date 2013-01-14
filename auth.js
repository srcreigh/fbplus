/* auth.js
 * author: Shane R. Creighton-Young
 * project: fbplus
 *
 */

// External check for init
if (localStorage['init'] === undefined) {
  auth();
}

/*
 * auth(): Void -> Void
 *         PRE: localStorage['init'] is undefined
 *         POST: localStorage['init'] contains a JSON object with the user's friends' data
 *
 * This function uses Facebook's URL authorization system to retrieve an access token and query
 * the Facebook Graph API to get data.
 *
 */

function auth() {
  // This URL requires out application ID, our redirection URL, and other options. 
  // NOTE: if you need to query with extra privacy settings, edit the part at the end with the
  // "scope" parameter.
  var validate_url = "https://graph.facebook.com/oauth/authorize?type=user_agent&client_id=478063252251631&redirect_uri=https://obscure-reaches-7009.herokuapp.com/&scope=read_stream,offline_access";
  
  var accessToken = "";
  var token_url = "";

  window.open(validate_url);

  chrome.tabs.onUpdated.addListener(
    function handler(tabId, changeInfo, tab) {
      token_url = changeInfo.url;
      if (token_url.substr(0,14) === "https://obscur") {
        // removes the event listener
        chrome.tabs.onUpdated.removeListener(handler);

        // This extracts the access token from the new URL
        accessToken = token_url.substring(token_url.indexOf("#access_token") + 14, token_url.indexOf("&"));
        
        // closes the access token webpage
        chrome.tabs.remove(tabId);

        // location of the Facebook Graph API request
        var data_url = "https://graph.facebook.com/me?fields=friends.fields(username,name,gender,hometown,birthday)&access_token=" + accessToken;

        // Queries the Facebook Graph API and stores it in localStorage
        $.ajax({
          url: data_url,
          jsonp: 'callback',
          dataType: 'jsonp',
          success: function (result) {
            localStorage['init'] = JSON.stringify(result);
          }
        });
      }
    }
  );
}