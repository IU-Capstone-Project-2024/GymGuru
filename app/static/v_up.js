const checkKeypoints = () => {
    if (extractedKeypoints.length !== 0) {
        const v_up = new Exercises();

        const updateKeypointsInterval = setInterval(() => {
            v_up.updateKeypoints();
        }, 10);

        const updateScoreInterval = setInterval(() => {
            v_up.gen_v_up();
        }, 100);

    } else {
        setTimeout(checkKeypoints, 1000);
    }
};

checkKeypoints();

if (finishButton != null) {
    finishButton.addEventListener('click', () => {
        socket.emit("v_up_crunch", score);
            alert(`Вы завершили с ${score} баллами!`);
    });
}