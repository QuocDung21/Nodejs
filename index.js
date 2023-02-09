const express = require("express")
const cors = require("cors")
const cookieParser = require("cookie-parser")
const dotenv = require("dotenv")
const mongoose = require("mongoose")
const school = require("./routes/school")
const user = require("./routes/user")
const PORT = process.env.PORT || 3000

const app = express()

dotenv.config()

mongoose.connect(process.env.MONGOSE_URL, () => {
    console.log("Connected to MongoDB")
})

app.use(cors())
app.use(cookieParser())
app.use(express.json())

app.use("/v1/school", school)
app.use("/v1/user", user)

app.listen(PORT, () => {
    console.log("Server is running port" + PORT)
})





