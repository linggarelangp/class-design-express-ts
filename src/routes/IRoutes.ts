import { type Router } from 'express'

interface IRoutes {
    router: Router
    initializeRoutes(): void
}

export default IRoutes