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
        if (data)
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
    makeMessage: function makeMessage(data) {
        if (isArrayNotEmpty(data))
            return 'Success';
        else
            return 'No data';
    },
    makeCode: function makeCode(result) {
        if (result)
            return 'Success';
        else
            return 'Failed';
    }
};
