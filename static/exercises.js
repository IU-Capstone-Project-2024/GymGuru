
class Exercises {
  constructor() {
    this.stage = null;
    this.startTime = null;
    this.endTime =  null;

    this.keypoints = extractedKeypoints;
    this.nose = this.keypoints[0];
    this.eye_left = this.keypoints[1];
    this.eye_right = this.keypoints[2];
    this.ear_left = this.keypoints[3];
    this.ear_right = this.keypoints[4];
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
  
  checkTimeElapsed() {
    const timeElapsed = (this.endTime - this.startTime) / 1000;
    return timeElapsed;
  }

  gen_push_up() {
    const shoulder_angle_left = this.calculate_angle(this.shoulder_left, this.elbow_left, this.wrist_left);
    const shoulder_angle_right = this.calculate_angle(this.shoulder_right, this.elbow_right, this.wrist_right);
    const back_angle_left = this.calculate_angle(this.shoulder_left, this.hip_left, this.knee_left);
    const back_angle_right = this.calculate_angle(this.shoulder_right, this.hip_right, this.knee_right);
    const knee_angle_left = this.calculate_angle(this.hip_left, this.knee_left, this.ankle_left);
    const knee_angle_right = this.calculate_angle(this.hip_right, this.knee_right, this.ankle_right);

    if (shoulder_angle_left <= 120 && shoulder_angle_left >= 30 && shoulder_angle_right <= 120 && shoulder_angle_right >= 30 && this.nose.y >= this.shoulder_right.y && knee_angle_right >= 150 && back_angle_right >= 150 && knee_angle_left >= 150 && back_angle_left >= 150 && this.wrist_left.y > this.shoulder_left.y && this.wrist_right.y > this.shoulder_right.y && this.wrist_left.y > this.hip_left.y && this.wrist_right.y > this.hip_right.y) {
      if (this.stage != "down") {
        this.startTimer();
      }
      this.stage = "down";
      stage = this.stage;
    }
    if (back_angle_right < 150) {
      this.stage = "wrong";
      stage = this.stage;
      error = 'BAD BACK'
      this.stopTimer();
    }
    if (knee_angle_right < 150) {
      this.stage = "wrong";
      stage = this.stage;
      error = 'STRAIGHTEN LEGS'
      this.stopTimer();
    }
    if (this.wrist_left.y < this.shoulder_left.y || this.wrist_right.y < this.shoulder_right.y) {
      this.stage = "wrong";
      stage = this.stage;
      this.stopTimer();
    }
    if (shoulder_angle_left >= 160 && shoulder_angle_right >= 160 && this.stage === "down" && knee_angle_right >= 150 && back_angle_right >= 150 && knee_angle_left >= 150 && back_angle_left >= 150  && this.wrist_left.y > this.shoulder_left.y && this.wrist_right.y > this.shoulder_right.y && this.wrist_left.y > this.hip_left.y && this.wrist_right.y > this.hip_right.y) {
      this.stopTimer();
      if (this.checkTimeElapsed() <= 3) {
        this.stage = "up";
        stage = this.stage;
        score += 1;
      }
      else {
        this.stage = "wrong";
        stage = this.stage;
        error = 'BE QUICKER'
      }
    }
    if (back_angle_right >= 150 && knee_angle_right >= 150 && this.wrist_left.y > this.shoulder_left.y && this.wrist_right.y > this.shoulder_right.y && this.wrist_left.y > this.hip_left.y && this.wrist_right.y > this.hip_right.y) {
      if (this.stage === "wrong") {
        this.stage = '';
        stage = this.stage;
      }
      error = ''
    }
  }

  updateKeypoints() {
    this.keypoints = extractedKeypoints;
    this.nose = this.keypoints[0];
    this.eye_left = this.keypoints[1];
    this.eye_right = this.keypoints[2];
    this.ear_left = this.keypoints[3];
    this.ear_right = this.keypoints[4];
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
}
