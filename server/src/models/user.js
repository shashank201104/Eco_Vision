import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
    {
      email: { 
        type: String, 
        required: true, 
        unique: true, 
        trim: true, 
        lowercase: true // ✅ Forces lowercase storage
      },
      firstName: { type: String, required: true },
      lastName: { type: String, required: true },
      password: { type: String, required: true, minlength: 8 },
    },
    { timestamps: true }
  );
  
  const User = mongoose.model("User", UserSchema);
  export default User;
  