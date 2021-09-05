const express = require("express")
const app = express();
const PORT = 3000;

app.use(express.static('styles'))
app.set("view engine","ejs")


app.get("/",(req,res)=>{
    const code = `This is the code now on you can add whatecer you want \nhello
    now whahrk adjdfsf`
    res.render('code-display' , {code})
})

app.get("/new",(req,res)=>{
    res.send("new page")
})

app.listen(PORT , ()=>{
    console.log(`server started at localhost:${PORT}`)
})