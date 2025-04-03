const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { 
      type: String, 
      required: true, 
      unique: true, 
      lowercase: true, 
      match: [/^\S+@\S+\.\S+$/, "Please enter a valid email address"]
    },
    password: { type: String, required: true, minlength: 6 },
    role: { type: String, enum: ["admin", "user"], default: "user" }
  },
  { timestamps: true } // 🟢 Automatically adds createdAt & updatedAt fields
);

module.exports = mongoose.model("User", UserSchema);
