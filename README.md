This application is a dance off between two songs.
Using spotify's danceability rating on each track, we will pit two randomized songs against each other.
The user will have to guess which song has a higher danceability rating.
The user will have 3 seconds per round
The user will get his result after the game.


USING THE SPOTIFY API:
 Using Client Credentials Flow: as we do NOT need user information. 

 1. Application first needs to request for authorization token

url : https://accounts.spotify.com/api/token
method: POST
body: grant_type : client_credentials
header: 'Authorization': Basic <base64 encoded clientId:clientSecret>


2. After getting the token, we can use spotify's endpoint!
For this use case, we will be getting 2 things from spotify's endpoints, danceability and album art!

DANCEABILITY FUNCTION:
needs id parameter: go to song, right click, and copy song's URI. ID is the random string at the back
header field: authorization: token( which we got at step 1);
Response body will contain audio features object in JSON format.
GET https://api.spotify.com/v1/audio-features/{id}