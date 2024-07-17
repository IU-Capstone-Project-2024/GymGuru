const checkKeypoints = () => {
    if (extractedKeypoints.length !== 0) {
        const push_up = new Exercises();

        const updateKeypointsInterval = setInterval(() => {
            push_up.updateKeypoints();
        }, 10);

        const updateScoreInterval = setInterval(() => {
            push_up.gen_push_up();
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
            socket.emit("push_up", score);
            alert(`Вы завершили с ${score} баллами!`);
        }
    });
}
