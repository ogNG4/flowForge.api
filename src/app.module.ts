import { AuthUserDataModule } from './modules/business/authUserData/authUserData.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
// import { TypeOrmConfigService } from './configuration/typeorm.config';
import { envSchema } from './configuration/env.schema';
import { join } from 'path';
import typeorm from './configuration/typeorm.config';
import { UtilsModule } from './modules/utils';
@Module({
    imports: [
        ConfigModule.forRoot({
            ignoreEnvFile: !!process.env.CI,
            envFilePath: join(__dirname, '..', '.env'),
            validationSchema: envSchema,
            isGlobal: true,
            load: [typeorm],
        }),

        TypeOrmModule.forRootAsync({
            inject: [ConfigService],
            useFactory: async (configService: ConfigService): Promise<TypeOrmModuleOptions> => {
                const options = configService.get<TypeOrmModuleOptions>('typeorm');
                if (!options) {
                    throw new Error('TypeORM configuration is undefined');
                }
                return options;
            },
        }),
        UtilsModule,
        AuthUserDataModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
