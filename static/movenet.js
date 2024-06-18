const localVideo = document.getElementById('localVideo');
const remoteCanvas = document.getElementById('remoteCanvas');
const ctx = remoteCanvas.getContext('2d');
const videoWidth = 640;
const videoHeight = 480;
remoteCanvas.width = videoWidth;
remoteCanvas.height = videoHeight;

// Variables to calculate FPS
let lastFrameTime = performance.now();
let frameCount = 0;
let fps = 0;

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

            localVideo.addEventListener('loadedmetadata', () => {
                setInterval(async () => {
                    ctx.drawImage(localVideo, 0, 0, remoteCanvas.width, remoteCanvas.height);
                    const poses = await detector.estimatePoses(localVideo);
                    if (poses.length > 0) {
                        const keypoints = poses[0].keypoints;

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

                    // Draw FPS on the canvas
                    ctx.fillStyle = 'red';
                    ctx.font = '20px Arial';
                    ctx.fillText(`FPS: ${fps.toFixed(2)}`, 10, 30);
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

        [6, 8],[8, 10],
        [5, 7],[7, 9],
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
