import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/config/database.module';
import { PetController } from './pet.controller';
import { PetService } from './pet.service';
import { petProviders } from './provider/pet.repository';

@Module({
  imports: [DatabaseModule],
  controllers: [PetController],
  providers: [PetService, ...petProviders],
  exports: [PetService],
})
export class PetModule {}
