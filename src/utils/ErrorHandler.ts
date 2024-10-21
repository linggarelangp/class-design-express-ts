import Redis from 'ioredis'
import { MongooseError } from 'mongoose'

class ErrorHandler {
    public static error(error: unknown): string {
        console.error(`Error: ${error}`)
        if (error instanceof MongooseError) return `Database error: ${error.message}`
        if (error instanceof Redis) return `Redis error: ${error}`
        else return `An unexpected error occurred within ${error ? error : 'none'}`
    }
}

export default ErrorHandler