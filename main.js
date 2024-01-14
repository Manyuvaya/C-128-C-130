song=""
leftWristX=0
leftWristY=0
rightWristX=0
rightWristY=0
function preload(){
    song=loadSound("song.mp3")
}

function setup(){
    canvas=createCanvas(600,500)
    canvas.center()
    video=createCapture(VIDEO)
    video.hide()
    poseNet=ml5.poseNet(video,modelLoaded)
    poseNet.on("pose",got_results)
}
function modelLoaded(){
    console.log("poseNet is Loaded")
}
function got_results(results){
    if(results.length>0){
        console.log(results)
        leftWristX=results[0].pose.leftWrist.x;
        leftWristY=results[0].pose.leftWrist.y;
        rightWristX=results[0].pose.rightWrist.x;
        rightWristY=results[0].pose.rightWrist.y;
    }
}
function draw(){
    image(video,0,0,600,500)
    fill("red")
    stroke("red")

    circle(leftWristX,leftWristY,20)
    numLeftWristY=Number(leftWristY)
    remove_decimal=floor(numLeftWristY)
    volume=remove_decimal/500
    document.getElementById("volume").innerHTML="Volume = "+volume
    song.setVolume(volume)

    circle(rightWristX,rightWristY,20)
    if(rightWristY>0 && rightWristY<=100){
        document.getElementById("speed").innerHTML="Speed = 0.5x"
        song.rate(0.5)
    }
    else if(rightWristY>100 && rightWristY<=200){
        document.getElementById("speed").innerHTML="Speed = 1x"
        song.rate(1)
    }
    else if(rightWristY>200 && rightWristY<=300){
        document.getElementById("speed").innerHTML="Speed = 1.5x"
        song.rate(1.5)
    }
    else if(rightWristY>300 && rightWristY<=400){
        document.getElementById("speed").innerHTML="Speed = 2x"
        song.rate(2)
    }
    else if (rightWristY>400 && rightWristY<=500){
        document.getElementById("speed").innerHTML="Speed = 2.5x"
        song.rate(2.5)
    }
    
}
function play(){
    song.play()
    song.setVolume(1)
    song.rate(1)
}
