/**
 * @type {Cypress.PluginConfig}
 */

import { MongoTask } from "./databases/mongoDB"

 export default  (on, config) => {
  on('task', MongoTask)
 }