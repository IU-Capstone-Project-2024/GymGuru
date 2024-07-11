const nextButton = document.getElementById('nextButton');

nextButton.addEventListener('click', () => {
    socket.emit("step_3", score);
});
