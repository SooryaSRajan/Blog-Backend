const express = require('express')
const app = express()
const PORT = process.env.PORT || 8000
const morgan = require('morgan')
const blogRoute = require("./routes/blog_route")

app.use(express.json())
app.use(express.urlencoded({extended: true}));
app.use(morgan(':method :url :status :res[content-length] - :response-time ms'))

require("./config/database_connection")();

app.get("/", (req, res) => {
    res.send(`Server running on port ${PORT}`)
})

app.use("/blog", blogRoute)

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
