import * as dotenv from 'dotenv'

import App from './App'

dotenv.config()

const server = new App(Number(process.env.PORT), String(process.env.HOST))
server.start()