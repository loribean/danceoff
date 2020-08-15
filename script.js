//global variables:
const clientId ="07a76bdd80624a979c8a9b9fdb23d403";
const clientSecret ="a415ee3805d14240a8e8d6ed2ee9bef1";



var gamePage = document.getElementById('gamePage');
var startButton = document.querySelector('.buttonGo');
var playerPoints = 0;


startButton.addEventListener("click", function(){
    gamePage.classList.remove("hide");
    startButton.classList.add("hide");
    console.log('start button hidden!')
});
