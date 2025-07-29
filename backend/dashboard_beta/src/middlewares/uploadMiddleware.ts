/* eslint-disable @typescript-eslint/no-explicit-any */
// Package imports
import { Request } from "express";
import multer, { StorageEngine } from "multer";
import path from "path";

const storage: StorageEngine = multer.diskStorage({
  destination: (
    req: Request,
    file: any,
    cb: (error: Error | null, destination: string) => void
  ) => {
    cb(null, path.resolve(`../public/uploads/`));
  },
  filename: (
    req: Request,
    file: any,
    cb: (error: Error | null, filename: string) => void
  ) => {
    const fileName = `${Date.now()} - ${file.originalname}`;
    cb(null, fileName);
  },
});

// Create Multer middleware with the configured storage, file size limit, and file filter
const upload = multer({
  storage,
  limits: { fileSize: 1024 * 1024 }, // 1MB limit (1MB = 1024 * 1024 bytes)
  fileFilter: (req, file, cb) => {
    // Check if the file type is an image
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
      return cb(new Error("Only image files are allowed!"));
    }
    cb(null, true);
  },
});

export default upload;
