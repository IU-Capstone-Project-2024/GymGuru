const checkKeypoints = () => {
    if (extractedKeypoints.length !== 0) {
        const bend = new Exercises();

        const updateKeypointsInterval = setInterval(() => {
            bend.updateKeypoints();
        }, 10);
  
        const updateScoreInterval = setInterval(() => {
            bend.gen_bend();
        }, 100);
  
    } else {
      setTimeout(checkKeypoints, 1000);
    }
  };
  
  checkKeypoints();
