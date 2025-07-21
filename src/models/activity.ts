import mongoose, { Schema, Document, Types } from 'mongoose';

export interface IActivity extends Document {
  userId: Types.ObjectId;
  action: string;
  timestamp: Date;
}

const activitySchema = new Schema<IActivity>({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  action: { type: String, required: true }, // e.g., "Logged in", "Checked orders"
  timestamp: { type: Date, default: Date.now },
});

export default mongoose.model<IActivity>('Activity', activitySchema);