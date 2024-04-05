import mongoose from "mongoose";
export const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("database connected");
  } catch (error) {
    console.log(error);
  }
};
