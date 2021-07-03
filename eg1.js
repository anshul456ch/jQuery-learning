const express=require('express'); //object ka reference express mai aa gya

const app=express();//object bnaya



const port=3000;//bind at port to 3000

app.use(express.static("learn")); //isse hamne configure kra ki jb bhi static request aaye toh contents learn folder mai se server krre

//server ko ye configure kra ki agar request mai kisi resource ka naam na ho toh ye function chal jayega
app.get("/",function(request,response){

//agar request mai resource name na ho toh ek response bheja jaaye,response mai bola ki index.html ko request bheji jaye
response.redirect("/index.html"); 
});




//start the server
app.listen(port,function(error){
if(error) 
{
return console.log(`Some problem ${error}`); // agar error hai toh message print krwaya server pr
}


console.log(`Server is ready to accept request at port  ${port}`); //this means server is ready to accept request 
});