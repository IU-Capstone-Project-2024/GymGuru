const checkKeypoints = () => {
    if (extractedKeypoints.length !== 0) {
        const lunge = new AdvancedExercise();

        const updateKeypointsInterval = setInterval(() => {
            lunge.updateKeypoints();
        }, 10);

        const updateScoreInterval = setInterval(() => {
            lunge.gen_lunge();
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
            socket.emit("lunge", score);
            alert(`Вы завершили с ${score} баллами!`);
        }
    });
}