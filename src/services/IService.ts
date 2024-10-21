import { Types } from 'mongoose'

interface IService<T> {
    add(data: Partial<T>): Promise<T>
    getAll(): Promise<T[]>
    getById(id: number | Types.ObjectId): Promise<T | null>
    update(id: number | Types.ObjectId, data: Partial<T>): Promise<T | null>
    delete(id: number | Types.ObjectId): Promise<T | null>
}

export default IService