const checkKeypoints = () => {
    if (extractedKeypoints.length !== 0 && extractedHandKeypoints.length !== 0) {
        bendExercise = true;
        const bend = new AdvancedExercise();

        const updateKeypointsInterval = setInterval(() => {
            if (extractedKeypoints.length !== 0 && extractedHandKeypoints.length != 0) {
                bend.updateKeypoints();
            }
        }, 10);
  
        const updateScoreInterval = setInterval(() => {
            if (extractedKeypoints.length !== 0 && extractedHandKeypoints.length != 0) {
                bend.gen_bend();
            }
        }, 100);
  
    } else {
        const updateError = setInterval(() => {
            if (extractedHandKeypoints.length == 0) error = 'hands not in frame';
        }, 100);
        
        setTimeout(checkKeypoints, 1000);
    }
  };
  
  checkKeypoints();
