
import { Model } from 'mongoose'

import { RolesModel } from '../database/models/'
import IRoles from '../database/types/IRoles'
import { IService, RolesService } from '../services'

const roles: Model<IRoles> = new RolesModel().model()
export const rolesService: IService<IRoles> = new RolesService(roles)