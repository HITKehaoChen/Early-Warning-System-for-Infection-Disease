
class Matrix {
  constructor(x) {
    if (arguments.length === 0) {
      this.maxn = 50;
      this.e = new Array(this.maxn).fill(0).map(() => new Array(this.maxn).fill(0));
    } else if (arguments.length === 1) {
      this.maxn = 50;
      this.e = new Array(this.maxn).fill(0).map(() => new Array(this.maxn).fill(0));
      for (let i = 0; i < this.maxn; i++) {
        this.e[i][i] = x;
      }
    }
  }

  setSize(n) {
    this.maxn = n;
  }

  set(i, j, x) {
    this.e[i][j] = x;
  }

  get(i, j) {
    return this.e[i][j];
  }

  clear() {
    this.e.fill(0);
  }

  mul() {
    let c = new Matrix();
    for (let k = 0; k < this.maxn; k++) {
      for (let i = 0; i < this.maxn; i++) {
        for (let j = 0; j < this.maxn; j++) {
          c.e[i][j] += this.e[i][k] * b.e[k][j];
        }
      }

    }
    return c;
  }

}
module.exports = Matrix;