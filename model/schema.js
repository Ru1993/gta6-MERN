import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const registerSchema = new Schema(
  {
    _id: {
      type: mongoose.Schema.Types.ObjectId,
      default: () => new mongoose.Types.ObjectId(),
    },
    email: { type: String, required: true },
    lastName: { type: String, required: true },
  },
  { timestamps: true }
);

const User = mongoose.model('User', registerSchema);

export default User;
