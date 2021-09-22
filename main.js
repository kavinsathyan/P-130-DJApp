song = "";
song1 = "";
song2 = "";
song1status = "";
song2status = "";

function preload()
{
  song1 = loadSound("song1.mp3");
  song2 = loadSound("song2.mp3")
}

scoreRightWrist = 0;
scoreLeftWrist = 0;

leftWristX = 0;
leftWristY = 0;

rightWristX = 0;
rightWristY = 0;

function setup() {
	canvas =  createCanvas(600, 500);
	canvas.center();

	video = createCapture(VIDEO);
	video.hide();

	poseNet = ml5.poseNet(video, modelLoaded);
	poseNet.on('pose', gotPoses);
}

function modelLoaded() {
  console.log('PoseNet Is Initialized');
}

function gotPoses(results)
{
  if(results.length > 0)
  {
	console.log(results);
  scoreRightWrist =  results[0].pose.keypoints[10].score;
	scoreLeftWrist =  results[0].pose.keypoints[9].score;
	console.log("scoreRightWrist = " + scoreRightWrist + " scoreLeftWrist = " + scoreLeftWrist);
	
	rightWristX = results[0].pose.rightWrist.x;
	rightWristY = results[0].pose.rightWrist.y;
	console.log("rightWristX = " + rightWristX +" rightWristY = "+ rightWristY);

	leftWristX = results[0].pose.leftWrist.x;
	leftWristY = results[0].pose.leftWrist.y;
	console.log("leftWristX = " + leftWristX +" leftWristY = "+ leftWristY);
		
  }
}

function draw() {
	image(video, 0, 0, 600, 500);
	song1status = song1.isPlaying();
	fill("#FF0000");
	stroke("#FF0000");

	if(scoreLeftWrist > 0.2)
	{
		circle(leftWristX,leftWristY,20);
		song2.stop();
		if(song1status == "false")
		{
			song1.play();
			song1.setVolume(1);
	        song1.rate(1);
			song ="song1.mp3"
		}
	}

  if(scoreRightWrist > 0.2)
	{
		circle(rightWristX,rightWristY,20);
		song1.stop();
		if(song2status == "false")
		{
			song2.play();
			song2.setVolume(1);
	        song2.rate(1);
			song ="song2.mp3"
		}
	}

	

}




