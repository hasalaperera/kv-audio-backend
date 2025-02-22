import Product from "../models/product.js";

export function addProduct(req,res){
    console.log(req.user)

    // to check is thare any user
    if(req.user == null){
        res.status(401).json({
            message: "You must be logged in to add a product"
        })
        return
    }
    // to check if the user is admin
    if(req.user.role != "admin"){
        res.status(403).json({
        message : "You are not authorized to perform this action"
    })
    return
    }

    // to check if the product is valid
    const data = req.body
    const newProduct = new Product(data)
    newProduct.save()
    .then(()=>{
        res.json({message:"Product added successfully"})
    })
    .catch((error)=>{
        res.status(500).json({error:"Product addition failed"})
    })
}