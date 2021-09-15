const express = require("express")
const app = express();
const PORT = 3000;

app.use(express.static('public'))
app.set("view engine","ejs")
app.use(express.urlencoded({ extended: true }))

//model middleware
const Document= require("./models/Document")
const mongoose = require("mongoose")
mongoose.connect()

app.get("/",(req,res)=>{
    const code = `Welcome to YourBin`
    res.render('code-display' , {code,language:"plaintext"})
})

app.get("/new",(req,res)=>{
    res.render('new')
})

app.post("/save" , async(req,res)=>{
    const value = req.body.value;
    try{
        const document = await Document.create({value})
        res.redirect(`/${document.id}`)

    }catch(e){
        res.render("new",{value})
    }
})

app.listen(PORT , ()=>{
    console.log(`server started at localhost:${PORT}`)
})