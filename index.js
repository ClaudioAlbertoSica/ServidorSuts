import Server from './server.js'
import Config from './config.js'

new Server(Config.PORT, Config.MODEL_PERSISTANCE).start()

