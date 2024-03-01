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
        var response = {};
        if (data && data.length)
            response.data = data;
        if (message)
            response.message = message;
        if (err)
            response.error = err;
        return response;
    },
    convertStringtoBoolean: function convertStringtoBoolean(cur) {
        if (cur === 'true')
            return true;
        else
            return false;
    },
    isArrayNotEmpty: isArrayNotEmpty,
    makeCodeByArray: function makeCodeByArray(data) {
        if (isArrayNotEmpty(data))
            return 'Success';
        else
            return 'No data';
    },
    makeCodeByNumber: function makeCode(result) {
        if (result)
            return 'Success';
        else
            return 'Failed';
    }
};
