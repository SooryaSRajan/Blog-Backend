const express = require('express')
const app = express()
const PORT = process.env.PORT || 8000
const morgan = require('morgan')

app.use(express.json())
app.use(express.urlencoded({extended: true}));
app.use(morgan(':method :url :status :res[content-length] - :response-time ms'))

require("./config/database_connection")();

app.get("/", (req, res) => {

    res.send(`Server running on port ${PORT}`)
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
