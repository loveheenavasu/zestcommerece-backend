import { BaseService } from 'medusa-interfaces';
import { CustomerService } from '@medusajs/medusa';
import EmailSenderService from '../services/email-sender';




class CustomerSubscriber extends BaseService {
  eventBusService_: any;
  customerService_: CustomerService;
  emailSenderService: EmailSenderService;

  constructor({ eventBusService, customerService, emailSenderService }) {
    super();
    this.eventBusService_ = eventBusService;
    this.customerService_ = customerService;
    this.emailSenderService = emailSenderService
    this.subscribe();
  }

  subscribe() {
    this.eventBusService_.subscribe('customer.password_reset', this.handlePasswordResetEvent);
  }

  handlePasswordResetEvent = async (data: any) => {
    try {
      console.log("customer.password_reset---listening");
      console.log("data---", data);
      const { email, token } = data;
      console.log("process.env----", process.env.BUNDLEID);
      const bundleId = process.env.BUNDLEID
      const resetUrl = `${bundleId}://token=${token}&email=${email}`;
      await this.emailSenderService.resetPassword(email, resetUrl)
    }
    catch (error) {
      console.error('Error handling customer.password_reset event:', error);
    }
  }


  // transporter: Transporter = nodemailer.createTransport({
  //   host: "smtp.gmail.com",
  //   // service: 'gmail',
  //   port: 587,// or use another email service provider
  //   auth: {
  //     user: process.env.NODEMAILER_EMAIL as string,
  //     pass: process.env.NODEMAILER_PASSWORD as string,
  //   },
  // });



  // sendMail = async (mailOptions: MailOptions): Promise<void> => {
  //   console.log("mailOptions----", mailOptions);
  //   try {
  //     const data = await this.transporter.sendMail(mailOptions);
  //     console.log("mail sent----",data?.response)
  //   }
  //   catch (err) {
  //     console.log("error---",err)
  //   }
  // };




}

export default CustomerSubscriber;
