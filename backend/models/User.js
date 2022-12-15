import bcrypt from "bcryptjs";
import mongoose from "mongoose";
const Schema = mongoose.Schema;

const userSchema = new Schema({
  userFirstName: {
    type: String,
    required: true,
  },
  userLastName: {
    type: String,
    required: true,
  },
  userAddress: {
    type: String,
    required: true,
  },
  userUsername: {
    type: String,
    required: true,
  },
  userPassword: {
    type: String,
    required: true,
    select: false,
  },
  userPasswordConfirm: {
    type: String,
    validate: {
      validator: function (el) {
        return el === this.userPassword;
      },
      message: "Passwords don't match!",
    },
  },
  userRole: {
    type: String,
    enum: ["admin", "client"],
  },
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("userPassword")) return next();
  this.userPassword = await bcrypt.hash(this.userPassword, 12);
  this.userPasswordConfirm = undefined;
  next();
});

userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

const User = mongoose.model("User", userSchema);

export default User;
