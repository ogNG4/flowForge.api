import { Module } from '@nestjs/common';
import { CommonModule } from './common';
import { MailModule } from './mail/mail.module';

@Module({
    imports: [CommonModule, MailModule],
    exports: [CommonModule, MailModule],
})
export class UtilsModule {}
