/**
 * @title Error middleware
 **/

// Package imports
// import { NextFunction, Request, Response } from "express";
import { Request, Response } from "express";
import multer from "multer";

// Non-package imports
import * as rm from "../utils/constants/responseMessages";

// File upload error middleware
const fileUploadErrorMiddleware = (
  error: Error,
  req: Request,
  res: Response
  // next: NextFunction
) => {
  // Handle Multer file upload errors
  if (error instanceof multer.MulterError) {
    return res.status(400).json(rm.FILE_UPLOAD_ERROR(error));
  }

  // Handle other errors
  res.status(500).json(rm.SERVER_ERROR);
};

export { fileUploadErrorMiddleware };
