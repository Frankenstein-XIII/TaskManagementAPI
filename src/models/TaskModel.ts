import mongoose, {Schema, Document} from "mongoose";

export interface ITaskDocument extends Document{
      title: string;
      status: 'open'| 'in-progress'| 'closed';
      type: 'bug'| 'feature';
      dueDate: Date;
      ownerId : string;
      severity?: string; // optional
      impactScore?: number; // optional
}

// create mongoose schema
const TaskSchema: Schema = new Schema({
      title: {type: String, required: true},
      status:{type: String, enum: ['open','in-progress','closed'], default:'open'},
      tType: {type: String, enum:['bug','feature'], required:true},
      dueDate: {type: Date, required:true},
      ownerId: {type:String, required: true},
      severity: {type: String},
      impactScore: {type: Number}
}, {timestamps: true});

export const TaskModel = mongoose.model<ITaskDocument>('Task', TaskSchema);