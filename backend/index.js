import express from 'express'
import cors from 'cors'
// import routes that we exported
import productRoutes from './routes/productsRoutes.js'
import customRoutes from './routes/customRoutes.js'
const PORT = process.env.PORT ||3000
const app = express()
app.use(cors({
    origin:'http://localhost:8080'
}))
app.use(express.json())
// path , imported file
// app.use('/users', userRoutes);
app.use('/products', productRoutes);
app.use('/custom',customRoutes);


app.listen(PORT,()=>{
console.log('http://localhost:'+PORT);
})
