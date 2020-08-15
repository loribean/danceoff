//global variables:
const clientId ="07a76bdd80624a979c8a9b9fdb23d403";
const clientSecret =;
let token;



var gamePage = document.getElementById('gamePage');
var startButton = document.querySelector('.buttonGo');
var playerPoints = 0;

var song1 = {
     track: 'Cry (with John Martin)',
      artist: 'Gryffin, John Martin',
      id : '1TF8rXy87zrnpBlS9TLykA',
      dancebility : 0
};
var song2 = {
    track: 'Savage Love',
     artist: 'Jawsh 685, Jason Derulo',
     id : '1xQ6trAsedVPCdbtDAmk0c',
     dancebility : 0
};

//API PORTION

//get token from spotify using POST Method:

const _getToken = async () => {

    const response = await fetch('https://accounts.spotify.com/api/token',{
    method: 'POST',
    headers: {
        'Content-Type': "application/x-www-form-urlencoded",
        'Authorization' : 'Basic ' + btoa(clientId + ':' + clientSecret)
    },
    body: 'grant_type=client_credentials'
    });

    const authenticate = await response.json();
    token = authenticate.access_token;
    return token;
};

//calling the function so the rest of the API calls can work w the token
_getToken();

// Using the token we got in order to acesss spotify's endpoints
const getDance = async (token) => {

    const result = await fetch (`https://api.spotify.com/v1/audio-features/${song1.id}`,{
        method: 'GET',
        headers: { 'Authorization' : 'Bearer ' + token}
    });
    const data = await result.json();
    song1.dancebility = data.dancebility;
    return song1.dancebility;
}






//event listener for start button
startButton.addEventListener("click", function(){
    gamePage.classList.remove("hide");
    startButton.classList.add("hide");
    console.log('game starting!')
    //fetch artist, song, album art and dancebility index from spotify
    getDance(token);
    console.log(song1.dancebility);
});
