"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function isArrayNotEmpty(arr) {
    if (arr.length)
        return true;
    else
        return false;
}
exports.default = {
    makeResponse: function makeResponse(data, message, err) {
        return {
            data: data,
            message: message,
            err: err
        };
    },
    convertStringtoBoolean: function convertStringtoBoolean(cur) {
        if (cur === 'true')
            return true;
        else
            return false;
    },
    isArrayNotEmpty: isArrayNotEmpty,
    makeMessage: function makeMessage(data) {
        if (isArrayNotEmpty(data))
            return 'Success';
        else
            return 'No data';
    }
};
