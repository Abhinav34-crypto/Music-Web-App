var song="";
var song2="";
songstatus=false;
song2status=false;
leftWristX=0;
leftWristY=0;
rightWristX=0;
rightWristY=0;
leftWristScore= 0;
rightWristScore= 0;

function setup(){
    canvas=createCanvas(600 , 600);
    canvas.center();
    video=createCapture(VIDEO);
    video.hide();
    

    poseNet=ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function gotPoses(results){
    if(results.length>0)
    {
        console.log(results);
        leftWristX= results[0].pose.leftWrist.x;
        leftWristY= results[0].pose.leftWrist.y;
        rightWristX= results[0].pose.rightWrist.x;
        rightWristY= results[0].pose.rightWrist.y;
        leftWristScore=results[0].pose.keypoints[9].score;
        rightWristScore=results[0].pose.keypoints[10].score;
        console.log(leftWristX , leftWristY , rightWristX , rightWristY);
    }
  }

function modelLoaded(){
    console.log("PoseNet is Initialized");
}

function draw(){
    stroke("#FF0000");
    fill("FF0000");
    image(video , 0 , 0 , 600 , 600);
    songstatus = song.isPlaying();
    song2status = song2.isPlaying();
    if(leftWristScore > 0.2){
         circle(leftWristX , leftWristY,20);
         song2.stop();
        if(songstatus==false){
           song.play();
        }
    }
    if(rightWristScore >0.2){
        circle(rightWristX , rightWristY , 20);
        song.stop();
        if(song2status==false){
             song2.play();
        }
    }
}

function preload(){

   song=loadSound("music.mp3");

   song2= loadSound("music2.mp3");
}

function play(){
    song.play(); 
    song2.play();
    
}
