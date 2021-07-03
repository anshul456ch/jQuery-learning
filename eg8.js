const express=require('express'); //object ka reference express mai aa gya
const app=express();//object bnaya
const oracle=require('oracledb');//include oracledb module
const bodyParser=require('body-parser');//include body-parser module

const port=3000;//bind at port to 3000


const timePass=(ms)=>{
var promise=new Promise((resolve)=>{
setTimeout(resolve,ms);
});
return promise;
}




//agar extended ki value false hai toh query string module ka use  hoga
//agar extended ki value true hai toh qs module ka use hoga
const urlEncodedBodyParser=bodyParser.urlencoded({extended:false});





class Department
{
constructor(id,name)
{
this.id=id;
this.name=name;
}
getId()
{
return this.id;
}
getName()
{
return this.name;
}
}


class EmployeeDetail
{
constructor(id,email,phoneNumber,salary)
{
this.id=id;
this.email=email;
this.phoneNumber=phoneNumber;
this.salary=salary;
}
getId()
{
return this.id;
}
getEmail()
{
return this.email;
}
getPhoneNumber()
{
return this.phoneNumber;
}
getSalary()
{
return this.salary;
}
}

class Employee
{
constructor(id,firstName,lastName)
{
this.id=id;
this.firstName=firstName;
this.lastName=lastName;
}
getId()
{
return this.id;
}
getFirstName()
{
return this.firstName;
}
getLastName()
{
return this.lastName;
}
}


app.use(express.static("learn")); //isse hamne configure kra ki jb bhi static request aaye toh contents learn folder mai se server krre

//server ko ye configure kra ki agar request mai kisi resource ka naam na ho toh ye function chal jayega
app.get("/",function(request,response){

//agar request mai resource name na ho toh ek response bheja jaaye,response mai bola ki index.html ko request bheji jaye
response.redirect("/index.html"); 
});



app.get("/getFirstNames",urlEncodedBodyParser ,async function(request,response){
var connection=null;
connection=await oracle.getConnection({
"user":"hr",
"password":"hr",
"connectionString":"localhost:1521/xepdb1"
});

var firstNamePattern=request.query.firstNamePattern;
//console.log(firstNamePattern);


var resultSet=await connection.execute(`select distinct first_name from employees where lower(first_name) like '${firstNamePattern}%' order by first_name`);

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

app.get("/getEmployees",async function(request,response){
var connection=null;
connection=await oracle.getConnection({
"user":"hr",
"password":"hr",
"connectionString":"localhost:1521/xepdb1"
});
var resultSet=await connection.execute("select employee_id,first_name,last_name from employees order by first_name,last_name");
var emps=[];
var id,firstName,lastName;
var emp;
var i=0;
while(i<resultSet.rows.length)
{
id=resultSet.rows[i][0];
firstName=resultSet.rows[i][1];
lastName=resultSet.rows[i][2];
emp=new Employee(id,firstName,lastName);
emps.push(emp);
i++;
}
await connection.close();
response.send(emps);
});

app.get("/getDepartments",async function(request,response){
var connection=null;
connection=await oracle.getConnection({
"user":"hr",
"password":"hr",
"connectionString":"localhost:1521/xepdb1"
});
var resultSet=await connection.execute("select department_id,department_name from departments order by department_name");
var departments=[];
var department;
var id,name; 
var i=0;
while(i<resultSet.rows.length)
{
id=resultSet.rows[i][0];
name=resultSet.rows[i][1];
department=new Department(id,name);
departments.push(department);
i++;
}
await connection.close();
response.send(departments);
}); 




app.get("/getEmployeesByDepartment",urlEncodedBodyParser ,async function(request,response){
await timePass(6000);
var connection=null;
connection=await oracle.getConnection({
"user":"hr",
"password":"hr",
"connectionString":"localhost:1521/xepdb1"
});

var departmentId=parseInt(request.query.departmentId);

var resultSet=await connection.execute(`select employee_id,first_name,last_name from employees where department_id=${departmentId} order by first_name,last_name`);

if(resultSet.rows.length==0)
{
await connection.close();
response.send([]);
return;
}

var employees=[];
var employee,id,firstName,lastName;
var i=0;
while(i<resultSet.rows.length)
{
id=resultSet.rows[i][0];
firstName=resultSet.rows[i][1];
lastName=resultSet.rows[i][2];
employee=new Employee(id,firstName,lastName);
employees.push(employee);
i++;
}
await connection.close();
response.send(employees);
});

app.get("/getEmployeeDetails",urlEncodedBodyParser ,async function(request,response){
await timePass(6000);
var connection=null;
connection=await oracle.getConnection({
"user":"hr",
"password":"hr",
"connectionString":"localhost:1521/xepdb1"
});

var employeeId=parseInt(request.query.employeeId);

var resultSet=await connection.execute(`select employee_id,email,phone_number,salary from employees where employee_id=${employeeId} `);
var employeeDetail;
if(resultSet.rows.length==0)
{
await connection.close();
employeeDetail=new EmployeeDetail(employeeId,"","",0); 
return response.send(employeeDetail);
}

employeeDetail=new EmployeeDetail(resultSet.rows[0][0],resultSet.rows[0][1],resultSet.rows[0][2],resultSet.rows[0][3]);
await connection.close();
response.send(employeeDetail);
});


app.get("/addEmployee",function(request,response){
var employeeId=parseInt(request.query.employeeId);
var firstName=request.query.firstName;
var lastName=request.query.lastName;
var gender=request.query.gender;
var dateOfBirth=request.query.dateOfBirth;
var isIndian=request.query.isIndian;
var basicSalary=parseInt(request.query.basicSalary);

var html="<!DOCTYPE HTML>";
console.log(`Employee Id : ${employeeId}`);
console.log(`First Name : ${firstName}`);
console.log(`Last Name : ${lastName}`);
console.log(`Gender : ${gender}`);
console.log(`Date Of Birth : ${dateOfBirth}`);
console.log(`Is Indian : ${isIndian}`);
console.log(`Basic Salary : ${basicSalary}`);


html+="<html lang='en'>";
html+="<head>";
html+="<meta charset='utf-8'>";
html+="</head>";
html+="<body>";
html+="<b>Done</b>";
html+="<br/><br/>";
html+="<a href='/index.html'>Home</a>";
html+="</body>";
html+="</html>";
response.send(html);
});   


//start the server
app.listen(port,function(error){
if(error) 
{
return console.log(`Some problem ${error}`); // agar error hai toh message print krwaya server pr
}


console.log(`Server is ready to accept request at port  ${port}`); //this means server is ready to accept request 
});