
import express from "express"
import projectRoute from "./routes/projectRoute.js"
import taskRoute from "./routes/taskRoute.js"
import userRoute from "./routes/userRoute.js"
import commentRoute from "./routes/commentRoute.js" 

import dotenv from 'dotenv';

dotenv.config()

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use("/api", projectRoute)  
app.use("/api", taskRoute)     
app.use("/api", userRoute)     
app.use("/api", commentRoute)  

app.use('/',(req,res)=>{
  res.status(404).json({mesage:'Page Not Found'})
})

const port = process.env.PORT || 3000

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})

