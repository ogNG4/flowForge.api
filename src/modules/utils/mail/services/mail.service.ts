import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { mailOptions } from '../types/mailOptions';

@Injectable()
export class MailService {
    constructor(private readonly mailerService: MailerService) {}

    public async sendMail(options: mailOptions): Promise<void> {
        await this.mailerService.sendMail(options);
    }
}
