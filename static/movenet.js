const localVideo = document.getElementById('localVideo');
const resultCanvas = document.getElementById('resultCanvas');
const scoreElement = document.getElementById('score');
const finishButton = document.getElementById('finishButton');
const ctx = resultCanvas.getContext('2d');
const videoWidth = 1280;
const videoHeight = 640;
resultCanvas.width = videoWidth;
resultCanvas.height = videoHeight;

let extractedKeypoints = [];
let begin = false;
let stage = '';
let previousSound = null;
let error = null;

var socket = io()
socket.on('connect', function () {
    console.log('Connected to server')
});

// Variables to calculate FPS
let lastFrameTime = performance.now();
let frameCount = 0;
let fps = 0;
let score = 0;

finishButton.addEventListener('click', () => {
      socket.emit("push_up", score);
    alert(`Вы завершили с ${score} баллами!`);
});

function drawFPS() {
    ctx.fillStyle = 'green';
    ctx.font = '30px Arial';
    ctx.fillText(`FPS: ${fps.toFixed(2)}`, 10, 30);
}

function drawFPS() {
    ctx.fillStyle = 'green';
    ctx.font = '30px Arial';
    ctx.fillText(`FPS: ${fps.toFixed(2)}`, 10, 30);
}

function drawStage() {
    if (stage === "wrong") {
        ctx.fillStyle = 'red';
    } else {
        ctx.fillStyle = 'blue';
    }
    ctx.font = '30px Arial';
    ctx.fillText(stage, 10, 60);
}

function drawError() {
    ctx.font = '30px Arial';
    if (error != null) {
        ctx.fillStyle = 'red';
        ctx.fillText(error, 10, 90);

        if (error !== previousSound) {
            speakError(error);
        }
    }
    else {
        ctx.fillStyle = 'green';
        ctx.fillText('GOOD', 10, 90);
    }
}

function speakError(text) {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      speechSynthesis.speak(utterance);
      previousSound = text;
    }
}

async function init() {
    // Initialize pose detection model
    const detector = await poseDetection.createDetector(poseDetection.SupportedModels.MoveNet);

    // Get access to the mediapipe_full with specified width and height
    const constraints = {
        video: {
            width: videoWidth,
            height: videoHeight
        },
        audio: false
    };

    navigator.mediaDevices.getUserMedia(constraints)
        .then(stream => {
            localVideo.srcObject = stream;
            localVideo.play()

            localVideo.addEventListener('loadedmetadata', () => {
                setInterval(async () => {
                    ctx.drawImage(localVideo, 0, 0, resultCanvas.width, resultCanvas.height);
                    const poses = await detector.estimatePoses(localVideo);
                    if (poses.length > 0) {
                        let keypoints = poses[0].keypoints;
                        extractedKeypoints = keypoints;

                        // Draw keypoints
                        keypoints.forEach(keypoint => {
                            if (keypoint.score > 0.5) {
                                ctx.beginPath();
                                ctx.arc(keypoint.x, keypoint.y, 5, 0, 2 * Math.PI);
                                ctx.fillStyle = 'red';
                                ctx.fill();
                            }
                        });

                        // Draw lines between keypoints
                        drawSkeleton(keypoints, ctx);
                    }

                    // Update FPS calculation
                    const now = performance.now();
                    frameCount++;
                    const elapsed = now - lastFrameTime;
                    if (elapsed >= 1000) {
                        fps = (frameCount / elapsed) * 1000;
                        frameCount = 0;
                        lastFrameTime = now;
                        console.log(`FPS: ${fps.toFixed(2)}`);
                    }

                    drawFPS();
                    if (begin == true) {
                        drawStage();
                        drawError();
                    }
                }, 1000 / 25); // FPS set to 25
            });
        })
        .catch(error => console.error('Error accessing media devices.', error));
}

function drawSkeleton(keypoints, ctx) {
    // 0 - nose
    // 1 - leftEye
    // 2 - rightEye
    // 3 - leftEar
    // 4 - rightEar
    // 5 - leftShoulder
    // 6 - rightShoulder
    // 7 - leftElbow
    // 8 - rightElbow
    // 9 - leftWrist
    // 10 - rightWrist
    // 11 - leftHip
    // 12 - rightHip
    // 13 - leftKnee
    // 14 - rightKnee
    // 15 - leftAnkle
    // 16 - rightAnkle
    const adjacentPairs = [

        [6, 8], [8, 10],
        [5, 7], [7, 9],
        // [0, 5], [5, 6], [6, 7], [7, 8], // Left arm
        // [5, 11], [6, 12], // Shoulders to hips
        // [11, 12], // Hips
        // [11, 13], [13, 15], // Left leg
        // [12, 14], [14, 16]  // Right leg
    ];

    adjacentPairs.forEach(pair => {
        const [i, j] = pair;
        const kp1 = keypoints[i];
        const kp2 = keypoints[j];

        if (kp1.score > 0.5 && kp2.score > 0.5) {
            ctx.beginPath();
            ctx.moveTo(kp1.x, kp1.y);
            ctx.lineTo(kp2.x, kp2.y);
            ctx.lineWidth = 2;
            ctx.strokeStyle = 'green';
            ctx.stroke();
        }
    });
}

init();
