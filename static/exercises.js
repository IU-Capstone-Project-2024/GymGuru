class BaseExercise {
  constructor() {
    this.stage = null;
    this.error = null;
    this.startTime = null;
    this.endTime =  null;

    this.keypoints = extractedKeypoints;

    this.initializeVariables();
  }

  initializeVariables() {
    this.nose = this.keypoints[0];
    this.shoulder_left = this.keypoints[5];
    this.shoulder_right = this.keypoints[6];
    this.elbow_left = this.keypoints[7];
    this.elbow_right = this.keypoints[8];
    this.wrist_left = this.keypoints[9];
    this.wrist_right = this.keypoints[10];
    this.hip_left = this.keypoints[11];
    this.hip_right = this.keypoints[12];
    this.knee_left = this.keypoints[13];
    this.knee_right = this.keypoints[14];
    this.ankle_left = this.keypoints[15];
    this.ankle_right = this.keypoints[16];
  }

  calculate_angle(a, b, c) {
    const radians = Math.atan2(c.y - b.y, c.x - b.x) - Math.atan2(a.y - b.y, a.x - b.x);
    let angle = Math.abs(radians * 180.0 / Math.PI);
    if (angle > 180.0) {
      angle = 360 - angle;
      angle = Math.abs(angle);
    }
    return angle;
  }

  startTimer() {
    this.startTime = new Date().getTime();
  }
  
  stopTimer() {
    this.endTime = new Date().getTime();
  }
  
  timeElapsed() {
    const timeElapsed = (this.endTime - this.startTime) / 1000;
    return timeElapsed;
  }

  updateError(errorMessage) {
    this.error = errorMessage;
    error = this.error;
  }

  updateStage(stageMessage) {
    this.stage = stageMessage;
    stage = this.stage;
  }

  updateKeypoints() {
    this.initializeVariables();
  }
}

class Exercises extends BaseExercise {
  constructor() {
    super();
  }

  gen_push_up() {
    const shoulder_elbow_wrist_angle_left = this.calculate_angle(this.shoulder_left, this.elbow_left, this.wrist_left);
    const shoulder_elbow_wrist_angle_right = this.calculate_angle(this.shoulder_right, this.elbow_right, this.wrist_right);
    const shoulder_hip_knee_angle_left = this.calculate_angle(this.shoulder_left, this.hip_left, this.knee_left);
    const shoulder_hip_knee_angle_right = this.calculate_angle(this.shoulder_right, this.hip_right, this.knee_right);
    const hip_knee_ankle_angle_left = this.calculate_angle(this.hip_left, this.knee_left, this.ankle_left);
    const hip_knee_ankle_angle_right = this.calculate_angle(this.hip_right, this.knee_right, this.ankle_right);

    if (this.wrist_left.y > this.knee_left.y && this.wrist_right.y > this.knee_right.y) {
      begin = true;
    }
    if (this.wrist_left.y < this.knee_left.y && this.wrist_right.y < this.knee_right.y) {
      begin = false;
    }
    if (shoulder_elbow_wrist_angle_left <= 120 && shoulder_elbow_wrist_angle_left >= 30 && shoulder_elbow_wrist_angle_right <= 120 && shoulder_elbow_wrist_angle_right >= 30 && this.nose.y >= this.shoulder_right.y && hip_knee_ankle_angle_right >= 150 && shoulder_hip_knee_angle_right >= 150 && hip_knee_ankle_angle_left >= 150 && shoulder_hip_knee_angle_left >= 150 && this.wrist_left.y > this.shoulder_left.y && this.wrist_right.y > this.shoulder_right.y && this.wrist_left.y > this.knee_left.y && this.wrist_right.y > this.knee_right.y) {
      if (this.stage != "down") {
        this.startTimer();
      }
      this.updateStage('down');
    }
    if (shoulder_hip_knee_angle_right < 150) {
      this.updateStage('wrong');
      this.updateError('bad back');
      this.stopTimer();
    }
    if (hip_knee_ankle_angle_right < 150) {
      this.updateStage('wrong');
      this.updateError('straighten legs');
      this.stopTimer();
    }
    if (this.wrist_left.y < this.shoulder_left.y || this.wrist_right.y < this.shoulder_right.y) {
      this.updateStage('wrong');
      this.stopTimer();
    }
    if (shoulder_elbow_wrist_angle_left >= 160 && shoulder_elbow_wrist_angle_right >= 160 && this.stage === "down" && hip_knee_ankle_angle_right >= 150 && shoulder_hip_knee_angle_right >= 150 && hip_knee_ankle_angle_left >= 150 && shoulder_hip_knee_angle_left >= 150 && this.wrist_left.y > this.shoulder_left.y && this.wrist_right.y > this.shoulder_right.y && this.wrist_left.y > this.knee_left.y && this.wrist_right.y > this.knee_right.y) {
      this.stopTimer();
      if (this.timeElapsed() <= 3) {
        this.updateStage('up');
        score += 1;
      }
      else {
        this.updateStage('wrong');
        this.updateError('go up quicker');
      }
    }
    if (shoulder_hip_knee_angle_right >= 150 && hip_knee_ankle_angle_right >= 150 && this.wrist_left.y > this.shoulder_left.y && this.wrist_right.y > this.shoulder_right.y && this.wrist_left.y > this.hip_left.y && this.wrist_right.y > this.hip_right.y) {
      if (this.stage === "wrong") {
        this.updateStage('');
      }
      this.updateError(null);
    }
  }

