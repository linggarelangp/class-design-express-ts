import express, { type Router, type Application, type Request, type Response } from 'express'
import cookieParser from 'cookie-parser'

import { rolesRoutes } from './instance'

// Connect DB
import './config/Connection'

class App {
    public app: Application
    private port: number
    private host: string

    public constructor(_port: number, _host: string) {
        this.app = express()

        this.port = (_port !== undefined && typeof _port === 'number' && _port > 0 && _port <= 65535) ? _port : 3000
        this.host = (_host !== undefined && typeof _host === 'string') ? _host : 'localhost'

        this.config()
        this.initializeRoutes()
    }

    private config(): void {
        this.app.use(express.json())
        this.app.use(express.urlencoded({ extended: false }))
        this.app.use(cookieParser())
    }

    public getResource(): void {
        this.app.get('/resource/:id', (req: Request, res: Response): Response => {
            const resourcesId: number = Number(req.params.id)

            if (resourcesId !== 1) {
                res.status(400).json({
                    status: 400,
                    message: 'Bad Request'
                })
            }

            return res.status(200).json({
                status: 200,
                message: 'OK'
            })
        })
    }

    private initializeRoutes(): void {
        let routes: Router
        const dataRoutes: Router[] = [rolesRoutes]

        for (routes of dataRoutes) {
            this.app.use('/api/v1', routes)
        }
    }

    public start(): void {
        this.app.listen(this.port, (): void => {
            console.log(`app running at http://${this.host}:${this.port}`)
        })
    }
}

export default App