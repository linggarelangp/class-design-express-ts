import { type Model, type Types } from 'mongoose'

import IRoles from '../database/types/IRoles'
import IService from './IService'
import ErrorHandler from '../utils/ErrorHandler'

class RolesService implements IService<IRoles> {
    public roles: Model<IRoles>

    public constructor(_roles: Model<IRoles>) {
        this.roles = _roles
    }

    public async add(data: Partial<IRoles>): Promise<IRoles> {
        try {
            return await this.roles.create(data)
        } catch (error: any) {
            throw new Error(ErrorHandler.error(error))
        }
    }

    public async getAll(): Promise<IRoles[]> {
        try {
            return await this.roles.find() as IRoles[]
        } catch (error: any) {
            throw new Error(ErrorHandler.error(error))
        }
    }

    public async getById(id: number | Types.ObjectId): Promise<IRoles | null> {
        try {
            const query = typeof id === 'number' ? { roleId: id } : { _id: id }
            return await this.roles.findOne(query)
        } catch (error: any) {
            throw new Error(ErrorHandler.error(error))
        }
    }

    public async update(id: number | Types.ObjectId, data: Partial<IRoles>): Promise<IRoles | null> {
        try {
            const query = typeof id === 'number' ? { roleId: id } : { _id: id }
            return await this.roles.findOneAndUpdate(query, { $set: data }, { new: true })
        } catch (error: any) {
            throw new Error(ErrorHandler.error(error))
        }
    }

    public async delete(id: number | Types.ObjectId): Promise<IRoles | null> {
        try {
            const query = typeof id === 'number' ? { roleId: id } : { _id: id }
            return await this.roles.findOneAndDelete(query)
        } catch (error: any) {
            throw new Error(ErrorHandler.error(error))
        }
    }
}

export default RolesService