import mongoose from "mongoose";
const UserSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  profileImage: String, // Store the URL to the profile image
  profession: String,
  address: String,
  dob: Date,
  sex: String,
  phone: String,
});

export default mongoose.model("Users", UserSchema);
