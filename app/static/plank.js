const checkKeypoints = () => {
    if (extractedKeypoints.length !== 0) {
        const plank = new Exercises();
        plankExercise = true;

        const updateKeypointsInterval = setInterval(() => {
            plank.updateKeypoints();
        }, 10);

        const updateScoreInterval = setInterval(() => {
            plank.gen_plank();
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
            socket.emit("plank", score);
            alert(`Вы завершили с ${score} баллами!`);
        }
    });
}