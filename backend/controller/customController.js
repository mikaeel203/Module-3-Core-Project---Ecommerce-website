import {getCustomId,getCustoms,addCustom,deleteCustom} from  '../model/customModel.js'

const getCustomIdCon = async (req,res) => {
    res.json({custom:await getCustomId(req.params.id)})
}

const getCustomsCon = async (req,res) =>{
    res.json({customs:await getCustoms()})
}
const addCustomCon = async (req,res) => {
    let {product_id, color, wood_type, extra1, extra2}=req.body
    res.json({customs:await addCustom(product_id, color, wood_type, extra1, extra2)})
}
const deleteCustomCon = async (req,res) =>{
    res.json({customs:await deleteCustom(req.params.customize_id)})
}

export {getCustomIdCon,getCustomsCon,addCustomCon,deleteCustomCon}