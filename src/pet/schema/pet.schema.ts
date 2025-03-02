import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type PetDocument = HydratedDocument<Pet> & Document;

@Schema({ timestamps: true })
export class Pet {
  @Prop()
  name: string;

  @Prop({ required: true, type: Number })
  age: number;

  @Prop()
  area: string;

  @Prop()
  justification: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop()
  phone: string;

  @Prop()
  type: string;

  @Prop()
  filename: string;

  @Prop({type: String, default: 'Pendente'})
  status: string;
}

export const PetSchema = SchemaFactory.createForClass(Pet);