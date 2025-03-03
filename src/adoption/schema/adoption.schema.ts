import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, HydratedDocument } from 'mongoose';

export type AdoptionDocument = HydratedDocument<Adoption> & Document;

@Schema({ timestamps: true })
export class Adoption {
  @Prop({ unique: true })
  email: string;

  @Prop()
  phoneNo: string;

  @Prop()
  livingSituation: string;

  @Prop()
  previusSituation: string;

  @Prop()
  PreviusExperience: string;

  @Prop()
  familyComposition: string;

  @Prop({
    ref: 'Pet',
    type: mongoose.Schema.Types.ObjectId,
  })
  petId: mongoose.Schema.Types.ObjectId;
}

export const AdoptionSchema = SchemaFactory.createForClass(Adoption);