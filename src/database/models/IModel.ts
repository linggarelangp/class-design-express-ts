import { type Model, type Schema } from 'mongoose'

interface IModel<T> {
    schema: Schema<T>
    config(): void
    model(): Model<T>
}

export default IModel