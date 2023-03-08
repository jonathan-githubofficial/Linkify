import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  name: { type: String, required:  true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  id: { type: String },
  // To do
  // skills []
  // education []
  // languages []
  // projects []
  // followers []
  // CV: string
});

export default mongoose.model("User", userSchema);