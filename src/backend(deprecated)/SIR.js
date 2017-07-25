class SIR {

  constructor() {
    this.x = [1, 0, 0];
    this.curTime = 0;
  }

  get() {
    return this.x;
  }

  set(x0, x1, x2) {
    this.x[0] = x0;
    this.x[1] = x1;
    this.x[2] = x2;
  }

  update() {
    let dx = [0, 0, 0];
    dx[0] = -SIR.beta * this.x[0] * this.x[1];
    dx[1] = SIR.beta * this.x[0] * this.x[1] - SIR.gama * this.x[1];
    dx[2] = SIR.gama * this.x[1];
    this.x[0] += dx[0] * SIR.dt;
    this.x[1] += dx[1] * SIR.dt;
    this.x[2] += dx[2] * SIR.dt;
    this.curTime += SIR.dt;
  }

  show() {
    console.log('current time is ' + this.curTime);
    console.log('S:' + this.x[0] + '   I:' + this.x[1] + "  R:" + this.x[2]);
  }

}
//static props here
SIR.beta = 1.4247;
SIR.gama = 0.14286;
SIR.dt = 0.001;
module.exports = SIR;