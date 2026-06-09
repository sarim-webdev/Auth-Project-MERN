import dotenv from "dotenv"
import { connectDb } from "./src/db/db.js"
import { app } from "./src/app.js"

dotenv.config()

const PORT = process.env.PORT

app.listen(PORT, () => {
    console.log(`Server is listening on ${PORT}`)
    connectDb()
})