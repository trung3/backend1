const { MongoClient } = require("mongodb");

const uri = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017";
const dbName = process.env.DB_NAME || "contactbook";

// 👉 Singleton client + promise để tránh connect trùng
const client = new MongoClient(uri, {});
let clientPromise = null;

async function getClient() {
  if (!clientPromise) clientPromise = client.connect();
  return clientPromise; // đã connect thì trả về ngay
}

function getDb() {
  // chỉ gọi sau khi getClient() đã await
  return client.db(dbName);
}

// Đóng kết nối CHỈ khi app thoát
async function closeClient() {
  if (client && client.topology && !client.topology.isClosed()) {
    await client.close();
  }
}

module.exports = { getClient, getDb, closeClient, dbName };
