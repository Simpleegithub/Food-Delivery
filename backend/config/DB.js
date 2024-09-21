import mongoose from "mongoose";
// config dotenv
import dotenv from 'dotenv';
dotenv.config();

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MOGO_URL, {
            useUnifiedTopology: true,
            useNewUrlParser: true
        });

        console.log(`Database Connected`);

    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

connectDB();

export default connectDB;