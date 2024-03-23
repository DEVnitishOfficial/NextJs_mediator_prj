import mongoose from "mongoose"

export async function connectToDb() {
    try {
        mongoose.connect(process.env.MONGO_URL!) // Here exclamation mark(!) says i know what i am doing, you will definitely get a string
        const connection = mongoose.connection

        connection.on('connected',() => {
            console.log('mongodb connected successfully')
        })

        connection.on('error',(err) => {
            console.log('Mongodb connection error, Please make sure db is up and running',err);
            process.exit(1)
        })
        
    } catch (error) {
        console.log('something went wrong while connecting to db',error)
        
    }
}