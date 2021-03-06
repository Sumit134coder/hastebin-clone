const express = require("express")
const app = express();
const PORT = 3000;

app.use(express.static('public'))
app.set("view engine","ejs")
app.use(express.urlencoded({ extended: true }))

//model middleware
const Document= require("./models/Document")
const mongoose = require("mongoose")
mongoose.connect("mongodb+srv://<username>:<password>@cluster0.p22zb.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",{ useUnifiedTopology: true,
useNewUrlParser: true,},()=>{
    console.log("database connected")
})

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

app.get("/:id/duplicate" , async(req,res)=>{
    const id = req.params.id;
    try{
        const document = await Document.findById(id)
        res.render("new", {value:document.value})
    }catch(e){
        res.redirect(`/${id}`)

    }
})

app.get("/:id" , async (req,res)=>{
    const id = req.params.id;
    try{
        const document =await Document.findById(id)
        res.render("code-display" , {code:document.value , id})
    }catch(e){
        res.redirect("/")

    }
})


app.listen(PORT , ()=>{
    console.log(`server started at localhost:${PORT}`)
})