  gen_curl() {
    const shoulder_hip_ankle_angle_left = this.calculate_angle(this.shoulder_left, this.hip_left, this.ankle_left);
    const shoulder_hip_ankle_angle_right = this.calculate_angle(this.shoulder_right, this.hip_right, this.ankle_right);
    const shoulder_elbow_wrist_angle_left = this.calculate_angle(this.shoulder_left, this.elbow_left, this.wrist_left);
    const shoulder_elbow_wrist_angle_right = this.calculate_angle(this.shoulder_right, this.elbow_right, this.wrist_right);

    if (shoulder_hip_ankle_angle_left >= 160 && shoulder_hip_ankle_angle_right >= 160 && this.shoulder_left.y < this.knee_left.y && this.shoulder_right.y < this.knee_right.y) {
      begin = true;
    }
    if (shoulder_hip_ankle_angle_left >= 160 && shoulder_hip_ankle_angle_right >= 160 && this.shoulder_left.y < this.knee_left.y && this.shoulder_right.y < this.knee_right.y && this.elbow_left.y < this.wrist_left.y && this.elbow_right.y < this.wrist_right.y && shoulder_elbow_wrist_angle_left >= 150 && shoulder_elbow_wrist_angle_right >= 150) {
      this.updateStage('down');
    }
    if (shoulder_hip_ankle_angle_left >= 160 && shoulder_hip_ankle_angle_right >= 160 && this.shoulder_left.y < this.knee_left.y && this.shoulder_right.y < this.knee_right.y && this.elbow_left.y > this.wrist_left.y && this.elbow_right.y > this.wrist_right.y && shoulder_elbow_wrist_angle_left < 80 && shoulder_elbow_wrist_angle_right < 80 && this.stage === 'down') {
      this.updateStage('up');
      score += 1;
    }
    if (shoulder_hip_ankle_angle_left < 160 || shoulder_hip_ankle_angle_right < 160) {
      this.updateError('straighten back');
    }
    if (shoulder_hip_ankle_angle_left >= 160 && shoulder_hip_ankle_angle_right >= 160) {
      this.updateError(null);
    }
  }

