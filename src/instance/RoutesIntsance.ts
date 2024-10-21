import express, { type Router } from 'express'

import { RolesRoutes } from '../routes'
import { rolesController } from './'

const router: Router = express.Router()
export const rolesRoutes: Router = new RolesRoutes(router, rolesController).router