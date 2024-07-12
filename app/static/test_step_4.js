const nextButton = document.getElementById('nextButton');

nextButton.addEventListener('click', () => {
    // TODO change
    socket.emit("step_4", 1);
});
