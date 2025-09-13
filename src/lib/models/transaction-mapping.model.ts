import mongoose, { Schema, Document } from 'mongoose';

export interface ITransactionMapping extends Document {
  transactionId: string;
  adapter: string;
  adapterName: string;
  userUnique?: string;
  createdAt: Date;
  updatedAt: Date;
}

const TransactionMappingSchema: Schema = new Schema({
  transactionId: {
    type: String,
    required: true,
    unique: true,
    index: true
  },
  adapter: {
    type: String,
    required: true,
    enum: ['easybit', 'letsexchange', 'changelly', 'change_now']
  },
  adapterName: {
    type: String,
    required: true
  },
  userUnique: {
    type: String,
    required: false
  }
}, {
  timestamps: true
});

// Create compound index for faster lookups
TransactionMappingSchema.index({ transactionId: 1, adapter: 1 });

export default mongoose.models.TransactionMapping || mongoose.model<ITransactionMapping>('TransactionMapping', TransactionMappingSchema);