  gen_crunch() {
    const shoulder_hip_ankle_angle_left = this.calculate_angle(this.shoulder_left, this.hip_left, this.ankle_left);
    const shoulder_hip_ankle_angle_right = this.calculate_angle(this.shoulder_right, this.hip_right, this.ankle_right);
    const hip_knee_ankle_angle_left = this.calculate_angle(this.hip_left, this.knee_left, this.ankle_left);
    const hip_knee_ankle_angle_right = this.calculate_angle(this.hip_right, this.knee_right, this.ankle_right);

    if (hip_knee_ankle_angle_right < 120 && hip_knee_ankle_angle_left < 120 && this.knee_left.y < this.shoulder_left.y && this.knee_right.y < this.shoulder_right.y && this.knee_left.y < this.hip_left.y && this.knee_right.y < this.hip_right.y)  {
      begin = true;
    }
    if (shoulder_hip_ankle_angle_left >= 160 && shoulder_hip_ankle_angle_right >= 160 && hip_knee_ankle_angle_left < 120 && hip_knee_ankle_angle_right < 120 && this.knee_left.y < this.shoulder_left.y && this.knee_right.y < this.shoulder_right.y && this.knee_left.y < this.hip_left.y && this.knee_right.y < this.hip_right.y) {
      this.updateStage('down');
    }
    if (shoulder_hip_ankle_angle_left < 120 && shoulder_hip_ankle_angle_right < 120 && hip_knee_ankle_angle_left < 120 && hip_knee_ankle_angle_right < 120 && this.shoulder_left.y < this.knee_left.y && this.shoulder_right.y < this.knee_right.y && this.knee_left.y < this.hip_left.y && this.knee_right.y < this.hip_right.y && this.stage === "down") {
      this.updateStage('up');
      score += 1;
    }
  }

  gen_v_up() {
    const shoulder_hip_ankle_angle_left = this.calculate_angle(this.shoulder_left, this.hip_left, this.ankle_left);
    const shoulder_hip_ankle_angle_right = this.calculate_angle(this.shoulder_right, this.hip_right, this.ankle_right);
    const hip_knee_ankle_angle_left = this.calculate_angle(this.hip_left, this.knee_left, this.ankle_left);
    const hip_knee_ankle_angle_right = this.calculate_angle(this.hip_right, this.knee_right, this.ankle_right);

    if (shoulder_hip_ankle_angle_left >= 160 && shoulder_hip_ankle_angle_right >= 160 && hip_knee_ankle_angle_left >= 160 && hip_knee_ankle_angle_right >= 160) {
      begin = true;
      this.updateStage('down');
    }
    if (shoulder_hip_ankle_angle_left < 150 && shoulder_hip_ankle_angle_right < 150 && this.nose.y < this.hip_left.y && this.ankle_left.y < this.hip_left.y && this.ankle_right.y < this.hip_right.y && this.stage === "down") {
      this.updateStage('up');
      score += 1;
    }
  }

  gen_raise() {
    const shoulder_hip_ankle_angle_left = this.calculate_angle(this.shoulder_left, this.hip_left, this.ankle_left);
    const shoulder_hip_ankle_angle_right = this.calculate_angle(this.shoulder_right, this.hip_right, this.ankle_right);
    const shoulder_elbow_wrist_angle_left = this.calculate_angle(this.shoulder_left, this.elbow_left, this.wrist_left);
    const shoulder_elbow_wrist_angle_right = this.calculate_angle(this.shoulder_right, this.elbow_right, this.wrist_right);
    const hip_shoulder_wrist_angle_left = this.calculate_angle(this.hip_left, this.shoulder_left, this.wrist_left);
    const hip_shoulder_wrist_angle_right = this.calculate_angle(this.hip_right, this.shoulder_right, this.wrist_right);

    if (shoulder_hip_ankle_angle_left >= 160 && shoulder_hip_ankle_angle_right >= 160 && this.shoulder_left.y < this.knee_left.y && this.shoulder_right.y < this.knee_right.y && this.elbow_left.y < this.wrist_left.y && this.elbow_right.y < this.wrist_right.y && shoulder_elbow_wrist_angle_left >= 150 && shoulder_elbow_wrist_angle_right >= 150 && hip_shoulder_wrist_angle_left < 30 && hip_shoulder_wrist_angle_right < 30) {
      begin = true;
      this.updateStage('down');
    }
    if (shoulder_hip_ankle_angle_left >= 160 && shoulder_hip_ankle_angle_right >= 160 && this.shoulder_left.y < this.knee_left.y && this.shoulder_right.y < this.knee_right.y && shoulder_elbow_wrist_angle_left >= 150 && shoulder_elbow_wrist_angle_right >= 150 && hip_shoulder_wrist_angle_left > 70 && hip_shoulder_wrist_angle_right > 70 && this.stage === 'down') {
      this.updateStage('up');
      score += 1;
    }
  }

