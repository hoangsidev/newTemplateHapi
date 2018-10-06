module.exports = {
    resData: (statusCode, success, message, data) => {
        return {
            statusCode: statusCode,
            success: success,
            message: message,
            data: data
        };
    },
    resErr: (error) => {
        return {
            statusCode: 201,
            success: false,
            message: error,
            data: null
        };
    },
    // limitField: (arrSelect, object) => {
    //     var newObject = {};
    //     object = JSON.parse(JSON.stringify(object));
    //     arrSelect.map(key => {
    //         newObject[key] = object[key];
    //     });
    //     return newObject;
    // }
}