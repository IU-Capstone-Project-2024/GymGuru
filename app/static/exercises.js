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

  euclideanDistance(a, b) {
    return Math.sqrt(Math.pow(b.x - a.x, 2) + Math.pow(b.y - a.y, 2));
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

  updateError() {
    error = this.error;
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
      this.stage = "down";
      stage = this.stage;
    }
    if (shoulder_hip_knee_angle_right < 150) {
      this.stage = "wrong";
      stage = this.stage;
      this.error = 'BAD BACK';
      this.updateError();
      this.stopTimer();
    }
    if (hip_knee_ankle_angle_right < 150) {
      this.stage = "wrong";
      stage = this.stage;
      this.error = 'STRAIGHTEN LEGS'
      this.updateError();
      this.stopTimer();
    }
    if (this.wrist_left.y < this.shoulder_left.y || this.wrist_right.y < this.shoulder_right.y) {
      this.stage = "wrong";
      stage = this.stage;
      this.stopTimer();
    }
    if (shoulder_elbow_wrist_angle_left >= 160 && shoulder_elbow_wrist_angle_right >= 160 && this.stage === "down" && hip_knee_ankle_angle_right >= 150 && shoulder_hip_knee_angle_right >= 150 && hip_knee_ankle_angle_left >= 150 && shoulder_hip_knee_angle_left >= 150 && this.wrist_left.y > this.shoulder_left.y && this.wrist_right.y > this.shoulder_right.y && this.wrist_left.y > this.knee_left.y && this.wrist_right.y > this.knee_right.y) {
      this.stopTimer();
      if (this.timeElapsed() <= 3) {
        this.stage = "up";
        stage = this.stage;
        score += 1;
      }
      else {
        this.stage = "wrong";
        stage = this.stage;
        this.error = 'GO UP QUICKER';
        this.updateError();
      }
    }
    if (shoulder_hip_knee_angle_right >= 150 && hip_knee_ankle_angle_right >= 150 && this.wrist_left.y > this.shoulder_left.y && this.wrist_right.y > this.shoulder_right.y && this.wrist_left.y > this.hip_left.y && this.wrist_right.y > this.hip_right.y) {
      if (this.stage === "wrong") {
        this.stage = '';
        stage = this.stage;
      }
      this.error = null;
      this.updateError();
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
      this.stage = "up";
      stage = this.stage;
    }
    if (this.nose.y < this.knee_left.y && shoulder_hip_knee_angle_left < 100 && shoulder_hip_knee_angle_right < 100 && hip_knee_ankle_angle_left <= 90 && hip_knee_ankle_angle_right <= 90 && this.stage === "up") {
      this.stage = "down";
      stage = this.stage;
    }
    if (this.nose.y < this.knee_left.y && shoulder_hip_ankle_angle_left >= 160 && shoulder_hip_ankle_angle_right >= 160 && hip_knee_ankle_angle_left >= 160 && hip_knee_ankle_angle_right >= 160 && this.stage === "down") {
      this.stage = "up";
      stage = this.stage;
      score += 1;
    }
    if ((Math.abs(this.knee_left.x - this.ankle_left.x) > (this.euclideanDistance(this.knee_left, this.ankle_left) / 1.8)) && this.stage === "down") {
      this.error = 'KNEES EXCEED FEET';
      this.updateError();
    }
    if ((Math.abs(this.knee_left.x - this.ankle_left.x) <= (this.euclideanDistance(this.knee_left, this.ankle_left) / 1.8)) && this.stage === "down") {
      this.error = null;
      this.updateError();
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
      this.stage = "down";
      stage = this.stage;
    }
    if (shoulder_hip_ankle_angle_left >= 160 && shoulder_hip_ankle_angle_right >= 160 && this.shoulder_left.y < this.knee_left.y && this.shoulder_right.y < this.knee_right.y && this.elbow_left.y > this.wrist_left.y && this.elbow_right.y > this.wrist_right.y && shoulder_elbow_wrist_angle_left < 80 && shoulder_elbow_wrist_angle_right < 80 && this.stage === 'down') {
      this.stage = "up";
      stage = this.stage;
      score += 1;
    }
    if (shoulder_hip_ankle_angle_left < 160 || shoulder_hip_ankle_angle_right < 160) {
      this.error = 'STRAIGHTEN BACK';
      this.updateError();
    }
    if (shoulder_hip_ankle_angle_left >= 160 && shoulder_hip_ankle_angle_right >= 160) {
      this.error = null;
      this.updateError();
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
      this.stage = "down";
      stage = this.stage;
    }
    if (shoulder_hip_ankle_angle_left < 120 && shoulder_hip_ankle_angle_right < 120 && hip_knee_ankle_angle_left < 120 && hip_knee_ankle_angle_right < 120 && this.shoulder_left.y < this.knee_left.y && this.shoulder_right.y < this.knee_right.y && this.knee_left.y < this.hip_left.y && this.knee_right.y < this.hip_right.y && this.stage === "down") {
      this.stage = "up";
      stage = this.stage;
      score += 1;
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
      this.stage = "up";
      stage = this.stage;
    }
    if (this.nose.y < this.knee_left.y && hip_knee_ankle_angle_left < 100 && hip_knee_ankle_angle_right < 100 && this.stage === "up" && ((shoulder_hip_knee_angle_left < 120 && shoulder_hip_knee_angle_right > 120) || (shoulder_hip_knee_angle_right < 120 && shoulder_hip_knee_angle_left > 120))) {
      this.stage = "down";
      stage = this.stage;
    }
    if (this.nose.y < this.knee_left.y && shoulder_hip_ankle_angle_left >= 160 && shoulder_hip_ankle_angle_right >= 160 && hip_knee_ankle_angle_left >= 160 && hip_knee_ankle_angle_right >= 160 && this.stage === "down") {
      this.stage = "up";
      stage = this.stage;
      score += 1;
    }
    if (this.stage === "down" && (Math.abs(this.shoulder_left.x - this.hip_left.x) > (this.euclideanDistance(this.shoulder_left, this.hip_left) / 6))) {
      this.error = 'STRAIGHTEN BACK';
      this.updateError();
    }
    if (this.stage === "down" && ((shoulder_hip_knee_angle_left < 120 && shoulder_hip_knee_angle_right > 120 && (Math.abs(this.knee_left.x - this.ankle_left.x) > (this.euclideanDistance(this.knee_left, this.ankle_left) / 3))) || (shoulder_hip_knee_angle_right < 120 && shoulder_hip_knee_angle_left > 120 && (Math.abs(this.knee_right.x - this.ankle_right.x) > (this.euclideanDistance(this.knee_right, this.ankle_right) / 3))))) {
      this.error = 'KNEE EXCEEDS FOOT';
      this.updateError();
    }
    if ((this.stage === "down" && (Math.abs(this.shoulder_left.x - this.hip_left.x) <= (this.euclideanDistance(this.knee_left, this.ankle_left) / 2))) && (this.stage === "down" && ((shoulder_hip_knee_angle_left < 120 && shoulder_hip_knee_angle_right > 120 && (Math.abs(this.knee_left.x - this.ankle_left.x) <= (this.euclideanDistance(this.knee_left, this.ankle_left) / 3))) || (shoulder_hip_knee_angle_right < 120 && shoulder_hip_knee_angle_left > 120 && (Math.abs(this.knee_right.x - this.ankle_right.x) <= (this.euclideanDistance(this.knee_right, this.ankle_right) / 3)))))) {
      this.error = null;
      this.updateError();
    }
  }

  gen_v_up() {
    const shoulder_hip_ankle_angle_left = this.calculate_angle(this.shoulder_left, this.hip_left, this.ankle_left);
    const shoulder_hip_ankle_angle_right = this.calculate_angle(this.shoulder_right, this.hip_right, this.ankle_right);
    const hip_knee_ankle_angle_left = this.calculate_angle(this.hip_left, this.knee_left, this.ankle_left);
    const hip_knee_ankle_angle_right = this.calculate_angle(this.hip_right, this.knee_right, this.ankle_right);

    if (shoulder_hip_ankle_angle_left >= 160 && shoulder_hip_ankle_angle_right >= 160 && hip_knee_ankle_angle_left >= 160 && hip_knee_ankle_angle_right >= 160) {
      begin = true;
      this.stage = "down";
      stage = this.stage;
    }
    if (shoulder_hip_ankle_angle_left < 150 && shoulder_hip_ankle_angle_right < 150 && this.nose.y < this.hip_left.y && this.ankle_left.y < this.hip_left.y && this.ankle_right.y < this.hip_right.y && this.stage === "down") {
      this.stage = "up";
      stage = this.stage;
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
      this.stage = "down";
      stage = this.stage;
    }
    if (shoulder_hip_ankle_angle_left >= 160 && shoulder_hip_ankle_angle_right >= 160 && this.shoulder_left.y < this.knee_left.y && this.shoulder_right.y < this.knee_right.y && shoulder_elbow_wrist_angle_left >= 150 && shoulder_elbow_wrist_angle_right >= 150 && hip_shoulder_wrist_angle_left > 70 && hip_shoulder_wrist_angle_right > 70 && this.stage === 'down') {
      console.log(hip_shoulder_wrist_angle_left, hip_shoulder_wrist_angle_right);
      this.stage = "up";
      stage = this.stage;
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
      this.stage = "up";
      stage = this.stage;
      this.startTimer();
    }
    if (this.stage === "up") {
      this.stopTimer();
      plank = this.timeElapsed();
    }
    if (this.stage === "up" && (shoulder_elbow_wrist_angle_left <= 120 || shoulder_elbow_wrist_angle_right <= 120 || this.wrist_left.y < this.shoulder_left.y || this.wrist_right.y < this.shoulder_right.y || this.knee_left.y >= this.ankle_left.y || this.knee_right.y >= this.ankle_right.y)) {
      this.stage = "down";
      stage = this.stage;
      this.stopTimer();
      plank = this.timeElapsed();
    }
    if (shoulder_hip_knee_angle_right < 150) {
      this.error = 'BAD BACK';
      this.updateError();
    }
    if (hip_knee_ankle_angle_right < 150) {
      this.error = 'STRAIGHTEN LEGS'
      this.updateError();
    }
    if (shoulder_hip_knee_angle_right >= 150 && hip_knee_ankle_angle_right >= 150) {
      this.error = null;
      this.updateError();
    }
  }
}

