import { Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (
        configService: ConfigService,
      ): Promise<TypeOrmModuleOptions> => {
        return {
          type: configService.get<string>('DATABASE_CONNECTION') as any,
          host: configService.get<string>('DATABASE_HOST'),
          port: configService.get<number>('DATABASE_PORT'),
          username: configService.get<string>('DATABASE_USERNAME'),
          password: configService.get<string>('DATABASE_PASSWORD'),
          database: configService.get<string>('DATABASE_DB_NAME'),
          entities: [__dirname + './../**/**/**.entity{.ts,.js}'],
          synchronize: false, //true
          autoLoadEntities: true,
          logging: 'all',
          logger: 'file',
          // ssl: {
          //   require: false,
          //   rejectUnauthorized: false,
          // },
        };
      },
      inject: [ConfigService],
    }),
  ],
})
export class DatabaseModule {}
