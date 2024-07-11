const nextButton = document.getElementById('nextButton');

nextButton.addEventListener('click', () => {
    socket.emit("step_4", score);
});
