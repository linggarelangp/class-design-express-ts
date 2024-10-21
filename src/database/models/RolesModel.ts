import mongoose, { type Model, type Schema } from 'mongoose'
import IModel from './IModel'
import IRoles from '../types/IRoles'

class RolesModel implements IModel<IRoles> {
    public schema: Schema<IRoles>
    private roles: Model<IRoles>

    public constructor() {
        this.schema = new mongoose.Schema<IRoles>({
            roleId: {
                type: Number,
                unique: true,
                required: true
            },
            name: {
                type: String,
                required: true
            }
        }, {
            timestamps: true,
            versionKey: false
        })

        this.config()
        this.roles = mongoose.model<IRoles>('Roles', this.schema, 'Roles')
    }

    public config(): void {
        this.schema.set('toJSON', {
            transform: function (doc, ret) {
                delete ret.__v
            }
        })
    }

    public model(): Model<IRoles> {
        return this.roles
    }
}

export default RolesModel