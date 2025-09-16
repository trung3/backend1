// app/utils/mongodb.util.js
const { MongoClient } = require("mongodb");

class MongoDB {
  static client;

  static async connect(uri) {
    if (this.client) return this.client;
    this.client = await MongoClient.connect(uri, { 
      // useUnifiedTopology/useNewUrlParser không cần ở driver mới
    });
    return this.client;
  }
}

module.exports = MongoDB;
