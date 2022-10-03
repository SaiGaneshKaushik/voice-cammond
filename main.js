x = 0;
y = 0;

draw_cat = "";
screen_width = "";
screen_height = "";
cat = "";
speak_data = "";
to_number = 0;

var SpeechRecognition = window.webkitSpeechRecognition;
  
var recognition = new SpeechRecognition();

function preload(){
  cat= loadImage("cat.png");
}


function start()
{
  document.getElementById("status").innerHTML = "System is listening please speak";  
  recognition.start();
} 
 
recognition.onresult = function(event) {

 console.log(event); 
 content= event.results[0][0].transcript;
 document.getElementById("status").innerHTML = "The speech has been recognized as: " + content;
to_number  = Number(content);
if(Number.isInteger(to_number)){
document.getElementById("status").innerHTML = "Started drawing cat";
draw_cat = "set";
}
else
{
  document.getElementById("status").innerHTML = "The speech has not recognized a number ";
}
}

function setup() {
 screen_width = window.innerWidth;
 screen_height = window.innerHeight;
 canvas = createCanvas(screen_width, screen_height-150);
 canvas.position(0,150);
}


function draw() {
  if(draw_cat == "set")
  {
    document.getElementById("status").innerHTML = to_number + " Cats drawn";
    draw_cat = "";
    speak_data = to_number + "Cats drawn";
    speak();
    for(var i= 1; i<= to_number; i++){
  x= Math.floor(Math.random() * 700);
  y = Math.floor(Math.random() * 400)
  image(cat, x, y, 50, 50);
    }
  }
}

function speak(){
    var synth = window.speechSynthesis;

    var utterThis = new SpeechSynthesisUtterance(speak_data);

    synth.speak(utterThis);

    speak_data = "";
}
