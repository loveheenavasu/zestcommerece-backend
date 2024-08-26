import type { MedusaRequest, MedusaResponse } from "@medusajs/medusa";
import { CustomerService, AuthService } from '@medusajs/medusa';

export async function POST(req: MedusaRequest | any, res: MedusaResponse) {
    const { email } = req.body;
    console.log("email---", email);
    const customerService = req.scope.resolve('customerService') as CustomerService;
    console.log("email---", email);
    var customer;

    // Check if the email is registered
    try {
        customer = await customerService.retrieveByEmail(email);
        console.log("customer---", customer);
        if (customer) {
            return res.status(200).json({ data: customer });
        } else {
            return res.status(404).json({ data: "Provided email is not registered!" });
        }
    }
    catch (error) {
        console.log("------ error :: ", error);
        return res.status(500).json({ message: 'Internal Server Error!' });
    }
}





// import type { MedusaRequest, MedusaResponse } from "@medusajs/medusa";
// import { CustomerService } from '@medusajs/medusa';

// export async function POST(req: MedusaRequest | any, res: MedusaResponse) {
//     const { email } = req.body;
//     console.log("email---", email);
//     const customerService = req.scope.resolve('customerService') as CustomerService;
//     console.log("email---", email);

//     // Check if the email is registered
//     const customer = await customerService.retrieveByEmail(email);
//     console.log("email---", email);

//     console.log("customer---", customer);
//     if (!customer) {
//         // Email not found, return a 404 response
//         return res.status(404).json({ error: 'Email not registered' });
//     }
//     else {

//     }
//     // res.json({
//     //     message: "Hello world!",
//     // });
// }
