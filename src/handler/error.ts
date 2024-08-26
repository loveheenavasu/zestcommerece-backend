export interface ErrorResponse {
    message: string;
    statusCode?: number;
}

export const WrongOldPassword: ErrorResponse = {
    message: "The old password you entered is incorrect. Please try again.",
    statusCode: 400
};

class WrongCurrentPassword {
    async getWrongOldPassword() {
        return WrongOldPassword;
    }
}




export default new WrongCurrentPassword();



