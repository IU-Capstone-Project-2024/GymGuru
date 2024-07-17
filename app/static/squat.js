const checkKeypoints = () => {
    if (extractedKeypoints.length !== 0) {
        const squat = new AdvancedExercise();

        const updateKeypointsInterval = setInterval(() => {
            squat.updateKeypoints();
        }, 10);

        const updateScoreInterval = setInterval(() => {
            squat.gen_squat();
        }, 100);

    } else {
        setTimeout(checkKeypoints, 1000);
    }
};

checkKeypoints();

if (finishButton != null) {
    finishButton.addEventListener('click', () => {
        if (plankExercise) {
            alert(`Вы завершили с ${score} секунд!`);
        } else {
            socket.emit("squat", score);
            alert(`Вы завершили с ${score} баллами!`);
        }
    });
}