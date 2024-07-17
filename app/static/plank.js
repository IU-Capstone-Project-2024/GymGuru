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
        socket.emit("plank", Math.round(score));
        alert(`Вы простояли ${Math.round(score)} секунд!`);
    });
}