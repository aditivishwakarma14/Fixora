import app from "./src/app.js";
import { config } from "./src/config/config.js";

const PORT = config.PORT;

app.listen(PORT, () => {
    console.log(`API gateway listening on port ${PORT}`);
});
