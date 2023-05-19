song = "";

leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;
scoreLeftWrist = 0;
scoreRightWrist = 0;
function preload() {

    song = loadSound("music.mp3");

}


function setup() {
canvas = createCanvas(900 , 675);
canvas.position(310 , 200);

video = createCapture(VIDEO);
video.hide();

poseNet = ml5.poseNet(video , modelLoaded);
poseNet.on('pose' , gotPoses);

}

function modelLoaded() {
console.log("Model Is Loaded");

}

function gotPoses(results) {
if (results.length > 0) {

console.log(results);
scoreLeftWrist = results[0].pose.keypoints[9].score;
console.log("Score Of Left Wrist: " + scoreLeftWrist);
leftWristX = results[0].pose.leftWrist.x;
leftWristY = results[0].pose.leftWrist.y;
console.log("Left Wrist: " + leftWristX + " X  " + leftWristX + " Y");
rightWristX = results[0].pose.rightWrist.x;
rightWristY = results[0].pose.rightWrist.y;
console.log("Right Wrist: " + rightWristX + " X  " + rightWristX + " Y");
scoreRightWrist = results[0].pose.keypoints[10].score;
console.log("Score Of Right Wrist: " + scoreRightWrist);

}


}


function draw() {
image(video , 0 , 0 , 900 , 675);

if (scoreLeftWrist > 0.01) {
fill("red");
stroke("red");
circle(leftWristX , leftWristY , 20);
numberLeftWristY = Number(leftWristY);
removeDecimals = Math.floor(numberLeftWristY);
volume = removeDecimals/500;
song.setVolume(volume);
document.getElementById("volume").innerHTML = "Volume: " + volume;
}

if (scoreRightWrist > 0.01) {
    fill("red");
    stroke("red");
    circle(rightWristX , rightWristY , 20);


    if (rightWristY > 0 && rightWristY <= 100) {
    document.getElementById("speed").innerHTML = "Speed:  0.5x";
    song.rate(0.5);
    }
    else if (rightWristY > 100 && rightWristY <= 200) {
        document.getElementById("speed").innerHTML = "Speed:  1x";
        song.rate(1);
        }
        else if (rightWristY > 200 && rightWristY <= 300) {
            document.getElementById("speed").innerHTML = "Speed:  1.5x";
            song.rate(1.5);
            }
            else if (rightWristY > 300 && rightWristY <= 400) {
                document.getElementById("speed").innerHTML = "Speed:  2x";
                song.rate(2);
                }
                else if (rightWristY > 400) {
                    document.getElementById("speed").innerHTML = "Speed:  2.5x";
                    song.rate(2.5);
                    }




}


}



function playy() {

song.play();
song.setVolume(1);
song.rate(1);

}

