import express from 'express'
import cors from 'cors'
// import routes that we exported
import userRoutes from './routes/userRoutes.js';
import authenticateJWT from './middleware/authMiddleware.js'
const PORT = process.env.PORT ||3000
const app = express()
app.use(cors({
    origin:'http://localhost:8080'
}))
app.use(express.json())
// path , imported file
app.use('/users', userRoutes);


app.listen(PORT,()=>{
console.log('http://localhost:'+PORT);
})
