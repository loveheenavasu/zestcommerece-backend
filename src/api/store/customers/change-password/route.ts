
import type { MedusaRequest, MedusaResponse } from "@medusajs/medusa";
import { CustomerService, AuthService } from '@medusajs/medusa';
import Joi from 'joi';


// Validation Schema
const passwordChangeSchema = Joi.object({
    old_password: Joi.string().trim().required(),
    new_password: Joi.string().trim().required()
});

// Validation Function
const checkValidation = (req: MedusaRequest | any) => {
    const { error } = passwordChangeSchema.validate(req.body);
    if (error) {
        const errorMessage = error.details[0].message.replace(/"/g, ''); // Replace all double quote characters with an empty string
        throw new Error(errorMessage);
    }
};

export async function POST(req: MedusaRequest | any, res: MedusaResponse) {
    try {
        console.log("req.body---", req.body)
        const { customer_id } = req.user;
        const { old_password, new_password } = req.body;
        checkValidation(req);
        const customerService = req.scope.resolve('customerService') as CustomerService;
        // Fetch customer data
        const fetchCustomerData = await customerService.retrieve(customer_id, { select: ["id", "email", "password_hash"] });
        console.log("fetchCustomerData--", fetchCustomerData)
        const authService = req.scope.resolve('authService') as AuthService;

        // Compare old password
        const isOldPasswordValid = await authService.comparePassword_(old_password, fetchCustomerData.password_hash);
        console.log("isOldPasswordValid--", isOldPasswordValid)
        if (!isOldPasswordValid) {
            // ----------
            // let data = WrongCurrentPassword.getWrongOldPassword();
            // console.log("----> Found Here ::::: :", data)
            return res.status(400).json({ message: "The old password you entered is incorrect. Please try again." });
        }
        await customerService.update(customer_id, { password: new_password });
        return res.status(200).json({ message: "Password Changed Successfully" });
    }
    catch (err) {
        return res.status(400).json({ message: err?.message });
    }
}