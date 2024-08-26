import type { MedusaRequest, MedusaResponse } from "@medusajs/medusa";

export async function GET(req: MedusaRequest, res: MedusaResponse) {
    console.log(req)
    res.json({
        message: "Hello world!",
    });
}