// DEPENDENCIES
const app = require("./app")
const mongoose = require("mongoose");
require("dotenv").config();

// CONFIG
const PORT = process.env.PORT || 5000;

// MONGOOSE CONFIG
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

//* SERVER LINKED => DATABASE
mongoose.connection.once("open", () => {
    console.log("Connected to mongo");
});

// LISTEN
app.listen(PORT, () => {
    console.log(`Listening on PORT ${PORT}`);
});

