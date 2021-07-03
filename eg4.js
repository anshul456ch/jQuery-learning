const express=require('express'); //object ka reference express mai aa gya

const app=express();//object bnaya

const oracle=require('oracledb');

const port=3000;//bind at port to 3000

app.use(express.static("learn")); //isse hamne configure kra ki jb bhi static request aaye toh contents learn folder mai se server krre

//server ko ye configure kra ki agar request mai kisi resource ka naam na ho toh ye function chal jayega
app.get("/",function(request,response){

//agar request mai resource name na ho toh ek response bheja jaaye,response mai bola ki index.html ko request bheji jaye
response.redirect("/index.html"); 
});



app.get("/getFirstNames",async function(request,response){
var connection=null;
connection=await oracle.getConnection({
"user":"hr",
"password":"hr",
"connectionString":"localhost:1521/xepdb1"
});
var resultSet=await connection.execute("select first_name from employees where first_name like 'A%' order by first_name");
var firstName;
var firstNames=[];
var i=0;
while(i<resultSet.rows.length)
{
firstName=resultSet.rows[i][0];
firstNames.push(firstName);
i++;
}
await connection.close();
response.send(firstNames);
});



 

//start the server
app.listen(port,function(error){
if(error) 
{
return console.log(`Some problem ${error}`); // agar error hai toh message print krwaya server pr
}


console.log(`Server is ready to accept request at port  ${port}`); //this means server is ready to accept request 
});