import express from "express"
import cors from 'cors'
import RoomsRoutes from './routes/rooms.js'
import RoomTypes from './routes/roomTypes.js'
import Blacklist from './routes/blacklist.js'
import 'express-async-errors';
import errorHandler from "./middlewares/errorHandler.js";

const PORT = process.env.PORT || 3000
const app = express()

app.use(express.json())
app.use(cors({
    origin: "http://localhost:3000"
}))

app.use("/roomTypes", RoomTypes)
app.use("/room", RoomsRoutes)
app.use("/blacklist", Blacklist)

app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server runing on port ${PORT}`)
})