import mongoose from "mongoose"

mongoose.connection.on('connected', () => {
        console.log('✅ Database connected');
})

mongoose.connection.on('error', (err) => {
console.log('❌ MongoDB connection error:', err);
})

const connectDb = () => {
    mongoose.connect(process.env.MONGODB_URI)
    .catch((err) => {
        console.log('❌ Initial MongoDB connection error:', err);
    })
}

export default connectDb