const BP = require('./BP');
const Network = require('./Network');
const sprintf = require('sprintf-js').sprintf;
//test data

class Test {
  constructor() {
  }

  static main() {
    let u = new BP(32, 15, 1);
    let std_input = new Array(32).fill(0);
    let std_output = new Array(1).fill(0);
    u.train(std_input, std_output);
    let input = new Array(32).fill(0);
    let result = u.test(input);

    let c = new Network(Test.b, Test.a, 5);

    c.output();
    c.infect(0, 1e-6);
    for (let i = 0; i <= 20; i++) {
      c.UpdateFor(1);
      c.output();
    }

  }
}
Test.a = [
  [0.9999846, 0.0000031, 0.0000002, 0.0000023, 0.0000098],
  [0.0000036, 0.9999789, 0.0000034, 0.0000075, 0.0000066],
  [0.0000077, 0.0000007, 0.9999829, 0.0000054, 0.0000033],
  [0.0000045, 0.0000092, 0.0000043, 0.9999795, 0.0000025],
  [0.0000098, 0.0000055, 0.0000012, 0.0000027, 0.9999808]
];
Test.b = [100000000, 100000000, 100000000, 100000000, 100000000];
Test.main();
