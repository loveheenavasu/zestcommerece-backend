import nodemailer, { Transporter } from 'nodemailer';
import path from 'path';
import fs from 'fs';

interface MailOptions {
    from: string;
    to: string;
    subject: string;
    html: string;
}

export default class EmailSenderService {
    transporter: Transporter;

    constructor() {
        this.transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587, // or use another email service provider
            secure: false, // true for 465, false for other ports
            auth: {
                user: process.env.NODEMAILER_EMAIL as string,
                pass: process.env.NODEMAILER_PASSWORD as string,
            },
        });
    }

    resetPassword = async (email: string, resetUrl:string) => {
        try {
            const subject = "Password Reset Request";
            const filepath = path.join(__dirname, '../email-templates/password-reset.html');
            let html = fs.readFileSync(filepath, { encoding: 'utf-8' });
            html = html.replace('RESET_URL', resetUrl);
            // console.log("resetUrl--", resetUrl)
            // console.log("html----",html)
            await this.sendMail(email, subject, html);
        }
        catch (err) {
            throw err;
        }
    }


    sendMail = async (email: string, subject: string, html: any): Promise<void> => {
        try {
            const mailOptions: MailOptions = {
                from: process.env.NODEMAILER_EMAIL as string,
                to: email,
                subject: subject,
                html: html
            }
            const data = await this.transporter.sendMail(mailOptions);
            console.log("mail sent----", data?.response)
        }
        catch (err) {
            console.log("error---", err)
        }
    };

}