'use strict';

const isObject = (a) => typeof a === 'object';
const isEmptyObject = (a) => !Object.keys(a).length;
const isSimple = (a) => !a || !isObject(a) || isEmptyObject(a);
const pop = (a) => a.pop() || [];

module.exports = (divider, obj) => {
    if (!obj) {
        obj = divider;
        divider = '.';
    }
    
    check(divider, obj);
    
    if (isEmptyObject(obj))
        return [];
    
    return getAll(divider, obj);
};

function getAll(divider, obj) {
    const result = [];
    
    const [currentResult, stack] = readPaths(obj, divider);
    
    result.push(...currentResult);
    
    let [key, current] = pop(stack);
    
    while (current) {
        const [currentResult, currentStack] = readPaths(current, divider, key);
        
        result.push(...currentResult);
        stack.push(...currentStack);
        
        [key, current] = pop(stack);
    }
    
    return result;
}

const {entries} = Object;

function readPaths(obj, divider, path = '') {
    const result = [];
    const stack = [];
    
    for (const [key, value] of entries(obj)) {
        const fullPath = !path ? key : `${path}${divider}${key}`;
        
        if (isSimple(value)) {
            result.push(fullPath);
            continue;
        }
        
        if (value === obj)
            continue;
        
        stack.push([fullPath, value]);
    }
    
    return [result, stack];
}

function check(divider, obj) {
    if (typeof divider !== 'string')
        throw Error('divider should be a string!');
    
    if (typeof obj !== 'object')
        throw Error('obj should be an object!');
}

