/// <reference path="../types/node.d.ts" />
/// <reference path="../types/nodeunit.d.ts" />
import fs = require('fs');
import Json = require('../src/source-processor');

export function testParseJson(test:nodeunit.Test): void {
    var json: Json.JValue = Json.parse(fs.readFileSync("test/parser_test.json", {encoding: 'utf8'}));

    //console.log(JSON.stringify(json, null, 4));

    //test the enclosing JSON
    test.equal(json.start.row(), 1);
    test.equal(json.start.col(), 1);
    test.equal(json.end.row(), 7);
    test.equal(json.end.col(), 2);

    //test the first value (number)
    //"num":1,
    var num = json.asObject().getOrThrow("num", "fail").cast(Json.JType.JNumber);
    test.equal(num.start.row(), 2);
    test.equal(num.start.col(), 11);
    test.equal(num.end.row(), 2);
    test.equal(num.end.col(), 12);

    //test the second value (boolean literal)
    var bool = json.asObject().getOrThrow("bool", "fail").cast(Json.JType.JBoolean);
    test.equal(bool.start.row(), 3);
    test.equal(bool.start.col(), 12);
    test.equal(bool.end.row(), 3);
    test.equal(bool.end.col(), 16);

    //test the third value (number with decimal)
    var float = json.asObject().getOrThrow("float", "fail").cast(Json.JType.JNumber);
    test.equal(float.start.row(), 4);
    test.equal(float.start.col(), 13);
    test.equal(float.end.row(), 4);
    test.equal(float.end.col(), 16);

    //test the fourth value (array)
    var array = json.asObject().getOrThrow("array", "fail").cast(Json.JType.JArray);
    test.equal(array.start.row(), 5);
    test.equal(array.start.col(), 13);
    test.equal(array.end.row(), 5);
    test.equal(array.end.col(), 33);

    //test the fifth value (object)
    var obj = json.asObject().getOrThrow("object", "fail").cast(Json.JType.JObject);
    test.equal(obj.start.row(), 6);
    test.equal(obj.start.col(), 15);
    test.equal(obj.end.row(), 6);
    test.equal(obj.end.col(), 24);

    test.ok(true);
    test.done();
}


export function parseBasicJson(test:nodeunit.Test): void {
    //reading the data using our custom js-yaml parser
    var json: Json.JValue = Json.parse(fs.readFileSync("test/basic.json"));
    console.log(json.toJSON());
    test.done();
}

export function testParseYaml(test:nodeunit.Test): void {
    var json: Json.JValue = Json.parse_yaml(fs.readFileSync("test/complicated.yaml", {encoding: 'utf8'}));

    //console.log(JSON.stringify(json, null, 4));

    test.equal(json.start.row(), 1);
    test.equal(json.start.col(), 1);

    //its a little inconsistent where exactly it notes the beginning, but its essentially right
    var patternProperties = json.getOrThrow("patternProperties", "");
    test.equal(patternProperties.start.row(), 151); //the object after the key position
    test.equal(patternProperties.start.col(), 19);

    var wildchild = patternProperties.getOrThrow("\\$.+", "");
    test.equal(wildchild.start.row(), 153);
    test.equal(wildchild.start.col(), 5);

    var object = json.lookup(["patternProperties", "\\$.+"]).toJSON();
    test.deepEqual(object, { '$ref': 'http://firebase.com/schema#' });

    test.ok(true);
    test.done();
}


export function compareJSYamlWithCustomJSJson(test:nodeunit.Test): void {
    //reading the data using our custom js-yaml parser
    var jsyaml: Json.JValue = Json.parse_yaml(fs.readFileSync("test/complicated.yaml", {encoding: 'utf8'}).toString());
    //reading the data using our custom json parser (after using OTS js-yaml at the command line)
    var json: Json.JValue = Json.parse(fs.readFileSync("test/complicated.json", {encoding: 'utf8'}).toString());

    //the two should produce the same data!
    test.deepEqual(json.toJSON(), jsyaml.toJSON());
    test.done();
}