  gen_plank() {
    const shoulder_elbow_wrist_angle_left = this.calculate_angle(this.shoulder_left, this.elbow_left, this.wrist_left);
    const shoulder_elbow_wrist_angle_right = this.calculate_angle(this.shoulder_right, this.elbow_right, this.wrist_right);
    const shoulder_hip_knee_angle_left = this.calculate_angle(this.shoulder_left, this.hip_left, this.knee_left);
    const shoulder_hip_knee_angle_right = this.calculate_angle(this.shoulder_right, this.hip_right, this.knee_right);
    const hip_knee_ankle_angle_left = this.calculate_angle(this.hip_left, this.knee_left, this.ankle_left);
    const hip_knee_ankle_angle_right = this.calculate_angle(this.hip_right, this.knee_right, this.ankle_right);

    if (this.wrist_left.y > this.knee_left.y && this.wrist_right.y > this.knee_right.y) {
      begin = true;
    }
    if (this.wrist_left.y < this.knee_left.y && this.wrist_right.y < this.knee_right.y) {
      begin = false;
    }
    if (this.stage !== "up" && shoulder_elbow_wrist_angle_left >= 160 && shoulder_elbow_wrist_angle_right >= 160 && hip_knee_ankle_angle_right >= 150 && hip_knee_ankle_angle_left >= 150 && shoulder_hip_knee_angle_right >= 150 && shoulder_hip_knee_angle_left >= 150 && this.wrist_left.y > this.shoulder_left.y && this.wrist_right.y > this.shoulder_right.y && this.wrist_left.y > this.knee_left.y && this.wrist_right.y > this.knee_right.y) {
      this.updateStage('up');
      this.startTimer();
    }
    if (this.stage === "up") {
      this.stopTimer();
      plank = this.timeElapsed();
    }
    if (this.stage === "up" && (shoulder_elbow_wrist_angle_left <= 120 || shoulder_elbow_wrist_angle_right <= 120 || this.wrist_left.y < this.shoulder_left.y || this.wrist_right.y < this.shoulder_right.y || this.knee_left.y >= this.ankle_left.y || this.knee_right.y >= this.ankle_right.y)) {
      this.updateStage('down');
      this.stopTimer();
      plank = this.timeElapsed();
    }
    if (shoulder_hip_knee_angle_right < 150) {
      this.updateError('bad back');
    }
    if (hip_knee_ankle_angle_right < 150) {
      this.updateError('straighten legs');
    }
    if (shoulder_hip_knee_angle_right >= 150 && hip_knee_ankle_angle_right >= 150) {
      this.updateError(null);
    }
  }
}

class AdvancedExercise extends BaseExercise {
  constructor() {
    super();
  }

  initializeVariables() {
    this.keypoints = extractedKeypoints;
    this.nose = this.keypoints[0];
    this.shoulder_left = this.keypoints[11];
    this.shoulder_right = this.keypoints[12];
    this.elbow_left = this.keypoints[13];
    this.elbow_right = this.keypoints[14];
    this.hip_left = this.keypoints[23];
    this.hip_right = this.keypoints[24];
    this.knee_left = this.keypoints[25];
    this.knee_right = this.keypoints[26];
    this.ankle_left = this.keypoints[27];
    this.ankle_right = this.keypoints[28];
    this.heel_left = this.keypoints[29];
    this.heel_right = this.keypoints[30];
    this.foot_index_left = this.keypoints[31];
    this.foot_index_right = this.keypoints[32];

    this.handsKeypoints = extractedHandKeypoints;
    this.wrist = this.handsKeypoints[0];
    this.middle_finger = this.handsKeypoints[17];
    this.finger = this.handsKeypoints[12];
  }

