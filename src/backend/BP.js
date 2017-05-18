const defaults = {
  eta: 0.25,
  momentum: 0.9
};
class BP {
  constructor(inputSize, hiddenSize, outputSize, eta, momentum) {
    this.input = new Array(inputSize + 1).fill(0);
    this.hidden = new Array(hiddenSize + 1).fill(0);
    this.output = new Array(outputSize + 1).fill(0);
    this.target = new Array(outputSize + 1).fill(0);

    this.hidDelta = new Array(hiddenSize + 1).fill(0);
    this.optDelta = new Array(outputSize + 1).fill(0);

    this.iptHidWeights = new Array(inputSize + 1).fill(0).map(() => new Array(hiddenSize + 1).fill(0));
    this.hidOptWeights = new Array(hiddenSize + 1).fill(0).map(() => new Array(outputSize + 1).fill(0));

    //random

    this.randomizeWeights(this.iptHidWeights);
    this.randomizeWeights(this.hidOptWeights);

    this.iptHidPrevUptWeights = new Array(inputSize + 1).fill(0).map(() => new Array(hiddenSize + 1).fill(0));
    this.hidOptPrevUptWeights = new Array(hiddenSize + 1).fill(0).map(() => new Array(outputSize + 1).fill(0));

    this.eta = eta || defaults.eta;
    this.momentum = momentum || defaults.momentum;

    //public props
    this.optErrSum = 0.0;
    this.hidErrSum = 0.0;
  }


  randomizeWeights(matrix) {
    for (let i = 0, len = matrix.length; i !== len; i++) {
      for (let j = 0, len2 = matrix[i].length; j !== len2; j++) {
        let real = Math.random();
        matrix[i][j] = Math.random() > 0.5 ? real : -real;
      }
    }
  }

  train(trainData, target) {
    this.loadInput(trainData);
    this.loadTarget(target);
    this.forward();
    this.calculateDelta();
    this.adjustWeight();
  }

  arrayCopy(src, srcPos, dest, destPos, length) {
    for (let i = 0; i < length; i++) {
      dest[destPos++] = src[srcPos++];
    }
  }

  test(inData) {
    if (inData.length !== this.input.length - 1) {
      return new Error("Size Do Not Match.");
    }
    this.arrayCopy(inData, 0, this.input, 1, inData.length);
    this.forward();
    return this.getNetworkOutput();

  }

  getNetworkOutput() {
    let len = this.output.length;
    let temp = new Array(len - 1);
    for (let i = 0; i !== len; i++) {
      temp[i - 1] = this.output[i];
    }
    return temp;
  }

  loadTarget(arg) {
    if (arg.length !== this.target.length - 1) {
      return new Error("Size Do Not Match");
    }
    this.arrayCopy(arg, 0, this.target, 1, arg.length);
  }

  loadInput(inData) {
    if (inData.length !== this.input.length - 1) {
      return new Error("Size Do Not Match");
    }
    this.arrayCopy(inData, 0, this.input, 1, inData.length);
  }

  forward(layer0, layer1, weight) {

    if (arguments.length === 0) {

      this.forward(this.input, this.hidden, this.iptHidWeights);
      this.forward(this.hidden, this.output, this.hidOptWeights);

    } else if (arguments.length === 3) {

      layer0[0] = 1.0;

      for (let j = 1, len = layer1.length; j !== len; j++) {
        let sum = 0;
        for (let i = 0, len2 = layer0.length; i !== len2; i++) {
          sum += weight[i][j] * layer0[i];
        }
        layer1[j] = this.sigmoid(sum);
      }

    }
  }

  outputErr() {
    let errSum = 0;
    for (let idx = 1, len = this.optDelta.length; idx !== len; idx++) {
      let o = this.output[idx];
      this.optDelta[idx] = o * (1.0 - o) * (this.target[idx] - o);
      errSum += Math.abs(this.optDelta[idx]);
    }
    this.optErrSum = errSum;
  }

  hiddenErr() {
    let errSum = 0;
    for (let j = 1, len = this.hidDelta.length; j !== len; j++) {
      let o = this.hidden[j];
      let sum = 0;
      for (let k = 1, len2 = this.optDelta.length; k !== len2; k++) {
        sum += this.hidOptWeights[j][k] * this.optDelta[k];
      }
      this.hidDelta[j] = o * (1.0 - o) * sum;
      errSum += Math.abs(this.hidDelta[j]);
    }
  }

  calculateDelta() {
    this.outputErr();
    this.hiddenErr();
  }

  adjustWeight(delta, layer, weight, prevWeight) {

    if (arguments.length === 0) {

      this.adjustWeight(this.optDelta, this.hidden, this.hidOptWeights, this.hidOptPrevUptWeights);
      this.adjustWeight(this.hidDelta, this.input, this.iptHidWeights, this.iptHidPrevUptWeights);

    } else if (arguments.length === 4) {
      layer[0] = 1;
      for (let i = 1, len = delta.length; i !== len; i++) {
        for (let j = 1, len2 = layer.length; j !== len2; j++) {
          let newVal = this.momentum * prevWeight[j][i] + this.eta * delta[i] * layer[j];
          weight[j][i] += newVal;
          prevWeight[j][i] = newVal;
        }
      }
    }
  }

  sigmoid(val) {
    return 1.0 / (1.0 + Math.exp(-val));
  }


}
//export class
module.exports = BP;
