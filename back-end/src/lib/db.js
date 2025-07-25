import mongoose from "mongoose"

export const connectDB = async() =>{
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI);
        console.log(`ConnectDB successfully: ${conn.connection.host}`)
    } catch (error) {
        console.log("MongDb connecttion error: "+error)
    }
}

// exports = { connectDB }