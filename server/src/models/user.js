//Author- Shashank
import mongoose from "mongoose";

//======== Schema for User account =============
//email:stores user's email (unique)
//firstName: stores user's first name
//lastname:stores user's last name
//pasword: stores user's account password

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
  