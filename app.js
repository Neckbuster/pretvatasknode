var express = require('express')
var mongoose = require('mongoose')
var products = require('./models/product');
let app = express();
let port_number = 5000;

mongoose.connect('mongodb+srv://Niket:Niket99@cluster0.b2bda.mongodb.net/Pretva?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true});


// TASK 1 BEGINS
app.get('/getProductByBuyer',(req,res)=>{
    let buyer_name = req.query['buyer'];

    if (buyer_name == undefined){
        res.status(400).json({"msg":"Improper buyer name format"});
        return;
    }

    buyer_name = buyer_name.charAt(0).toUpperCase()+buyer_name.slice(1);
    products.find({'buyer_name':buyer_name},(err,output)=>{
        if(err)
        res.status(500).send("Internal err")
        else
        res.send(output);
    })
})

app.get('/applyProductFilter',(req,res)=>{

    filters=req.query;

    if(filters['product_name']!= undefined){
        filters['product_name'] = filters['product_name'].charAt(0).toUpperCase()+filters['product_name'].slice(1);
    }

    products.find(filters,(err,prods)=>{
        if(err)
        res.status(500).send("Internal err")
        else
        res.send(prods);
    })
})

// TASK 1 ENDS


// ADDITIONAL APIS FOR SUPPORT

app.get('/getAllProductNames',(req,res)=> {
    products.find().distinct('product_name',(err,values)=>{
        if(err){
            res.status(500).send("Internal Err")
        }
        else{
            res.send(values)
        }
    })
})

app.get('/getAllLeadTime',(req,res)=> {
    products.find().distinct('lead_time',(err,values)=>{
        if(err){
            res.status(500).send("Internal Err")
        }
        else{
            res.send(values)
        }
    })
})

app.get('/getAllWeightGsm',(req,res)=> {
    products.find().distinct('weight_gsm',(err,values)=>{
        if(err){
            res.status(500).send("Internal Err")
        }
        else{
            res.send(values)
        }
    })
})

app.get('/getAllQuantity',(req,res)=> {
    products.find().distinct('quantity',(err,values)=>{
        if(err){
            res.status(500).send("Internal Err")
        }
        else{
            res.send(values)
        }
    })
})

app.get('/getAllPrices',(req,res)=> {
    products.find().distinct('price_rs',(err,values)=>{
        if(err){
            res.status(500).send("Internal Err")
        }
        else{
            res.send(values)
        }
    })
})

app.listen(port_number,()=>{
    console.log(`Server has started at port ${port_number}`)
})