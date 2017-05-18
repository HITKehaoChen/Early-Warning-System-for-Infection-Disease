const sprintf = require('sprintf-js').sprintf;
const City = require('./City');

class Network {
  constructor(a, b, n) {
    this.num = n;
    this.cur_time = 0;

    this.city = new Array(this.num);
    this.tran = new Array(this.num).fill(0).map(() => new Array(this.num).fill(0));

    for (let i = 0; i < this.num; i++) {
      this.city[i] = new City(a[i]);
    }
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
        this.tran[i][j] = b[i][j];
      }
    }

  }

  transfrom() {
    for (let i = 0; i < this.num; i++) {
      let x = [0, 0, 0];
      for (let j = 0; j < this.num; j++) {
        let y = this.city[j].get();
        x[0] += y[0] * this.tran[j][i];
        x[1] += y[1] * this.tran[j][i];
        x[2] += y[2] * this.tran[j][i];
      }
      this.city[i].change(x[0], x[1], x[2]);
    }
  }

  update() {

    this.city.map((x) => x.update());
    //
    // for(let i = 0; i < this.num;i++) {
    //   this.city[i].update();
    // }
  }

  UpdateFor(t) {
    for (let i = 0; i < t; i += Network.dt) {
      this.transfrom();
      this.update();
      this.cur_time += Network.dt;
    }
  }

  infect(id, rate) {
    this.city[id].set(1 - rate, rate, 0);
  }

  output() {
    console.log(sprintf("Current time is : %.0f", this.cur_time));

    for (let i = 0; i < this.num; i++) {
      console.log("City " + i + ": ", sprintf("%.0f, %.0f, %.0f", this.city[i].get()[0],
        this.city[i].get()[1],
        this.city[i].get()[2]
      ));
    }
    console.log()
  }
}
Network.dt = 0.001;
module.exports = Network;