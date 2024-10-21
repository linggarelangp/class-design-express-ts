import { type Request, type Response } from 'express'

import IController from './IController'
import { IService } from '../services'
import IRoles from '../database/types/IRoles'
import RedisClient from '../middleware/RedisClient'

class RolesController implements IController {
    public roles
    private redis: RedisClient

    public constructor(_service: IService<IRoles>) {
        this.roles = _service
        this.redis = new RedisClient('rolesData')
    }

    public async add(req: Request, res: Response): Promise<Response> {
        const { ...body } = req.body

        try {
            if (!body.name || isNaN(Number(body.roleId))) {
                return res.status(400).json({
                    status: 400,
                    message: 'Bad Request'
                })
            }

            const data: Partial<IRoles> = {
                roleId: Number(body.roleId),
                name: String(body.name)
            }

            const roles: IRoles = await this.roles.add(data)

            return res.status(201).json({
                status: 201,
                message: 'Created',
                data: roles
            })
        } catch (err: any) {
            return res.status(500).json({
                status: 500,
                message: 'Internal Server Error'
            })
        }
    }

    public async getAll(req: Request, res: Response): Promise<Response> {
        try {
            const roles: IRoles[] = await this.roles.getAll()

            this.redis.setKey(roles)

            return res.status(200).json({
                status: 200,
                message: 'OK',
                data: roles
            })
        } catch (err: any) {
            console.error(err)
            return res.status(500).json({
                status: 500,
                message: 'Internal Server Error'
            })
        }
    }

    public async getById(req: Request, res: Response): Promise<Response> {
        const id: number = Number(req.params.id)

        try {
            if (isNaN(id) || id < 0) {
                return res.status(400).json({
                    response: 400,
                    message: 'Bad Request'
                })
            }

            const roles: IRoles | null = await this.roles.getById(id)

            if (!roles) {
                return res.status(404).json({
                    status: 404,
                    message: 'Data Not Found'
                })
            }

            return res.status(200).json({
                status: 200,
                message: 'OK',
                data: roles
            })
        } catch (err: any) {
            return res.status(500).json({
                status: 500,
                message: 'Internal Server Error'
            })
        }
    }

    public async update(req: Request, res: Response): Promise<Response> {
        const { ...body } = req.body
        const id: number | undefined = Number(req.params.id)

        try {
            if (!body.name || isNaN(id) || id < 0) {
                return res.status(400).json({
                    response: 400,
                    message: 'Bad Request'
                })
            }

            const data: Partial<IRoles> = {
                name: String(body.name)
            }

            const roles: IRoles | null = await this.roles.update(id, data)

            if (!roles) {
                return res.status(404).json({
                    status: 404,
                    message: 'Not Found'
                })
            }

            return res.status(200).json({
                status: 200,
                message: 'OK',
                data: roles
            })
        } catch (err: any) {
            console.error(err)
            return res.status(500).json({
                status: 500,
                message: 'Internal Server Error'
            })
        }

    }

    public async delete(req: Request, res: Response): Promise<Response> {
        const id: number = Number(req.params.id)

        try {
            if (isNaN(id) || id <= 0) {
                return res.status(400).json({
                    status: 400,
                    message: 'Bad Request'
                })
            }

            const data: IRoles | null = await this.roles.delete(id)

            if (!data) {
                return res.status(404).json({
                    status: 404,
                    message: 'Not Found'
                })
            }

            return res.status(204).json({
                status: 204,
                message: 'No Content'
            })
        } catch (err: any) {
            return res.status(500).json({
                status: 500,
                message: 'Internal Server Error'
            })
        }
    }
}

export default RolesController