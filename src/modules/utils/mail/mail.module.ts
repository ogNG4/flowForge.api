import { MailerModule } from '@nestjs-modules/mailer';
import { Global, Module } from '@nestjs/common';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { MailService } from './services/mail.service';
import * as dotenv from 'dotenv';
dotenv.config();

@Global()
@Module({
    imports: [
        MailerModule.forRoot({
            transport: {
                host: process.env.MAIL_HOST,
                port: parseInt(process.env.MAIL_PORT!),
                secure: process.env.MAIL_SECURE === 'true' ? true : false,
                auth: {
                    user: process.env.MAIL_USER,
                    pass: process.env.MAIL_PASSWORD,
                },
                tls: {
                    rejectUnauthorized: false,
                },
            },
            defaults: {
                from: process.env.MAIL_FROM,
            },
            template: {
                dir: __dirname + '/templates',
                adapter: new HandlebarsAdapter(),
                options: {
                    strict: false,
                },
            },
        }),
    ],
    providers: [MailService, HandlebarsAdapter],
    exports: [MailService],
})
export class MailModule {}
