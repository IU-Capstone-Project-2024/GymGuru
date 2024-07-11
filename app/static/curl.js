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
