import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type PetDocument = HydratedDocument<Pet> & Document;

@Schema({ timestamps: true })
export class Pet {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, type: Number })
  age: number;

  @Prop({ required: true })
  area: string;

  @Prop({ required: true })
  justification: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  phone: string;

  @Prop({ required: true })
  type: string;

  @Prop({ required: true })
  filename: string;

  @Prop({type: String, default: 'Pendente'})
  status: string;
}

export const PetSchema = SchemaFactory.createForClass(Pet);