const mongoose = require("mongoose");
const initData = require("./data.js");
const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";
const Listing = require("../models/Listing.js");
main()
  .then(() => {
    console.log("connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });
async function main() {
  await mongoose.connect(MONGO_URL);
}
const initDB = async () => {
  await Listing.deleteMany({});
  initData.data = initData.data.map((obj) => ({
    ...obj,
    owner: "66bbd1e62c7dc4e06aa34bd2",
  }));
  await Listing.insertMany(initData.data);
  console.log("data inerted successfully");
};
initDB();
