const checkKeypoints = () => {
    if (extractedKeypoints.length !== 0) {
        const crunch = new Exercises();

        const updateKeypointsInterval = setInterval(() => {
            crunch.updateKeypoints();
        }, 10);

        const updateScoreInterval = setInterval(() => {
            crunch.gen_crunch();
        }, 100);

    } else {
        setTimeout(checkKeypoints, 1000);
    }
};

checkKeypoints();

if (finishButton != null) {
    finishButton.addEventListener('click', () => {
        socket.emit("crunch", score);
        alert(`Вы завершили с ${score} баллами!`);
    });
}