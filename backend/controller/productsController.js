import {getProductId,getProducts} from  '../model/productsModel.js'

const getProductIdCon = async (req,res) => {
    res.json({products:await getProductId(req.params.id)})
}

const getProductsCon = async (req,res) =>{
    res.json({products:await getProducts()})
}

export {getProductIdCon,getProductsCon}