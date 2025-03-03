import { forwardRef, Module } from '@nestjs/common';
import { AdoptionService } from './adoption.service';
import { AdoptionController } from './adoption.controller';
import { DatabaseModule } from 'src/config/database.module';
import { PetModule } from 'src/pet/pet.module';
import { adoptionProviders } from './provider/adoption.repository';

@Module({
  imports: [DatabaseModule, forwardRef(() => PetModule)],
  controllers: [AdoptionController],
  providers: [AdoptionService, ...adoptionProviders],
})
export class AdoptionModule {}
