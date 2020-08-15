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
header: authorization: Basic <base64 encoded client_id:client_secret>

