const checkKeypoints = () => {
    if (extractedKeypoints.length !== 0) {
        const curl = new Exercises();

        const updateKeypointsInterval = setInterval(() => {
            curl.updateKeypoints();
        }, 10);

        const updateScoreInterval = setInterval(() => {
            curl.gen_curl();
        }, 100);

    } else {
        setTimeout(checkKeypoints, 1000);
    }
};

checkKeypoints();

if (finishButton != null) {
    finishButton.addEventListener('click', () => {
         socket.emit("curl", score);
            alert(`Вы завершили с ${score} баллами!`);
    });
}
