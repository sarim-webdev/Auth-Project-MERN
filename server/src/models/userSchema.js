import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  userName: String,
  email: {
    type: String,
    unique: true,
  },
  password: String,
  profileImage: String,
});

const User = mongoose.model("users", userSchema);

export { User };
