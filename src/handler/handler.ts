import { ErrorResponse } from './error';
import type { MedusaResponse } from "@medusajs/medusa";


const handleSuccess = (res: MedusaResponse, data: any) => {
    try {
        res.json(data);
    }  
    catch (err) {
        throw err;
    }
}

const handleCustomError = (error: ErrorResponse) => {
        try {
            const message = error?.message ?? 'Bad Request'
            const statusCode = error?.statusCode ?? 400
            throw {
                message: message,
                statusCode: statusCode
            }
        }
        catch (err) {
            throw err;
        }
    }

const handleCatchError = (res: MedusaResponse, error: ErrorResponse) => {
    try {
        const { message } = error
        const statusCode = error?.statusCode ?? 400
        // res.status(statusCode).send({ message: message });
        res.status(statusCode).json({ message: message });

    }
    catch (err) {
        throw err;
    }
}


const handleJoiError = (error: ErrorResponse | any) => {
        try {
            const message = error?.details[0]?.message;
            const errorMessage = message.replace(/"/g, ''); // replaces all double quote character with an empty string;
            throw {
                message: errorMessage,
                statusCode: 400
            }
        }
        catch (err) {
            throw err;
        }

}
    
export {
    handleSuccess,
    handleCustomError,
    handleCatchError,
    handleJoiError
}
