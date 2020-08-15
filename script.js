//global variables:
const clientId ="07a76bdd80624a979c8a9b9fdb23d403";
const clientSecret ="a415ee3805d14240a8e8d6ed2ee9bef1";


let token;
let data ;
let danceArray = [];
let artArray =[];



var gamePage = document.getElementById('gamePage');
var startButton = document.querySelector('.buttonGo');
var playerPoints = 0;
//array to store all song info
var songs = [ 
    { track: 'Cry (with John Martin)',
      artist: 'Gryffin, John Martin',
      id : '1TF8rXy87zrnpBlS9TLykA',
      art : ""
    
},
    { track: 'Savage Love',
     artist: 'Jawsh 685, Jason Derulo',
     id : '1xQ6trAsedVPCdbtDAmk0c',
     art :"",
     
},
    { track: 'ROCKSTAR (feat. Roddy Ricch)',
     artist: 'DaBaby, Roddy Ricch',
     id : '7ytR5pFWmSjzHJIeQkgog4',
     art :""
     
},
{    track: 'Watermelon Sugar',
     artist: 'Harry Styles',
     id : '6UelLqGlWMcVH1E5c4H7lY',
     art :""
     
},
{    track: 'Dance Monkey',
     artist: 'Tones And I',
     id : '1rgnBhdG2JDFTbYkYRZAku',
     art :""
     
},
{    track: 'Blueberry Faygo',
     artist: 'Lil Faygo',
     id : '22LAwLoDA5b4AaGSkg6bKW',
     art :""
     
},


]

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

//get danceability info
const getDance =  async (token) => {
            const result = await fetch (`https://api.spotify.com/v1/audio-features/${songs[i].id}`,{
            method: 'GET',
            headers: { 'Authorization' : 'Bearer ' + token}
            });

            data = await result.json();
            let danceData = data.danceability;
            danceArray.push(danceData)
            return danceArray; // array will contain all the values we need! yay
            }
            
 //for loop to loop thru songs array so we dont have to keep calling getdance for each array
const getDanceAll = function () {
    for(i = 0; i<songs.length; i++ ) {
        getDance(token);
        //call the art function
}
};

// get album art

const getArt = async (token) => {
    const result = await fetch ('')
}


            





//event listener for start button
startButton.addEventListener("click", function(){
    gamePage.classList.remove("hide");
    startButton.classList.add("hide");
    console.log('game starting!')
    //fetch artist, song, album art and dancebility index from spotify
    getDanceAll();
    
});

