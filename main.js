believer = "";
bones = "";
believer_status = "";
bones_status = "";
scoreRightWrist = 0;
scoreLeftWrist = 0;
leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;
function preload() {
    believer = loadSound("Believer.mp3");
    bones = loadSound("Bones.mp3");
}
function setup() {
    canvas = createCanvas(500, 400);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}
function modelLoaded() {
    console.log("PoseNet is Initialized !");
}
function gotPoses(results) {
    if (results.length > 0) {
        console.log(results);
        scoreRightWrist = results[0].pose.keypoints[10].score;
        scoreLeftWrist = results[0].pose.keypoints[9].score;
        console.log("ScoreLeftWrist : " + scoreLeftWrist + " | ScoreRightWrist : " + scoreRightWrist);
        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("LeftWristX = " + leftWristX + " | LeftWristY = " + leftWristY + " | RightWristX = " + rightWristX + " | RightWristY = " + rightWristY);
    }
}
function draw(){
    image(video, 0, 0, 500, 400);
    fill('#ff00ff');
    stroke('#ff00ff');
    believer_status = believer.isPlaying();
    bones_status = bones.isPlaying();
    if (scoreLeftWrist > 0.2) {
        circle(leftWristX, leftWristY, 20);
        bones.stop();
        if (believer_status == false) {
            believer.play();
            document.getElementById("song").innerHTML = "Song : Believer";
        }
    }
    if (scoreRightWrist > 0.2) {
        circle(rightWristX, rightWristY, 20);
        believer.stop();
        if (bones_status  == false) {
            bones.play();
            document.getElementById("song").innerHTML = "Song : Bones";
        }
    }
}