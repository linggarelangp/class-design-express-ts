import { type Request, type Response, type NextFunction } from 'express'
import Redis from 'ioredis'
import ErrorHandler from '../utils/ErrorHandler'

class RedisClient {
    public redis: Redis
    private key: string

    public constructor(_key: string) {
        this.redis = new Redis({
            host: '127.0.0.1',
            port: 6379
        })

        this.key = _key

        async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => this.getKey(req, res, next)
    }

    public async setKey(data: any[]): Promise<string | void> {
        try {
            const cachedData: string = await this.redis.setex(this.key, 7200, JSON.stringify(data))

            if (cachedData) return cachedData
            else throw new Error('Error Redis while set Data')
        } catch (error) {
            throw new Error(ErrorHandler.error(error))
        }
    }

    public async getKey(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
        console.log('Redis running')

        try {
            const cachedData: string | null = await this.redis.get(String(this.key))

            if (cachedData) {
                console.log('GET Data From Redis')
                return res.status(200).json({
                    status: 200,
                    message: 'OK',
                    data: JSON.parse(cachedData)
                })
            } else {
                next()
            }
        } catch (error: any) {
            throw new Error(ErrorHandler.error(error))
        }

    }
}

export default RedisClient