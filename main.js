song="";
scoreLeftWrist = 0;
scoreRightWrist = 0;

var songtype = 0;
function preload(){
    song=loadSound("music.mp3");
    song1=loadSound("music2.mp3");
    console.log("preload");
}

leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;

function setup(){
    canvas=createCanvas(600, 500);
    canvas.center();
    video=createCapture(VIDEO);
    video.hide();
    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses)
}

function modelLoaded(){
    console.log('PoseNet Is Initialised');
}
function gotPoses(results)
{
    if(results.length > 0)
    {
       //console.log(results);
       scoreLeftWrist = results[0].pose.keypoints[9].score;
       scoreRightWrist = results[0].pose.keypoints[10].score;
       //console.log("scoreLeftWrist =" + scoreLeftWrist);
       //console.log("scoreRightWrist =" + scoreRightWrist);

       leftWristX = results[0].pose.leftWrist.x;
       leftWristY = results[0].pose.leftWrist.y;
       //console.log("leftWristX = " + leftWristX +" leftWristY = " + leftWristY);

       rightWristX = results[0].pose.rightWrist.x;
       rightWristY = results[0].pose.rightWrist.y;
       //console.log("rightWristX = " + rightWristX +" rightWristY = " + rightWristY);
    }
}

function draw(){
    image(video, 0, 0, 600, 500);

    fill("#FF0000");
    stroke("#FF0000");
if (scoreRightWrist > 0.2) {
    

    
    circle(rightWristX,rightWristY,20)

    if (rightWristY >00 && rightWristY <= 200) {
        document.getElementById("speed").innerHTML = "Speed = 0.5x"
        //song=loadSound("music.mp3");
        songtype=0;
        console.log("music1");
    }
    else if (rightWristY >200 && rightWristY <= 500) {
        document.getElementById("speed").innerHTML = "Speed = 99999x"
        //song=loadSound("music2.mp3");
        songtype = 1;    
        console.log("music2");
    }
    
}
    if(scoreLeftWrist > 0.2)
    {
    circle(leftWristX,leftWristY,20);
    InNumberleftWristY = Number(leftWristY);
    remove_decimals = floor(InNumberleftWristY);
    volume = remove_decimals/500;
    document.getElementById('volume').innerHTML = "Volume = " + volume;
    song.setVolume(volume);
    }
}

function play()
{
    if (songtype == 0)
    {
        song.stop();
        song1.stop();
        song.play();
        song.setVolume(0.5);
        song.rate(1);
    }
    else
    {
        song.stop();
        song1.stop();
        song1.play();
        song1.setVolume(0.5);
        song1.rate(1);
    }
}