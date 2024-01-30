import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfigService } from './configuration/typeorm.config';
import { envSchema } from './configuration/env.schema';
import { join } from 'path';
import { UserModule } from './modules/business/user/user.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            ignoreEnvFile: !!process.env.CI,
            envFilePath: join(__dirname, '..', '.env'),
            validationSchema: envSchema,
        }),
        TypeOrmModule.forRootAsync({
            useClass: TypeOrmConfigService,
        }),
        UserModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
