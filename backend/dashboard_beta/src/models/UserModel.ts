/* eslint-disable @typescript-eslint/no-explicit-any */
// Package imports
import { Document, model, Schema } from "mongoose";
import { randomBytes, createHmac } from "crypto";

// Non-package imports
import { generateToken } from "../services/authService";

// User Document schema
interface UserDocument extends Document {
  password: string;
  salt: string;
  isModified(field: string): boolean;
}

// User schema in database
const UserSchema = new Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    salt: {
      type: String,
    },
    password: {
      type: String,
      required: true,
    },
    profileImageURL: {
      type: String,
      default: "/images/people_512x512.png",
    },
    role: {
      type: String,
      enum: ["USER", "ADMIN"],
      default: "USER",
    },
  },
  { timestamps: true }
);

// Before saving the schema
// UserSchema.pre("save", function (next) {
//   const user: any = this;

//   // Return if password is not modified
//   if (!user.isModified("password")) return;

//   // Save hashed passowrd instead of password
//   const salt = randomBytes(16).toString();
//   const hashedPassword = createHmac("sha256", salt)
//     .update(user.password)
//     .digest("hex");
//   this.salt = salt;
//   this.password = hashedPassword;
//   next();
// });
UserSchema.pre<UserDocument>("save", async function (next) {
  // Use arrow function to retain 'this' context
  if (!this.isModified("password")) return next();

  const salt = randomBytes(16).toString("hex");
  const hashedPassword = createHmac("sha256", salt)
    .update(this.password)
    .digest("hex");
  this.salt = salt;
  this.password = hashedPassword;

  next();
});

// Virtual function used for verifying password
UserSchema.static(
  "matchPasswordAndGenerateToken",
  async function (email: any, password: any) {
    const user = await this.findOne({ email });

    // Check of there is a user
    if (!user) throw new Error("User not found!");

    const salt = user.salt;
    const hashedPassword = user.password;
    const userProvidedHash = createHmac("sha256", salt)
      .update(password)
      .digest("hex");

    // Check of password matches
    if (hashedPassword !== userProvidedHash)
      throw new Error("Incorrect password!");

    const token = generateToken(user);
    return token;
  }
);

// User model
const UserModel = model("user", UserSchema);

export default UserModel;
