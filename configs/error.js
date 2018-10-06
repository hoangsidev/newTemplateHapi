class Error {
    constructor(language) {
        this.lg = require("../locales/" + language)
        this.errors = [
            { success: true, statusCode: 201, message: "success", data: null },
            { success: true, statusCode: 202, message: "userNotFound", data: null },
            { success: false, statusCode: 300, message: "queryError", data: null },
            { success: false, statusCode: 301, message: "loginError", data: null },
            { success: false, statusCode: 302, message: "errorPinMax", data: null },
            { success: false, statusCode: 303, message: "errorFile", data: null },
            { success: false, statusCode: 304, message: "xmppidNotFound", data: null },
            { success: false, statusCode: 305, message: "xmppidNotMap", data: null },
            { success: false, statusCode: 500, message: "badRequest", data: null },
            { success: false, statusCode: 501, message: "userNotFound", data: null },
            { success: false, statusCode: 502, message: "userExist", data: null }
        ];
    }

    getError(statusCode) {
        const error = this.errors.find(vl => {
            return statusCode === vl.statusCode;
        })
        if (!error) return null;
        return { success: error.success, statusCode, message: this.lg[error.message], data: error.data }
    }
}

module.exports = Error;