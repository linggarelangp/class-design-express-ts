import { NextFunction, type Request, type Response, type Router } from 'express'

import IController from '../controller/IController'
import IRoutes from './IRoutes'
import RedisClient from '../middleware/RedisClient'

class RolesRoutes implements IRoutes {
    public router: Router
    private controller: IController
    private redis: RedisClient

    public constructor(_routes: Router, _controller: IController) {
        this.router = _routes
        this.controller = _controller
        this.redis = new RedisClient('rolesData')

        this.initializeRoutes()
    }

    public initializeRoutes(): void {
        this.router.use(async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => this.redis.getKey(req, res, next))
        this.router.post('/roles/add', async (req: Request, res: Response): Promise<Response> => this.controller.add(req, res))
        this.router.get('/roles/getAll', async (req: Request, res: Response): Promise<Response> => this.controller.getAll(req, res))
        this.router.get('/roles/get/:id', async (req: Request, res: Response): Promise<Response> => this.controller.getById(req, res))
        this.router.put('/roles/update/:id', async (req: Request, res: Response): Promise<Response> => this.controller.update(req, res))
        this.router.delete('/roles/delete/:id', async (req: Request, res: Response): Promise<Response> => this.controller.delete(req, res))
    }
}

export default RolesRoutes