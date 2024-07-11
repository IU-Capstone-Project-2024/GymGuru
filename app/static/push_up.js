const checkKeypoints = () => {
    if (extractedKeypoints.length !== 0) {
        const push_up = new Exercises();

        const updateKeypointsInterval = setInterval(() => {
            push_up.updateKeypoints();
        }, 10);
  
        const updateScoreInterval = setInterval(() => {
            push_up.gen_push_up();
        }, 100);
  
    } else {
      setTimeout(checkKeypoints, 1000);
    }
  };
  
  checkKeypoints();
