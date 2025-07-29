// Package imports
import { Types } from "mongoose";

// User model schema (not used in database, for typescript purposes)
export type UserSchema = {
  _id: Types.ObjectId;
  fullName: string;
  email: string;
  salt?: string;
  role?: string;
  password: string;
  profileImageURL?: string;
  createdAt: Date;
  updatedAt: Date;
};
