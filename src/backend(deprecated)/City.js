
const SIR = require('./SIR');
class City {
  constructor(x) {
    this.num = x;
    this.sir = new SIR();
    this.sir.set(1, 0, 0);
  }

  get() {
    let x = this.sir.get();
    let y = [this.num * x[0], this.num * x[1], this.num * x[2]];
    return y;
  }

  set(x0, x1, x2) {
    this.sir.set(x0, x1, x2)
  }

  change(ss, ii, rr) {
    this.num = ss + ii + rr;
    this.sir.set(ss / this.num, ii / this.num, rr / this.num);
  }

  update() {
    this.sir.update();
  }
}
module.exports = City;
