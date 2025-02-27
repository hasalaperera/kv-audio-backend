import Product from "../models/product.js";
import { isITAdmin } from "./userController.js";

export async function addProduct(req, res) {
  // to check is thare any user
  if (req.user == null) {
    res.status(401).json({
      message: "You must be logged in to add a product",
    });
    return;
  }
  // to check if the user is admin
  if (req.user.role != "admin") {
    res.status(403).json({
      message: "You are not authorized to perform this action",
    });
    return;
  }

  // to check if the product is valid
  const data = req.body;
  const newProduct = new Product(data);
  try {
    await newProduct.save();
    res.json({ message: "Product added successfully" });
  } catch (error) {
    res.status(500).json({ error: "Product addition failed" });
  }
}

export async function getProducts(req, res) {
  try {
    if (isITAdmin(req)) {
      const products = await Product.find();
      res.json(products);
      return;
    } else {
      const products = await Product.find({ availability: true });
      res.json(products);
      return;
    }
  } catch (e) {
    res.status(500).json({
      message: "Failed to get products",
    });
  }
}

export async function updateProduct(req, res) {
  try {
    if (isITAdmin(req)) {

        const key = req.params.key;

        const data = req.body

        await Product.updateOne({key:key},data)

        res.json({
            message: "Product updated successfully",
        })
        return;

    } else {
      res.status(403).json({
        message: "You are not authorized to perform this action",
      });
      return;
    }
  } catch (e) {
    res.status(500).json({
      message: "Failed to update product",
    });
  }
}
