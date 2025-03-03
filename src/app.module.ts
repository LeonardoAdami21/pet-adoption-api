import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { databaseProviders } from './config/mongo.config';
import { PetModule } from './pet/pet.module';
import { AdoptionModule } from './adoption/adoption.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: !process.env.NODE_ENV
        ? '.env'
        : `.env.${process.env.NODE_ENV}`,
      isGlobal: true,
    }),
    PetModule,
    AdoptionModule,
  ],
  providers: [...databaseProviders],
  exports: [...databaseProviders],
})
export class AppModule {}
