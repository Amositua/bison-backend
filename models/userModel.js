import mongoose from 'mongoose';
import bcrypt from 'bcryptjs'

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    // password: {
    //   type: String,
    //   required: true,
    // },
    phone: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      enum: ['Male', 'Female', 'Other', 'Prefer not to say'],
      required: true,
    },
    dob: {
      type: Date,
      required: true,
    },
    educationLevel: {
      type: String,
      enum: ['Student', 'Graduate', 'Professional', 'Other'],
      required: true,
    },
    fieldOfStudy: {
      type: String,
      required: true,
    },
    professionalTitle: {
      type: String,
      required: true,
    },
    howDidYouKnow: {
      type: String,
      enum: ['whatsapp', 'facebook', 'instagram', 'twitter', 'linkedin', 'online', 'aFriend', 'other'],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);



userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Encrypt password using bcrypt
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

const User = mongoose.model('User', userSchema);
 
export default User;
