import app from "./src/app.js";
import connectDB from "./src/config/db.js";
import { connectRedis } from "./src/config/redis.js";
import { config } from "./src/config/config.js";

const PORT = config.PORT;

const startServer = async () => {
    try {
        await connectDB();
        await connectRedis();

        app.listen(PORT, () => {
            console.log(`Auth service listening on port ${PORT}`);
        });
    } catch (error) {
        console.error("Failed to start auth service:", error.message);
        process.exit(1);
    }
};

startServer();
