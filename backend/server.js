import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import banRoute from "./routes/banRoutes.js"
import merkRoute from "./routes/merkRoutes.js"
import stokRoute from "./routes/stokRoute.js"


dotenv.config()

const app = express()

app.use(cors())
app.use(express.json())
app.use(banRoute ,merkRoute, stokRoute)

const PORT = 5000
app.listen(PORT, () =>{
    console.log(`server berjalan di http://localhost:${PORT}`);
    
})