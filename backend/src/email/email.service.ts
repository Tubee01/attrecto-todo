import { Inject, Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import Mail from 'nodemailer/lib/mailer';

@Injectable()
export default class EmailService {
  constructor(private readonly mailerService: MailerService) { }

  async sendMail(options) {
    if (!this.mailerService) throw new Error('SMTP connection failed.');
    const response = await this.mailerService.sendMail({
      ...options,
    });
    if (response.messageId) {
      return response;
    }
    throw new Error('SMTP send failed.');
  }
}
