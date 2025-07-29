// Import - default
const crypto = require("crypto");
const mongoose = require("mongoose");

// Import - services
const authService = require("../services/auth_service");

// Import - utils
const ma = require("../utils/constants/model_attributes");
const mc = require("../utils/constants/model_constant");

// Global variables
const { generateToken } = authService;
const { randomBytes, createHmac } = crypto;
const { enumAttr, imageAttr, stringAttr } = ma;
const { userEnums: enums } = mc;
const { model, Schema } = mongoose;

// User schema in database
const userSchema = new Schema(
  {
    fullName: stringAttr(),
    email: stringAttr({ unique: true }),
    salt: stringAttr({ required: false }),
    password: stringAttr({ maxlength: 128 }),
    imageProfilePic: imageAttr({ defaultValue: "/people-512x512.png" }),
    // imageProfilePic: imageAttr({ defaultValue: "/images/uploads/user/thumbnail/people-512x512.png" }),

    role: enumAttr({
      enums: enums.role,
      defaultValue: "USER",
    }),
  },
  { timestamps: true }
);

// userSchema.pre("save", async function (next) {
//   // Use arrow function to retain 'this' context
//   if (!this.isModified("password")) return next();

//   const salt = randomBytes(16).toString("hex");
//   const hashedPassword = createHmac("sha256", salt)
//     .update(this.password)
//     .digest("hex");
//   this.salt = salt;
//   this.password = hashedPassword;

//   next();
// });
userSchema.pre("save", async function (next) {
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
userSchema.static("matchPasswordAndGenerateToken", function (email, password) {
  return this.findOne({ email })
    .then((user) => {
      // Check if there is a user
      if (!user) throw new Error("User not found!");

      const salt = user.salt;
      const hashedPassword = user.password;
      const userProvidedHash = createHmac("sha256", salt)
        .update(password)
        .digest("hex");

      // Check if password matches
      if (hashedPassword !== userProvidedHash)
        throw new Error("Incorrect password!");

      const { encoded } = generateToken(user);
      return encoded;
    })
    .catch((error) => {
      throw error; // Rethrow the error for the caller to handle
    });
});

// User model
const userModel = model("user", userSchema);

module.exports = userModel;