class AdvancedExercises extends BaseExercise {
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
    this.wrist_left = this.handsKeypoints[0];
    this.wrist_right = this.handsKeypoints[21];
    this.middle_finger_left = this.handsKeypoints[9];
    this.middle_finger_right = this.handsKeypoints[30];
    this.finger_left = this.handsKeypoints[12];
    this.finger_right = this.handsKeypoints[33];
  }

  updateKeypoints() {
    this.initializeVariables();
  }

  gen_bend() {
    const shoulder_hip_ankle_angle_left = this.calculate_angle(this.shoulder_left, this.hip_left, this.ankle_left);
    const shoulder_hip_ankle_angle_right = this.calculate_angle(this.shoulder_right, this.hip_right, this.ankle_right);
    const hip_knee_ankle_angle_left = this.calculate_angle(this.hip_left, this.knee_left, this.ankle_left);
    const hip_knee_ankle_angle_right = this.calculate_angle(this.hip_right, this.knee_right, this.ankle_right);

    if (hip_knee_ankle_angle_left >= 165 && shoulder_hip_ankle_angle_right >= 165 && this.shoulder_left.y < this.knee_left.y && this.shoulder_right.y < this.knee_right.y) {
      begin = true;
    }
    if (hip_knee_ankle_angle_left >= 165 && hip_knee_ankle_angle_right >= 165 && shoulder_hip_ankle_angle_right >= 170 && shoulder_hip_ankle_angle_left >= 170 && this.shoulder_left.y < this.knee_left.y && this.shoulder_right.y < this.knee_right.y) {
      this.stage = "up";
      stage = this.stage;
    }
    if (hip_knee_ankle_angle_left >= 165 && hip_knee_ankle_angle_right >= 165 && this.ankle_left.y <= this.finger_left.y && this.ankle_right.y <= this.finger_right.y && this.middle_finger_left.y > this.ankle_left.y && this.middle_finger_right.y > this.ankle_right.y && bend !== 'fists' && bend !== 'palms') {
      this.stage = "down";
      stage = this.stage;
      bend = 'fingers';
    }
    if (hip_knee_ankle_angle_left >= 165 && hip_knee_ankle_angle_right >= 165 && this.ankle_left.y <= this.middle_finger_left.y && this.ankle_right.y <= this.middle_finger_right.y && this.wrist_left.y > this.ankle_left.y && this.wrist_right.y > this.ankle_right.y && bend !== 'palms') {
      this.stage = "down";
      stage = this.stage;
      bend = 'fists';
    }
    if (hip_knee_ankle_angle_left >= 165 && hip_knee_ankle_angle_right >= 165 &&  this.ankle_left.y <= this.wrist_left.y && this.ankle_right.y <= this.wrist_right.y) {
      this.stage = "down";
      stage = this.stage;
      bend = 'palms';
    }
    if (hip_knee_ankle_angle_left < 165 || hip_knee_ankle_angle_right < 165) {
      this.error = 'BAD KNEES';
      this.updateError();
    }
    if (hip_knee_ankle_angle_left >= 165 && hip_knee_ankle_angle_right >= 165) {
      this.error = null;
      this.updateError();
    }
  }
}
