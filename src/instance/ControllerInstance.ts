
import { rolesService } from './'
import { IController, RolesController } from '../controller'

export const rolesController: IController = new RolesController(rolesService)