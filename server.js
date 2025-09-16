// server.js
const app = require("./app");
const config = require("./app/config");
const MongoDB = require("./app/utils/mongodb.util");

async function startServer() {
  try {
       console.log("DB URI:", config.db.uri);
    await MongoDB.connect(config.db.uri);
    console.log("Connected to the database!");

    const port = config.app.port; // dùng cùng 1 tên biến
    app.listen(port, () => {

      console.log(`Server is running on port ${port}`);
    });
  } catch (error) {
    console.error("Cannot connect to the database!", error);
    process.exit(1);
  }
}

startServer();
