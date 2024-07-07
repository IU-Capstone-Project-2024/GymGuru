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
let extractedHandKeypoints = [];
let begin = false;
let stage = '';
let previousSound = null;
let error = null;

var socket = io()
socket.on('connect', function () {
    console.log('Connected to server')
});

let lastFrameTime = performance.now();
let frameCount = 0;
let fps = 0;
let score = 0;
let bend = null;

if (finishButton != null) {
    finishButton.addEventListener('click', () => {
        ialert(`Вы завершили с ${bend}!`);
    });
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
    }
    else {
        ctx.fillStyle = 'green';
        ctx.fillText('GOOD', 10, 90);
    }
    if (error !== previousSound) {
        speakError(error);
    }
}

function speakError(text) {
    if ('speechSynthesis' in window) {
        if (text != null) {
            const utterance = new SpeechSynthesisUtterance(text);
            speechSynthesis.speak(utterance);
        }
        previousSound = text;
    }
}

async function init() {
    // Initialize pose detection model
    const poseModel = poseDetection.SupportedModels.BlazePose;
    const handModel = handPoseDetection.SupportedModels.MediaPipeHands;
    
    const poseDetector = await poseDetection.createDetector(poseModel, {
        runtime: 'mediapipe',
        solutionPath: 'https://cdn.jsdelivr.net/npm/@mediapipe/pose'
        });
    const handDetector = await handPoseDetection.createDetector(handModel, {
        runtime: 'mediapipe',
        solutionPath: 'https://cdn.jsdelivr.net/npm/@mediapipe/hands',
        modelType: 'full'
      });

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
                    const poses = await poseDetector.estimatePoses(localVideo);
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

                    const hands = await handDetector.estimateHands(localVideo);
                    if (hands.length > 0) {
                        let handKeypoints = [];
                        hands.forEach(hand => {
                            handKeypoints.push(hand.keypoints);
                        });
                        extractedHandKeypoints = handKeypoints;
                        console.log(extractedHandKeypoints);

                        // Draw hand keypoints
                        handKeypoints.forEach(hand => {
                            hand.forEach(keypoint => {
                              ctx.beginPath();
                              ctx.arc(keypoint.x, keypoint.y, 3, 0, 2 * Math.PI);
                              ctx.fillStyle = 'blue';
                              ctx.fill();
                            });
                        });
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
    const adjacentPairs = [
        [11, 13], [13, 15],
        [12, 14], [14, 16],
        [23, 25], [25, 27], [27, 29], [27, 31], [29, 31],
        [24, 26], [26, 28], [28, 30], [28, 32], [30, 32]
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
