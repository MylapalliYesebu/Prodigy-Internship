const mongoose = require("mongoose");
require("dotenv").config();  // ✅ Load environment variables first
const app = require("./app");
const config = require("./config/env");

// 🟢 Ensure Required Environment Variables Exist
if (!config.MONGO_URI || !config.JWT_SECRET || !config.PORT) {
  console.error("❌ Missing required environment variables. Check your .env file.");
  process.exit(1);
}

// 🔹 MongoDB Connection
mongoose.set("strictQuery", false);

mongoose
  .connect(config.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB Connected");
    console.log(`🔹 JWT_SECRET Loaded: ${config.JWT_SECRET ? "✔️  Available" : "❌ Undefined"}`);

    const server = app.listen(config.PORT, () =>
      console.log(`🚀 Server running on port ${config.PORT}`)
    );

    // 🟢 Graceful Shutdown (Closes MongoDB Connection)
    process.on("SIGINT", async () => {
      console.log("\n🛑 Server shutting down...");
      await mongoose.connection.close();
      console.log("✅ MongoDB Disconnected");
      process.exit(0);
    });
  })
  .catch((err) => {
    console.error("❌ MongoDB Connection Error:", err);
    process.exit(1);
  });
