import mongoose from "mongoose";

const db = () => {      

  mongoose
    .connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("MongoDB connected");
    })
    .catch((err) => {
        // throw new Error("MongoDB connection error:", err);
      console.log("MongoDB connection error:", err);
    });
}