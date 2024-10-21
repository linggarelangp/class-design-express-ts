import { type Document, type Types } from 'mongoose'

// export interface Roles {
//     id?: Types.ObjectId
//     roleId?: number
//     name?: string
//     createdAt?: Date
//     updatedAt?: Date
// }

interface IRoles extends Document {
    _id: Types.ObjectId
    roleId: number
    name: string
    readonly createdAt: Date
    readonly updatedAt: Date
}

export default IRoles