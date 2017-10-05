require('source-map-support').install();

var Err = (function () {
    function Err(decorator) {
        this.decorator = decorator;
    }
    Err.prototype.message = function (msg) {
        var parent = this;

        return new Err(function (error) {
            parent.on(error);
            error.message = msg;
            return error;
        });
    };

    Err.prototype.validation = function (err) {
        var parent = this;

        return new Err(function (error) {
            parent.on(error);
            error.validation_error = err;
            return error;
        });
    };

    Err.prototype.source = function (source) {
        var parent = this;

        return new Err(function (error) {
            parent.on(error);
            error.source = source;
            return error;
        });
    };

    Err.prototype.missingURI = function (uris) {
        var parent = this;

        return new Err(function (error) {
            parent.on(error);
            error.URI = uris;
            return error;
        });
    };

    Err.prototype.on = function (error) {
        var processed = this.decorator(error);
        return processed;
    };
    return Err;
})();
exports.Err = Err;

function message(msg) {
    return exports.err().message(msg);
}
exports.message = message;

function source(src) {
    return exports.err().source(src);
}
exports.source = source;

function validation(data, schema, data_name, schema_name, cause) {
    var validation_message = cause.message;
    return exports.err().message([
        "cannot validate " + data_name + " with " + schema_name,
        "data was on path: " + cause.dataPath,
        "the schema constraint was defined at " + cause.schemaPath,
        validation_message
    ].join("\n")).validation(cause.error);
}
exports.validation = validation;
function missingURI(cause) {
    return exports.err().message("missing implementations of $ref").missingURI(cause);
}
exports.missingURI = missingURI;

function err() {
    return new Err(function (error) {
        return error;
    });
}
exports.err = err;
//# sourceMappingURL=error.js.map
