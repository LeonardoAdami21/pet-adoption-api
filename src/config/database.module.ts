import { Module } from '@nestjs/common';
import { databaseProviders } from './mongo.config';


@Module({
  providers: [...databaseProviders],
  exports: [...databaseProviders],
})
export class DatabaseModule {}
