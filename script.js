//global variables:
const clientId ="07a76bdd80624a979c8a9b9fdb23d403";
const clientSecret ="a415ee3805d14240a8e8d6ed2ee9bef1";



var gamePage = document.getElementById('gamePage');
var startButton = document.querySelector('.buttonGo');
var playerPoints = 0;

var song1 = {
     track: 'Cry (with John Martin',
      artist: 'Gryffin, John Martin',
      id : '1TF8rXy87zrnpBlS9TLykA'

}

//API PORTION

//get token from spotify using POST Method:

const _getToken = async () => {

    const result = await fetch('https://accounts.spotify.com/api/token',{
    method: 'POST',
    headers: {
        'Content-Type': "application/x-www-form-urlencoded",
        'Authorization' : 'Basic ' + btoa(clientId + ':' + clientSecret)
    },
    body: 'grant_type=client_credentials'
    });

    const data = await result.json();
    const token = data.access_token;
    return token;
    
};

// Using the token we got in order to acesss spotify's endpoints
const _getTracks = async (token, tracksEndPoint) => {
    const limit = 2; //cause we only want to get two tracks each turn

    const result = await fetch()

}







//event listener for start button
startButton.addEventListener("click", function(){
    gamePage.classList.remove("hide");
    startButton.classList.add("hide");
    console.log('game starting!')
    //fetch artist, song, album art and dancebility index from spotify
    _getToken();
});
