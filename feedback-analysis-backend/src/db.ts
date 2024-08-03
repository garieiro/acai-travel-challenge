import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI || '');
        console.log('Connected to DB');
    } catch(error){
        console.log('Failed to connect to DB', error)
        process.exit(1); // Finish in error case
    }
}

export default connectDB;