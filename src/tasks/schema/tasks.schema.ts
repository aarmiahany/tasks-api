import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type TaskDocument = HydratedDocument<Task>;

@Schema()
export class Task {
  @Prop()
  name: string;

  @Prop()
  description: string;

  @Prop({ default: false }) // set false as default value
  completed: boolean;

  @Prop()
  creatorId: string;
}

export const TaskSchema = SchemaFactory.createForClass(Task);