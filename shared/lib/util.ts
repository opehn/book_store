import { MyResponse } from '../../shared/type';

function isArrayNotEmpty<T>(arr: T[]) {
    if (arr.length)
        return true;
    else
        return false;
}

export default {
    makeResponse: function makeResponse(data: any, message: string | null, err: string | null) {
        let response: MyResponse = {};
        if (data && data.length)
            response.data = data;
        if (message)
            response.message = message;
        if (err)
            response.error = err;
        return response;
    },
    convertStringtoBoolean: function convertStringtoBoolean(cur: string) {
        if (cur === 'true')
            return true;
        else
            return false;
    },

    isArrayNotEmpty: isArrayNotEmpty,

    makeCodeByArray: function makeCodeByArray<T>(data: T[]): string {
        if (isArrayNotEmpty(data))
            return 'Success';
        else
            return 'No data';
    },
    makeCodeByNumber: function makeCode(result: number) {
        if (result)
            return 'Success'
        else
            return 'Failed'
    }

}