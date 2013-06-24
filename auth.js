/* auth.js
 * author: Shane R. Creighton-Young
 * project: fbplus
 *
 */

/* checkUserData(): Void -> Void
 *                  PRE: true
 *                  POST: calls getUserData
 *
 * Check that the userData isn't loaded, and if it isn't, then loads it using
 * the getUserData function.
 *
 */
/*
This function basically checks if the user is new to the app or not
If he/she isn't, then initiates data retreival
However, it doesn't work when user has updated his/her info i.e. added friends because localStorage
has stored data (which is why it's undefined) but doesn't have the new data
function checkUserData() {
  if (localStorage['userData'] == undefined) {
*/
    getUserData();
//}
//}



/* getUserData(): Void -> Void
 *                PRE: true
 *                POST: localStorage['init'] contains a JSON object with the 
 *                      user's friends' data
 *
 * This function uses Facebook's URL authorization system to retrieve an 
 * access token and query the Facebook Graph API to get data.
 *
 */

function getUserData() {
  /* This URL requires out application ID, our redirection URL, and other 
   * options. 
   * 
   * NOTE: if you need to query with extra privacy settings, edit the "scope" 
   * variable. Check the Facebook Graph Explorer to figure out what privary
   * requests you need to make.
   */
  var scope = "read_stream,offline_access";
  var validate_url = "https://graph.facebook.com/oauth/authorize?type=user_agent&client_id=478063252251631&redirect_uri=https://obscure-reaches-7009.herokuapp.com/&scope=" + scope;
  
  var accessToken = "";
  var token_url = "";

  window.open(validate_url);

  chrome.tabs.onUpdated.addListener(
    function handler(tabId, changeInfo, tab) {
      token_url = changeInfo.url;
      if (token_url != undefined && token_url.substring(0,14) == "https://obscur") {
        // extracts the access token from the new URL
        var begin = token_url.indexOf("#access_token") + 14;
        var end = token_url.indexOf("&");
        accessToken = token_url.substring(begin, end);

        // closes the access token webpage
        chrome.tabs.remove(tabId);

        /* Facebook Graph API request
         * NOTE: this is where one would add fields to increase the amount of
         * data to retrieve.
         */
        var data_url = "https://graph.facebook.com/me?fields=friends.fields(username,name,gender,hometown,birthday)&access_token=" + accessToken;

        // Queries the Facebook Graph API and stores it in localStorage
        $.ajax({
          url: data_url,
          jsonp: 'callback',
          dataType: 'jsonp',
          success: function (result) {
            var userData = result.friends.data;
            // sorts the datalist alphabetically by name
            function sortFunction(a, b) {
              if (a.name < b.name)
                return 1;
              if (a.name < b.name)
                return -1;
              return 0;
            }
            userData.sort(sortFunction);

            localStorage['userData'] = JSON.stringify(userData);
          }
        });
      }
    }
  );
}


checkUserData();
