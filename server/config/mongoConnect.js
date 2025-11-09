import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.DB_URI);
    console.log("DB Connected");
  } catch (error) {
    console.error(error);
    process.exit(0);
  }
};

export default connectDB;