  updateKeypoints() {
    this.initializeVariables();
  }

  euclideanDistance(a, b) {
    return Math.sqrt(Math.pow(b.x - a.x, 2) + Math.pow(b.y - a.y, 2));
  }  

  leftKneeExceedsFoot () {
    if ((this.knee_left.x < this.foot_index_left.x && this.knee_left.x < this.heel_left.x) || (this.knee_left.x > this.foot_index_left.x && this.knee_left.x > this.heel_left.x)) {
      return true;
    }
    else {
      return false;
    }
  }

  rightKneeExceedsFoot () {
    if ((this.knee_right.x < this.foot_index_right.x && this.knee_right.x < this.heel_right.x) || (this.knee_right.x > this.foot_index_right.x && this.knee_right.x > this.heel_right.x)) {
      return true;
    }
    else {
      return false;
    }
  }

  gen_bend() {
    const hip_knee_ankle_angle_left = this.calculate_angle(this.hip_left, this.knee_left, this.ankle_left);
    const hip_knee_ankle_angle_right = this.calculate_angle(this.hip_right, this.knee_right, this.ankle_right);

    if (hip_knee_ankle_angle_left >= 165 && hip_knee_ankle_angle_right >= 165) {
      begin = true;
    }
    if (hip_knee_ankle_angle_left >= 165 && hip_knee_ankle_angle_right >= 165 && this.finger.y >= Math.max(this.ankle_left.y, this.ankle_right.y) && this.middle_finger.y < Math.max(this.ankle_left.y, this.ankle_right.y) && bend !== 'fists' && bend !== 'palms') {
      bend = 'fingers';
    }
    if (hip_knee_ankle_angle_left >= 165 && hip_knee_ankle_angle_right >= 165 && this.middle_finger.y >= Math.max(this.ankle_left.y, this.ankle_right.y) && this.wrist.y < Math.max(this.ankle_left.y, this.ankle_right.y) && bend !== 'palms') {
      bend = 'fists';
    }
    if (hip_knee_ankle_angle_left >= 165 && hip_knee_ankle_angle_right >= 165 && this.wrist.y >= Math.max(this.ankle_left.y, this.ankle_right.y)) {
      bend = 'palms';
    }
    if (hip_knee_ankle_angle_left < 165 || hip_knee_ankle_angle_right < 165) {
      this.updateError('bad knees');
    }
    if (hip_knee_ankle_angle_left >= 165 && hip_knee_ankle_angle_right >= 165) {
      this.updateError(null);
    }
  }

  gen_squat() {
    const shoulder_hip_ankle_angle_left = this.calculate_angle(this.shoulder_left, this.hip_left, this.ankle_left);
    const shoulder_hip_ankle_angle_right = this.calculate_angle(this.shoulder_right, this.hip_right, this.ankle_right);
    const shoulder_hip_knee_angle_left = this.calculate_angle(this.shoulder_left, this.hip_left, this.knee_left);
    const shoulder_hip_knee_angle_right = this.calculate_angle(this.shoulder_right, this.hip_right, this.knee_right);
    const hip_knee_ankle_angle_left = this.calculate_angle(this.hip_left, this.knee_left, this.ankle_left);
    const hip_knee_ankle_angle_right = this.calculate_angle(this.hip_right, this.knee_right, this.ankle_right);

    if (shoulder_hip_ankle_angle_left >= 160 && shoulder_hip_ankle_angle_right >= 160) {
      begin = true;
    }
    if (this.nose.y < this.knee_left.y && shoulder_hip_ankle_angle_left >= 160 && shoulder_hip_ankle_angle_right >= 160 && hip_knee_ankle_angle_left >= 160 && hip_knee_ankle_angle_right >= 160 && this.stage !== "down") {
      this.updateStage('up');
    }
    if (this.nose.y < this.knee_left.y && shoulder_hip_knee_angle_left < 100 && shoulder_hip_knee_angle_right < 100 && hip_knee_ankle_angle_left <= 90 && hip_knee_ankle_angle_right <= 90 && this.stage === "up") {
      this.updateStage('down');
    }
    if (this.nose.y < this.knee_left.y && shoulder_hip_ankle_angle_left >= 160 && shoulder_hip_ankle_angle_right >= 160 && hip_knee_ankle_angle_left >= 160 && hip_knee_ankle_angle_right >= 160 && this.stage === "down") {
      this.updateStage('up');
      score += 1;
    }
    if ((this.leftKneeExceedsFoot() || this.rightKneeExceedsFoot()) && this.stage === "down") {
      this.updateError('knees exceed feet');
    }
    if (!this.leftKneeExceedsFoot() && !this.rightKneeExceedsFoot()) {
      this.updateError(null);
    }
  }

