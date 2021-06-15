const MongoClient = require('mongodb').MongoClient;
    
export const MongoTask = { 
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
}