import {getProductId} from  '../model/productsModel.js'

const getProductIdCon = async (req,res) => {
    res.json({products:await getProductId(req.params.id)})
}

export {getProductIdCon}