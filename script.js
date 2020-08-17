//global variables:
const clientId ="07a76bdd80624a979c8a9b9fdb23d403";






let token;
let data ;
let album ;
let playlist_id = '37i9dQZEVXbMDoHDwVN2tF'
let roundStatus;
let playlistData;



var gamePage = document.getElementById('gamePage');
var startButton = document.querySelector('.buttonGo');
var imageOne = document.getElementById('imageone');
var imageTwo = document.getElementById('imagetwo');
var titleOne = document.getElementById('titleone');
var titleTwo = document.getElementById('titletwo');
var songOne = document.querySelector(".song1");
var songTwo = document.querySelector(".song2");
var score = document.querySelector("#score");
var next = document.querySelector("#nextround");
var endPage = document.getElementById("endPage");
var playerPoints = 0;
//array to store all song info

let songIdArray =[];
let trackArray =[];
let artistArray =[]
let danceArray = [];
let artArray =[];


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
//get Global Top 50 playlist : 40 tracks, album art, artist, track id

const getPlaylistItems = async (token) => {
    const fields = "items(track(id%2Cname%2Calbum(images%2Cartists)))";
    const limit = 40;
    const result = await fetch(`https://api.spotify.com/v1/playlists/${playlist_id}/tracks?fields=${fields}&limit=${limit}`, {
        method: 'GET',
        headers: { 'Authorization' : 'Bearer ' + token}
    });

        playlistData = await result.json();
        sleep(50);
    for(i=0; i< 40; i++) {
        console.log(playlistData);
        songIdArray.push(playlistData.items[i].track.id);
        trackArray.push(playlistData.items[i].track.name);
        artArray.push(playlistData.items[i].track.album.images[1].url);
        artistArray.push(playlistData.items[i].track.album.artists[0].name);
        console.log(artistArray);
    }
    return playlistData;
}




//get danceability info with token, and track id that we got from getPlayListItems
const getDance =  async (token,j) => {
            const result = await fetch (`https://api.spotify.com/v1/audio-features/${songIdArray[j]}`,{
            method: 'GET',
            headers: { 'Authorization' : 'Bearer ' + token}
            });

            data = await result.json();
            let danceData = data.danceability;
            console.log("pushing data")
            danceArray.push(danceData);
            }
            
 //for loop to loop thru songs array so we dont have to keep calling getdance for each array
const getDanceAll = async function () {
    console.log(songIdArray);
    await sleep(200);
  for(let j=0; j < songIdArray.length; j++){
    getDance(token,j)
  }
};





// populate song and art into containers:
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  };

  async function populate() {
    console.log('Taking a break...');
    await sleep(300);
    console.log('Two seconds later, showing sleep in a loop...');
    titleOne.innerText = `${trackArray[0]} by ${artistArray[0]}`;
    titleTwo.innerText = `${trackArray[1]} by ${artistArray[1]}`;
    imageOne.src = artArray[0];
    imageTwo.src = artArray[1];
    songOne.id = danceArray [0];
    songTwo.id = danceArray [1];
    artArray = artArray.slice(2);
    danceArray = danceArray.slice(2); // removes them from start of array
    trackArray =trackArray.slice(2);
    console.log("from populate" + songTwo.id);

  }

  
//event listener for start button
startButton.addEventListener("click", function(){
    gamePage.classList.remove("hide");
    startButton.classList.add("hide");
    console.log('game starting!')
    //fetch artist, song, album art and dancebility index from spotify
    getPlaylistItems(token);
   getDanceAll();
   console.log(danceArray);
   populate();
});

// if statements to compare two songs danceability

const playGame = function(currentOption, otherOption) {
    if(currentOption.id > otherOption.id) {
        playerPoints ++;
        roundStatus = 'win';
        console.log(roundStatus);
    } else if (currentOption.id < otherOption.id) {
        roundStatus ='lose';
        console.log(roundStatus);
        
    } 
}
 songOne.addEventListener("click", function(){
     playGame(songOne,songTwo)
     console.log("clicked!")
     score.innerText = `SCORE : ${playerPoints}`;
 });

 songTwo.addEventListener("click", function(){
    playGame(songTwo,songOne)
    console.log("clicked!")
    score.innerText = `SCORE : ${playerPoints}`
});

// need to make sure that when user clicks one, they cannot click the other one

//next round set up

const nextRound = function () {
    titleOne.innerText = `${trackArray[0]} by ${artistArray[0]}`;
    titleTwo.innerText = `${trackArray[1]} by ${artistArray[1]}`;
    imageOne.src = artArray[0];
    imageTwo.src = artArray[1];
    songOne.id = danceArray [0];
    songTwo.id = danceArray [1];
    artArray = artArray.slice(2);
    danceArray = danceArray.slice(2); // removes them from start of array
    trackArray= trackArray.slice(2)
};

//end game set up

const endGame = function() {
    endPage.classList.remove("hide");
    gamePage.classList.add("hide");

    if(playerPoints >= 15){
        endMessage.innerText ="You're super groovy";
        endScore.innerText = `YOUR SCORE: ${playerPoints}`
    } else if (playerPoints < 4) {
        endMessage.innerText ="Forgot to put on your groovy pants?";
        endScore.innerText = `YOUR SCORE: ${playerPoints}`
    } else if(playerPoints >4 && playerPoints <15) {
        endMessage.innerText ="You're almost groovy!";
        endScore.innerText = `YOUR SCORE: ${playerPoints}`
    }
}

next.addEventListener("click", function(){
    console.log(trackArray.length)
    if(trackArray.length > 0) {
        nextRound();
    } else {
        endGame();
    }
    
})
