var source_processor = require('./src/source-processor');
var error = require('./src/error');

for (var property in source_processor) {
    exports[property] = source_processor[property];
};

for (var property in error) {
    exports[property] = error[property];
};