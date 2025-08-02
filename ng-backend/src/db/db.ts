import mongoose from "mongoose";

export const connectDB = () => {
  mongoose
    .connect("mongodb://127.0.0.1:27017/ng-db")
    .then((): void => {
      console.log("Connected to MongoDB");
    })
    .catch((error: Error): void => {
      console.error("Error connecting to MongoDB:", error);
    });
};
