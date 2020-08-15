//global variables:

var logo = document.getElementById('logo');
var startButton = document.querySelector('.buttonGo');

startButton.addEventListener("click", function(){
    logo.classList.add("hide");
    startButton.classList.add("hide");
    console.log('start button hidden!')
})