  gen_lunge() {
    const shoulder_hip_ankle_angle_left = this.calculate_angle(this.shoulder_left, this.hip_left, this.ankle_left);
    const shoulder_hip_ankle_angle_right = this.calculate_angle(this.shoulder_right, this.hip_right, this.ankle_right);
    const shoulder_hip_knee_angle_left = this.calculate_angle(this.shoulder_left, this.hip_left, this.knee_left);
    const shoulder_hip_knee_angle_right = this.calculate_angle(this.shoulder_right, this.hip_right, this.knee_right);
    const hip_knee_ankle_angle_left = this.calculate_angle(this.hip_left, this.knee_left, this.ankle_left);
    const hip_knee_ankle_angle_right = this.calculate_angle(this.hip_right, this.knee_right, this.ankle_right);

    if (shoulder_hip_ankle_angle_left >= 160 && shoulder_hip_ankle_angle_right >= 160) {
      begin = true;
    }
    if (this.nose.y < this.knee_left.y && shoulder_hip_ankle_angle_left >= 160 && shoulder_hip_ankle_angle_right >= 160 && hip_knee_ankle_angle_left >= 160 && hip_knee_ankle_angle_right >= 160 && this.stage !== "down") {
      this.updateStage('up');
      this.updateError(null);
    }
    if (this.nose.y < this.knee_left.y && hip_knee_ankle_angle_left < 100 && hip_knee_ankle_angle_right < 100 && this.stage === "up" && ((shoulder_hip_knee_angle_left < 120 && shoulder_hip_knee_angle_right > 120) || (shoulder_hip_knee_angle_right < 120 && shoulder_hip_knee_angle_left > 120))) {
      this.updateStage('down');
    }
    if (this.nose.y < this.knee_left.y && shoulder_hip_ankle_angle_left >= 160 && shoulder_hip_ankle_angle_right >= 160 && hip_knee_ankle_angle_left >= 160 && hip_knee_ankle_angle_right >= 160 && this.stage === "down") {
      this.updateStage('up');
      this.updateError(null);
      score += 1;
    }
    if (this.stage === "down" && (Math.abs(this.shoulder_left.x - this.hip_left.x) > (this.euclideanDistance(this.shoulder_left, this.hip_left) / 6))) {
      this.updateError('straighten back');
    }
    if (this.stage === "down" && ((shoulder_hip_knee_angle_left < 120 && shoulder_hip_knee_angle_right > 120 && this.leftKneeExceedsFoot()) || (shoulder_hip_knee_angle_right < 120 && shoulder_hip_knee_angle_left > 120 && this.rightKneeExceedsFoot()))) {
      this.updateError('knee exceeds foot');
    }
    if ((this.stage === "down" && (Math.abs(this.shoulder_left.x - this.hip_left.x) <= (this.euclideanDistance(this.knee_left, this.ankle_left) / 2))) && ((shoulder_hip_knee_angle_left < 120 && shoulder_hip_knee_angle_right > 120 && !this.leftKneeExceedsFoot()) || (shoulder_hip_knee_angle_right < 120 && shoulder_hip_knee_angle_left > 120 && !this.rightKneeExceedsFoot()))) {
      this.updateError(null);
    }
  }
}
