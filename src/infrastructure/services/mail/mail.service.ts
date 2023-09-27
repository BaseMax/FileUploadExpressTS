import { Transport, createTransport } from 'nodemailer';
import { MailOptions } from 'nodemailer/lib/smtp-transport';
import { Service } from 'typedi';

@Service()
export class MailService {
  private transporter: Transport;
  constructor() {
    this.transporter = createTransport({
      host: 'smtp.forwardemail.net',
      port: 465,
      secure: true,
      auth: {
        user: 'REPLACE-WITH-YOUR-ALIAS@YOURDOMAIN.COM',
        pass: 'REPLACE-WITH-YOUR-GENERATED-PASSWORD'
      }
    });
  }

  send() {}
}
