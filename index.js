const express = require("express");
const app = express();

// Config
const PORT = process.env.PORT || 3000;

// Routes
app.get('/', (req, res) => {
    return res.send("The server is working fine...");
});

app.listen(PORT, () => {
    console.log(
        `Listening on port: ${PORT}\n\n
        Supported Methods: GET, POST, PUT, DELETE
        \n====== Routes ======\n
        /api/bugs\n
        /api/bug/:id\n
        `
    );
});