const checkKeypoints = () => {
    if (extractedKeypoints.length !== 0) {
        const raise = new Exercises();

        const updateKeypointsInterval = setInterval(() => {
            raise.updateKeypoints();
        }, 10);
  
        const updateScoreInterval = setInterval(() => {
            raise.gen_raise();
        }, 100);
  
    } else {
      setTimeout(checkKeypoints, 1000);
    }
  };
  
  checkKeypoints();
