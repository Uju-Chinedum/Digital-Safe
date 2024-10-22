import mongoose, { Error as MongooseError } from "mongoose";

// Type guard for Mongoose Error
function isMongooseError(err: unknown): err is MongooseError {
  return err instanceof mongoose.Error;
}

// Type guard for MongoDB Duplicate Key Error
function isMongoDuplicateKeyError(
  err: unknown,
): err is MongooseError & { code: number; keyValue: Record<string, any> } {
  return isMongooseError(err) && (err as any).code === 11000; // Use type assertion here
}

// Type guard for MongoDB Cast Error
function isMongoCastError(err: unknown): err is MongooseError.CastError {
  return isMongooseError(err) && err instanceof mongoose.Error.CastError;
}

export { isMongooseError, isMongoDuplicateKeyError, isMongoCastError };
