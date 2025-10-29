import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import rootRouter from "./routes/index.js";
dotenv.config();

const app = express();

app.use(express.json());

app.use(cors({
    origin:'*',
    methods:['GET','PUT','POST','DELETE'],
    allowedHeaders:['Content-Type']
}))

const PORT = process.env.PORT;

app.use('/api',rootRouter)

app.listen(PORT,()=>{
    console.log(`Server listening on PORT no ${PORT}`)
})