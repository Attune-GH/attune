/// <reference path="./types/tv4.d.ts" />
declare module "source-processor" {

import tv4 = require('tv4');

//src/util/collections.d.ts
export interface ICompareFunction<T> {
    (a: T, b: T): number;
}
export interface IEqualsFunction<T> {
    (a: T, b: T): boolean;
}
export interface ILoopFunction<T> {
    (a: T): boolean;
}
export function defaultCompare<T>(a: T, b: T): number;
export function defaultEquals<T>(a: T, b: T): boolean;
export function defaultToString(item: any): string;
export function makeString<T>(item: T, join?: string): string;
export function isFunction(func: any): boolean;
export function isUndefined(obj: any): boolean;
export function isString(obj: any): boolean;
export function reverseCompareFunction<T>(compareFunction: ICompareFunction<T>): ICompareFunction<T>;
export function compareToEquals<T>(compareFunction: ICompareFunction<T>): IEqualsFunction<T>;
export module arrays {
    function indexOf<T>(array: T[], item: T, equalsFunction?: IEqualsFunction<T>): number;
    function lastIndexOf<T>(array: T[], item: T, equalsFunction?: IEqualsFunction<T>): number;
    function contains<T>(array: T[], item: T, equalsFunction?: IEqualsFunction<T>): boolean;
    function remove<T>(array: T[], item: T, equalsFunction?: IEqualsFunction<T>): boolean;
    function frequency<T>(array: T[], item: T, equalsFunction?: IEqualsFunction<T>): number;
    function equals<T>(array1: T[], array2: T[], equalsFunction?: IEqualsFunction<T>): boolean;
    function copy<T>(array: T[]): T[];
    function swap<T>(array: T[], i: number, j: number): boolean;
    function toString<T>(array: T[]): string;
    function forEach<T>(array: T[], callback: (item: T) => boolean): void;
}
export interface ILinkedListNode<T> {
    element: T;
    next: ILinkedListNode<T>;
}
export class LinkedList<T> {
    public firstNode: ILinkedListNode<T>;
    private lastNode;
    private nElements;
    constructor();
    public add(item: T, index?: number): boolean;
    public first(): T;
    public last(): T;
    public elementAtIndex(index: number): T;
    public indexOf(item: T, equalsFunction?: IEqualsFunction<T>): number;
    public contains(item: T, equalsFunction?: IEqualsFunction<T>): boolean;
    public remove(item: T, equalsFunction?: IEqualsFunction<T>): boolean;
    public clear(): void;
    public equals(other: LinkedList<T>, equalsFunction?: IEqualsFunction<T>): boolean;
    private equalsAux(n1, n2, eqF);
    public removeElementAtIndex(index: number): T;
    public forEach(callback: (item: T) => boolean): void;
    public reverse(): void;
    public toArray(): T[];
    public size(): number;
    public isEmpty(): boolean;
    public toString(): string;
    private nodeAtIndex(index);
    private createNode(item);
}
export class Dictionary<K, V> {
    private table;
    private nElements;
    private toStr;
    constructor(toStrFunction?: (key: K) => string);
    public getValue(key: K): V;
    public setValue(key: K, value: V): V;
    public remove(key: K): V;
    public keys(): K[];
    public values(): V[];
    public forEach(callback: (key: K, value: V) => any): void;
    public containsKey(key: K): boolean;
    public clear(): void;
    public size(): number;
    public isEmpty(): boolean;
    public toString(): string;
}
export class MultiDictionary<K, V> {
    private dict;
    private equalsF;
    private allowDuplicate;
    constructor(toStrFunction?: (key: K) => string, valuesEqualsFunction?: IEqualsFunction<V>, allowDuplicateValues?: boolean);
    public getValue(key: K): V[];
    public setValue(key: K, value: V): boolean;
    public remove(key: K, value?: V): boolean;
    public keys(): K[];
    public values(): V[];
    public containsKey(key: K): boolean;
    public clear(): void;
    public size(): number;
    public isEmpty(): boolean;
}
export class Heap<T> {
    private data;
    private compare;
    constructor(compareFunction?: ICompareFunction<T>);
    private leftChildIndex(nodeIndex);
    private rightChildIndex(nodeIndex);
    private parentIndex(nodeIndex);
    private minIndex(leftChild, rightChild);
    private siftUp(index);
    private siftDown(nodeIndex);
    public peek(): T;
    public add(element: T): boolean;
    public removeRoot(): T;
    public contains(element: T): boolean;
    public size(): number;
    public isEmpty(): boolean;
    public clear(): void;
    public forEach(callback: (item: T) => boolean): void;
}
export class Stack<T> {
    private list;
    constructor();
    public push(elem: T): boolean;
    public add(elem: T): boolean;
    public pop(): T;
    public peek(): T;
    public size(): number;
    public contains(elem: T, equalsFunction?: IEqualsFunction<T>): boolean;
    public isEmpty(): boolean;
    public clear(): void;
    public forEach(callback: ILoopFunction<T>): void;
}
export class Queue<T> {
    private list;
    constructor();
    public enqueue(elem: T): boolean;
    public add(elem: T): boolean;
    public dequeue(): T;
    public peek(): T;
    public size(): number;
    public contains(elem: T, equalsFunction?: IEqualsFunction<T>): boolean;
    public isEmpty(): boolean;
    public clear(): void;
    public forEach(callback: ILoopFunction<T>): void;
}
export class PriorityQueue<T> {
    private heap;
    constructor(compareFunction?: ICompareFunction<T>);
    public enqueue(element: T): boolean;
    public add(element: T): boolean;
    public dequeue(): T;
    public peek(): T;
    public contains(element: T): boolean;
    public isEmpty(): boolean;
    public size(): number;
    public clear(): void;
    public forEach(callback: ILoopFunction<T>): void;
}
export class Set<T> {
    private dictionary;
    constructor(toStringFunction?: (item: T) => string);
    public contains(element: T): boolean;
    public add(element: T): boolean;
    public intersection(otherSet: Set<T>): void;
    public union(otherSet: Set<T>): void;
    public difference(otherSet: Set<T>): void;
    public isSubsetOf(otherSet: Set<T>): boolean;
    public remove(element: T): boolean;
    public forEach(callback: ILoopFunction<T>): void;
    public toArray(): T[];
    public isEmpty(): boolean;
    public size(): number;
    public clear(): void;
    public toString(): string;
}
export class Bag<T> {
    private toStrF;
    private dictionary;
    private nElements;
    constructor(toStrFunction?: (item: T) => string);
    public add(element: T, nCopies?: number): boolean;
    public count(element: T): number;
    public contains(element: T): boolean;
    public remove(element: T, nCopies?: number): boolean;
    public toArray(): T[];
    public toSet(): Set<T>;
    public forEach(callback: ILoopFunction<T>): void;
    public size(): number;
    public isEmpty(): boolean;
    public clear(): void;
}
export class BSTree<T> {
    private root;
    private compare;
    private nElements;
    constructor(compareFunction?: ICompareFunction<T>);
    public add(element: T): boolean;
    public clear(): void;
    public isEmpty(): boolean;
    public size(): number;
    public contains(element: T): boolean;
    public remove(element: T): boolean;
    public inorderTraversal(callback: ILoopFunction<T>): void;
    public preorderTraversal(callback: ILoopFunction<T>): void;
    public postorderTraversal(callback: ILoopFunction<T>): void;
    public levelTraversal(callback: ILoopFunction<T>): void;
    public minimum(): T;
    public maximum(): T;
    public forEach(callback: ILoopFunction<T>): void;
    public toArray(): T[];
    public height(): number;
    private searchNode(node, element);
    private transplant(n1, n2);
    private removeNode(node);
    private inorderTraversalAux(node, callback, signal);
    private levelTraversalAux(node, callback);
    private preorderTraversalAux(node, callback, signal);
    private postorderTraversalAux(node, callback, signal);
    private minimumAux(node);
    private maximumAux(node);
    private heightAux(node);
    private insertNode(node);
    private createNode(element);
}



// src/source-processor.d.ts
export class Position {
    public line: number;
    public column: number;
    constructor(line: number, column: number);
}
export class SourceFile {
    public text: string;
    constructor(text: string);
    public getLineColumn(position: number): Position;
}
export class TextLocation {
    public position: number;
    public col(): number;
    public row(): number;
    constructor(position: number);
}
export class TextSpan {
    public start: TextLocation;
    public end: TextLocation;
    public text: SourceFile;
    constructor();
    public setStart(position: any): void;
    public setEnd(position: any): void;
    public source(): string;
}
export enum JType {
    JBoolean = 0,
    JNumber = 1,
    JString = 2,
    JNull = 3,
    JValue = 4,
    JArray = 5,
    JObject = 6,
}
export class JValue extends TextSpan {
    public type: JType;
    constructor(type: JType);
    public castError(target: JType): Error;
    public cast(target: JType): JValue;
    public has(property_name: string): boolean;
    public getOrThrow(property_name: string, error_msg: string): JValue;
    public asString(): JString;
    public asObject(): JObject;
    public asArray(): JArray;
    public asBoolean(): JBoolean;
    public asNumber(): JNumber;
    public coerceString(): JString;
    public toJSON(): any;
    public toString(): string;
    public lookup(data_path: string[]): JValue;
}
export class JLiteral extends JValue {
    public value: any;
    constructor(type: JType, value: any, start: number, end: number);
    public toJSON(): any;
}
export class JBoolean extends JLiteral {
    public value: boolean;
    constructor(value: boolean, start: number, end: number);
    public coerceString(): JString;
}
export class JNumber extends JLiteral {
    public value: number;
    constructor(value: number, start: number, end: number);
}
export class JString extends JLiteral {
    public value: string;
    constructor(value: string, start: number, end: number);
    public getString(): string;
}
export class JNull extends JLiteral {
    constructor(start: number, end: number);
}
export class JArray extends JValue {
    public elements: LinkedList<JValue>;
    constructor();
    public push(val: JValue): void;
    public forEach(callback: (JValue: any) => void): void;
    public forEachIndexed(callback: (JValue: any, number: any) => void): void;
    public toJSON(): any;
}
export class JObject extends JValue {
    public properties: Dictionary<JString, JValue>;
    constructor();
    public put(key: JString, val: JValue): void;
    public getOrThrow(property_name: string, error_msg: string): JValue;
    public getOrNull(property_name: string): JValue;
    public getOrWarn(property_name: string, warn_msg: any): JValue;
    public has(property_name: string): boolean;
    public forEach(callback: (key: JString, val: JValue) => void): void;
    public toJSON(): any;
}
export function parse(text: string): JValue;
export function parse_yaml(text: string): JValue;
export function parse_yaml_collection(text: string, callback: (json: JValue) => any): void;


// src/error.d.ts
export class Err {
    public decorator: (error: Error) => Error;
    constructor(decorator: (error: Error) => Error);
    public message(msg: string): Err;
    public validation(err: tv4.TV4Error): Err;
    public source(source: JValue): Err;
    public missingURI(uris: string[]): Err;
    public on(error: Error): Error;
}
export function message(msg: string): Err;
export function source(src: JValue): Err;
export function validation(data: JValue, schema: JValue, data_name: string, schema_name: string, cause: tv4.TV4SingleResult): Err;
export function missingURI(cause: string[]): Err;
export function err(): Err;

}
