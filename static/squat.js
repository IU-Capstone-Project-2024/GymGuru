const checkKeypoints = () => {
    if (extractedKeypoints.length !== 0) {
        const squat = new Exercises();

        const updateKeypointsInterval = setInterval(() => {
            squat.updateKeypoints();
        }, 10);
  
        const updateScoreInterval = setInterval(() => {
            squat.gen_squat();
        }, 100);
  
    } else {
      setTimeout(checkKeypoints, 1000);
    }
  };
  
  checkKeypoints();
