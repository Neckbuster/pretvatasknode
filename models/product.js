const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({

    product_name:String,
    lead_time:String,
    weight_gsm:String,
    quantity:String,
    price_rs:String,
    buyer_name:String
    
});

const Product = mongoose.model("Product", ProductSchema,'product_data');
module.exports = Product;