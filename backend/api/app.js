const express = require('express');
const app = express()
const mongoose = require("./database/mongoose")

app.use((req,res,next)=>{
    res.header("Access-Controle-Allow-Origin", "*");
    res.header("Access-Controle-Allow-Methods", "GET, POST, HEAD, OPTIONS, PUT, PATCH, DELETE");
    res.header("Access-Controle-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
})
app.use(express.json());
app.listen((3000,()=>console.log("app is working")));