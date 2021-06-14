/// <reference types="cypress" />
// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)

/**
 * @type {Cypress.PluginConfig}
 */

 const MongoClient = require('mongodb').MongoClient;
 fs = require('fs')
 module.exports = (on, config) => {
   on('task', {
    getMongoDBData({url_connection, database, collection, filter }) {
       return new Promise((resolve) => {
         MongoClient.connect(url_connection, (err, client) => {
           if (err) {
             console.log(`MONGO CONNECTION ERROR: ${err}`)
             throw err;
           } else {
             const db = client.db(database);
             console.log("Collection --- " + collection + "   --- filter --- " + JSON.stringify(filter));
             db.collection(collection).find().toArray(function (error, docs) {
              if (error) {
                console.log("Error while fetching documents from collection.");
                return;
              }
              resolve(docs);
              });
             client.close();
           }
         })
       });
     } 
   }) 
 };