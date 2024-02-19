function isArrayNotEmpty<T>(arr: T[]) {
    if (arr.length)
        return true;
    else
        return false;
}

export default {
    makeResponse: function makeResponse(data: any, message: string | null, err: string | null) {
        return {
            data: data,
            message: message,
            err: err
        }
    },
    convertStringtoBoolean: function convertStringtoBoolean(cur: string) {
        if (cur === 'true')
            return true;
        else
            return false;
    },
    isArrayNotEmpty: isArrayNotEmpty,
    makeMessage: function makeMessage<T>(data: T[]): string {
        if (isArrayNotEmpty(data))
            return 'Success';
        else
            return 'No data';
    }
}