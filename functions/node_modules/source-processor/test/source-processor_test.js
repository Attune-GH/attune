'use strict';

var source_processor = require('../src/source-processor.js');

/*
  ======== A Handy Little Nodeunit Reference ========
  https://github.com/caolan/nodeunit

  Test methods:
    test.expect(numAssertions)
    test.done()
  Test assertions:
    test.ok(value, [message])
    test.equal(actual, expected, [message])
    test.notEqual(actual, expected, [message])
    test.deepEqual(actual, expected, [message])
    test.notDeepEqual(actual, expected, [message])
    test.strictEqual(actual, expected, [message])
    test.notStrictEqual(actual, expected, [message])
    test.throws(block, [error], [message])
    test.doesNotThrow(block, [error], [message])
    test.ifError(value)
*/

exports['parse'] = {
  setUp: function(done) {
    // setup here
    done();
  },
  'basic': function(test) {
    test.expect(1);
    // tests here

    var json = {
        'name': "tom",
        'age' : 21,
        'true': true,
        'false': false,
        'null': null,
        awards: ["5m swimming", "95% attendance"],
        21: {
            "other": "examples"
        }
    };

    test.deepEqual(source_processor.parse(JSON.stringify(json)).toJSON(), json, 'should be equal');
    test.done();
  }
};
