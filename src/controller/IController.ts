import { type Request, type Response } from 'express'

interface IController {
    add(req: Request, res: Response): Promise<Response>
    getAll(req: Request, res: Response): Promise<Response>
    getById(req: Request, res: Response): Promise<Response>
    update(req: Request, res: Response): Promise<Response>
    delete(req: Request, res: Response): Promise<Response>
}

export default IController