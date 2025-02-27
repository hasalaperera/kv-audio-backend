import mongoose  from "mongoose";

const productSchema = new mongoose.Schema({
    key: { type: String, required: true, unique: true},
    name: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, required:true, default: "uncategorized"},
    dimentions: {type: String, required: true},
    description: { type: String, required: true },
    availability: { type: Boolean, required: true, default: true},
    image: { type: [String], required: true, default: ["https://www.shutterstock.com/shutterstock/photos/1552421075/display_1500/stock-vector-missing-picture-page-for-website-design-or-mobile-app-design-no-image-available-icon-vector-1552421075.jpg"] },
})

const Product = mongoose.model("Product",productSchema)

export default Product