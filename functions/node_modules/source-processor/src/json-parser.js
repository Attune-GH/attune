/*
 * json-validation
 * https://github.com/tomlarkworthy/json-validation
 *
 * Copyright (c) 2014 Tom Larkworthy
 * Licensed under the MIT license.
 */

(function(exports) {

    var Json = require('./source-processor');

    'use strict';

    var json_parse = (function() {

        // This is a function that can parse a JSON text, producing a JavaScript
        // data structure. It is a simple, recursive descent parser. It does not use
        // eval or regular expressions, so it can be used as a model for implementing
        // a JSON parser in other languages.
        // We are defining the function inside of another function to avoid creating
        // global variables.

        var at,     // The index of the current character
            ch,     // The current character
            escapee = {
                '"': '"',
                '\\': '\\',
                '/': '/',
                b: '\b',
                f: '\f',
                n: '\n',
                r: '\r',
                t: '\t'
            },
            text;

        var error = function(m) { // Call error when something is wrong.
                throw {
                    name: 'SyntaxError',
                    message: m,
                    at: at,
                    text: text
                };
        };
        var next = function(c) { // If a c parameter is provided, verify that it matches the current character.
            if (c && c !== ch) {
                error("Expected '" + c + "' instead of '" + ch + "'");
            }

            // Get the next character. When there are no more characters,
            // return the empty string.
            ch = text.charAt(at);
            at += 1;
            return ch;
        };
        var number = function() { // Parse a number value
            var number,
                string = '';

            if (ch === '-') {
                string = '-';
                next('-');
            }
            while (ch >= '0' && ch <= '9') {
                string += ch;
                next();
            }
            if (ch === '.') {
                string += '.';
                while (next() && ch >= '0' && ch <= '9') {
                    string += ch;
                }
            }
            if (ch === 'e' || ch === 'E') {
                string += ch;
                next();
                if (ch === '-' || ch === '+') {
                    string += ch;
                    next();
                }
                while (ch >= '0' && ch <= '9') {
                    string += ch;
                    next();
                }
            }
            number = +string;
            if (!isFinite(number)) {
                error('Bad number');
            } else {
                return number;
            }
        };
        var string = function() { // Parse a string value.
            var hex,
                i,
                string = '',
                uffff;
            // When parsing for string values, we must look for " and \ characters.
            if (ch === '"') {
                while (next()) {
                    if (ch === '"') {
                        next();
                        return string;
                    }
                    if (ch === '\\') {
                        next();
                        if (ch === 'u') {
                            uffff = 0;
                            for (i = 0; i < 4; i += 1) {
                                hex = parseInt(next(), 16);
                                if (!isFinite(hex)) {
                                    break;
                                }
                                uffff = uffff * 16 + hex;
                            }
                            string += String.fromCharCode(uffff);
                        } else if (typeof escapee[ch] === 'string') {
                            string += escapee[ch];
                        } else {
                            break;
                        }
                    } else {
                        string += ch;
                    }
                }
            }
            error('Bad string');
        };
        var white = function() { // Skip whitespace.
            while (ch && ch <= ' ') {
                next();
            }
        };
        var word = function() { // true, false, or null.
            switch (ch) {
            case 't':
                next('t');
                next('r');
                next('u');
                next('e');
                return new Json.JBoolean(true, at - 5, at - 1);
            case 'f':
                next('f');
                next('a');
                next('l');
                next('s');
                next('e');
                return new Json.JBoolean(false, at - 6, at - 1);
            case 'n':
                next('n');
                next('u');
                next('l');
                next('l');
                return new Json.JNull(at - 5, at - 1);
            }
            error("Unexpected '" + ch + "'");
        };

        var array = function() { // Parse an array value.
            var array = new Json.JArray();
            array.setStart(at - 1);
            if (ch === '[') {
                next('[');
                white();
                if (ch === ']') {
                    next(']');
                    array.setEnd(at - 1);
                    return array;   // empty array
                }
                while (ch) {
                    array.push(value());
                    white();
                    if (ch === ']') {
                        next(']');
                        array.setEnd(at - 1);
                        return array;
                    }
                    next(',');
                    white();
                }
            }
            error('Bad array');
        };

        var object = function() { // Parse an object value.
            var key;
            var result = new Json.JObject();
            result.setStart(at - 1);

            if (ch === '{') {
                next('{');
                white();
                if (ch === '}') {
                    next('}');
                    result.setEnd(at);
                    return result;   // empty object
                }
                while (ch) {
                    var key_start = at;
                    key = string();
                    var json_key = new Json.JString(key, key_start, at);

                    white();
                    next(':');
                    /*
                    if (Object.hasOwnProperty.call(object, key)) {
                        error('Duplicate key "' + key + '"');
                    }*/

                    result.put(json_key, value());

                    white();
                    if (ch === '}') {
                        result.setEnd(at);
                        next('}');
                        return result;
                    }
                    next(',');
                    white();
                }
            }
            error('Bad object');
        };

        var value = function() {// Parse a JSON value. It could be an object, an array, a string, a number, or a word.
            white();
            var start_pos = at - 1;

            switch (ch) {
                case '{':
                    return object();
                case '[':
                    return array();
                case '"':
                    return new Json.JString(string(), start_pos, at);
                case '-':
                    return new Json.JNumber(number(), start_pos, at - 1);
                default:
                    if (ch >= '0' && ch <= '9') {
                        return new Json.JNumber(number(), start_pos, at - 1);
                    } else {
                        return word();
                    }
            }
        };

        // Return the json_parse function. It will have access to all of the above
        // functions and variables.
        return function(source) {
            var result;

            text = source;
            at = 0;
            ch = ' ';
            result = value();
            white();
            if (ch) {
                error('Syntax error');
            }

            return result;
        };
    }());


    exports.parse = function(source) {
        return json_parse(source);
    };

}(typeof exports === 'object' && exports || this));
