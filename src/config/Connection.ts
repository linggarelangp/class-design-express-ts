import mongoose from 'mongoose'
import * as dotenv from 'dotenv'

dotenv.config()

class Connection {
    public static async connect(): Promise<void> {
        try {
            await mongoose.connect(String(process.env.DATABASE_URL)!)
            console.log('Connected to MongoDB')
        } catch (err: any) {
            console.error(err)
            process.exit(1)
        }
    }
}

export default (async function () {
    await Connection.connect()
})()