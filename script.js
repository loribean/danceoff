//global variables:
const clientId ="07a76bdd80624a979c8a9b9fdb23d403";



let token;
let data ;
let album ;
let danceArray = [];
let artArray =[];



var gamePage = document.getElementById('gamePage');
var startButton = document.querySelector('.buttonGo');
var songOne = document.getElementById('imageone');
var songTwo = document.getElementById('imageone');
var titleOne = document.getElementById('titleone');
var titleTwo = document.getElementById('titletwo');
var playerPoints = 0;
//array to store all song info
var songs = [ 
    { track: 'Nobody Compares To You (feat. Katie Pearlman)',
      artist: 'Gryffin, Katie Pearlman',
      id : '17ejRbr6B8l9zdqgCZsn4m',
      albumId: '2IAVHJdaRPFA6MQqXHoG75'

    
},
    { track: 'Savage Love',
     artist: 'Jawsh 685, Jason Derulo',
     id : '1xQ6trAsedVPCdbtDAmk0c',
     albumId :'1XMw3pBrYeXzNXZXc84DNw',
     
},
    { track: 'ROCKSTAR (feat. Roddy Ricch)',
     artist: 'DaBaby, Roddy Ricch',
     id : '7ytR5pFWmSjzHJIeQkgog4',
     albumId :'623PL2MBg50Br5dLXC9E9e'
     
},
{    track: 'Watermelon Sugar',
     artist: 'Harry Styles',
     id : '6UelLqGlWMcVH1E5c4H7lY',
     albumId :'7xV2TzoaVc0ycW7fwBwAml'
     
},
{    track: 'Dance Monkey',
     artist: 'Tones And I',
     id : '1rgnBhdG2JDFTbYkYRZAku',
     albumId : '0UywfDKYlyiu1b38DRrzYD'
     
},
{    track: 'Blueberry Faygo',
     artist: 'Lil Faygo',
     id : '22LAwLoDA5b4AaGSkg6bKW',
     albumId : '6rBennOYWR1OZQnsU39PKL'
     
}


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
const getDanceArtAll = function () {
    for(i = 0; i<songs.length; i++ ) {
        getDance(token);
        getArt(token);
        
}
};

// get album art

const getArt = async (token) => {
    const result = await fetch (`https://api.spotify.com/v1/albums/${songs[i].albumId}`, {
        method: 'GET' ,
        headers: { 'Authorization' : 'Bearer ' + token}
    });
    album = await result.json();
    let albumArt = album.images[1].url;
    artArray.push(albumArt);
    return artArray; // array will contain all the values we need! yay

}


            





//event listener for start button
startButton.addEventListener("click", function(){
    gamePage.classList.remove("hide");
    startButton.classList.add("hide");
    console.log('game starting!')
    //fetch artist, song, album art and dancebility index from spotify
    getDanceArtAll();  
    songOne.src=artArray[0];
    songTwo.src= artArray[1];
    titleOne.innerText = `${songs[0].track} by ${songs[0].artist}`;
    titletwo.innerText = `${songs[1].track} by ${songs[1].artist}`;
    
});

