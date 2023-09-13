const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const mysql = require("mysql2");

const db = mysql.createPool({
    host: "localhost",
    user:"root",
    password:"bharath",
    database:"crud_content",
    multipleStatements:true
});

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get("/api/get",(req,res)=>{
    const sqlGet = "SELECT * FROM employee_db";
    db.query(sqlGet,(err,result)=>
    {
        res.send(result) 
        console.log("error",err);

    })
})

// app.get("/api/login",(req,res)=>{
//     const sqlGet = "SELECT * FROM logreg";
//     db.query(sqlGet,(err,result)=>
//     {
//         res.send(result) 
//         console.log("error",err);

//     })
// })

app.post("/api/post", (req,res)=>{
    const {E_Id, Project_no,Total_amt_paid, Transaction_Id, Amount_paid,Date_of_Transaction} = req.body;
    const sqlInsert =  "INSERT INTO employee_db (E_Id,Project_no,Total_amt_paid,Transaction_Id,Amount_paid,Date_of_Transaction) VALUES (?, ?, ?, ?,?,?)";
    db.query(sqlInsert,[E_Id, Project_no,Total_amt_paid, Transaction_Id, Amount_paid,Date_of_Transaction],(err,result)=>{
        if(err){
            console.log(err);
        }
    })
})


app.post("/api/clientdets", (req,res)=>{
    const {Project_num,Project_name,Project_loc,Client_name,Start_date} = req.body;
    const sqlInsert =  "INSERT INTO client_dets (Project_num,Project_name,Project_loc,Client_name,Start_date) VALUES (?, ?, ?, ?,?)";
    db.query(sqlInsert,[Project_num,Project_name,Project_loc,Client_name,Start_date],(err,result)=>{
        if(err){
            console.log(err);
        }
    })
})

app.post("/api/project", (req,res)=>{
    const { Project_num, Project_name, Project_loc, Project_startdate} = req.body;
    const sqlInsert =  "INSERT INTO project (Project_num,Project_name,Project_loc,Project_startdate) VALUES (?,?,?,?)";
    db.query(sqlInsert,[ Project_num, Project_name,Project_loc,Project_startdate],(err,result)=>{
        if(err){
            console.log(err);
        }
    })
})

app.post("/api/department", (req,res)=>{
    const { Department_num, Department_name} = req.body;
    const sqlInsert =  "INSERT INTO department (Department_num,Department_name) VALUES (?, ?)";
    db.query(sqlInsert,[ Department_num, Department_name],(err,result)=>{
        if(err){
            console.log(err);
        }
    })
})

app.post("/api/employeedets", (req,res)=>{
    const { First_name, Last_name, E_id, Mobile_no,Department_name} = req.body;
    const sqlInsert =  "INSERT INTO employee_details (First_name,Last_name,E_id,Mobile_no,Department_name) VALUES (?, ?,?,?,?)";
    db.query(sqlInsert,[ First_name, Last_name, E_id, Mobile_no,Department_name],(err,result)=>{
        if(err){
            console.log(err);
        }
    })
})

app.post("/api/clienttran", (req,res)=>{
    const {Project_num,Total_amount,Amount_received,Transaction_id,Date_of_transaction} = req.body;
    const sqlInsert =  "INSERT INTO client_tran_db (Project_num,Total_amount,Amount_received,Transaction_id,Date_of_transaction) VALUES (?,?,?,?,?)";
    db.query(sqlInsert,[Project_num,Total_amount,Amount_received,Transaction_id,Date_of_transaction],(err,result)=>{
        if(err){
            console.log(err);
        }
    })
})

app.delete("/api/remove/:E_Id", (req,res)=>{
    const {E_Id} = req.params;
    const sqlRemove =  "DELETE FROM employee_details WHERE E_Id = ?";
    db.query(sqlRemove,E_Id,(err,result)=>{
        if(err){
            console.log(err);
        }
    });
});


app.get("/api/clientbalance",(req,res)=>{ 
    const sqlGet = "select total_balance(sum(Total_amount),sum(Amount_received)) as balance from client_tran_log";
    db.query(sqlGet,(err,result)=>
    {
        if(err){
            console.log(err);
        }
        res.send(result) 
        

    })
}) 

app.get("/api/get/:E_Id",(req,res)=>{
    const {E_Id} = req.params; 
    const sqlGet = "SELECT * FROM employee_db where E_Id = ?";
    db.query(sqlGet,E_Id,(err,result)=>
    {
        if(err){
            console.log(err);
        }
        res.send(result) 
        

    })
}) 


app.get("/api/usrproj/:E_Id",(req,res)=>{
    const {E_Id} = req.params; 
    const sqlGet = "select project_name,project_no from employee_db join project on Project_no=Project_num where E_Id=?";
    db.query(sqlGet,E_Id,(err,result)=>
    {
        if(err){
            console.log(err);
        }
        res.send(result) 
    })
}) 

app.get("/api/usrbal/:E_Id",(req,res)=>{
    const {E_Id} = req.params; 
    const sqlGet = "select project_no,((Total_amt_paid)-sum(Amount_paid)) as balance from transaction_dets where E_Id=? group by project_no";
    db.query(sqlGet,E_Id,(err,result)=>
    {
        if(err){
            console.log(err);
        }
        res.send(result) 
    })
}) 

app.get("/api/get/:Project_num",(req,res)=>{
    const {E_Id} = req.params; 
    const sqlGet = "SELECT * FROM client_dets where Project_num = ?";
    db.query(sqlGet,E_Id,(err,result)=>
    {
        if(err){
            console.log(err);
        }
        res.send(result) 
        

    })
}) 

app.get("/api/departmentdetails",(req,res)=>{
    
    var sqlGetdep = "SELECT * FROM department";
    db.query(sqlGetdep,(err,result)=>
    {
        if(err){
            console.log(err);
        }
        res.send(result) 
        

    })
    
}) 

app.get("/api/transactiondetails",(req,res)=>{
    
    var sqlGetdep = "call transactiondetails()";
    db.query(sqlGetdep,(err,result)=>
    {
        if(err){
            console.log(err);
        }
        res.send(result[0]) 
        

    })
    
}) 

app.get("/api/clientdetails",(req,res)=>{
    var sqlGetdep = "select Project_num,Project_loc,Project_name,Client_name,Start_date,((Total_amount)-sum(Amount_received)) as balance from client_dets natural join client_tran_log group by Project_num";
    db.query(sqlGetdep,(err,result)=>
    {
        if(err){
            console.log(err);
        }
        res.send(result) 
    })
}) 

app.get("/api/clienttranlog",(req,res)=>{
    
    var sqlGetdep = "SELECT * FROM client_tran_log";
    db.query(sqlGetdep,(err,result)=>
    {
        if(err){
            console.log(err);
        }
        res.send(result) 
        

    })
    
}) 

app.get("/api/transactionlog",(req,res)=>{
    
    var sqlGetdep = "SELECT * FROM transaction_dets";
    db.query(sqlGetdep,(err,result)=>
    {
        if(err){
            console.log(err);
        }
        res.send(result) 
        

    })
    
}) 


app.get("/api/usrtransac/:E_Id",(req,res)=>{
    const {E_Id}=req.params
    var sqlGetdep = "SELECT * FROM transaction_dets where E_Id=?";
    db.query(sqlGetdep,E_Id,(err,result)=>
    {
        if(err){
            console.log(err);
        }
        res.send(result) 
        

    })
    
}) 

app.get("/api/projlog",(req,res)=>{
    
    var sqlGetdep = "select Project_no,count(*) as number from employee_db group by Project_no";
    db.query(sqlGetdep,(err,result)=>
    {
        if(err){
            console.log(err);
        }
        res.send(result) 
        

    })
    
}) 

app.get("/api/deplog",(req,res)=>{
    
    var sqlGetdep = "call department_count();select * from depcount";
    

    db.query(sqlGetdep,(err,result)=>
    {
        if(err){
            console.log(err);
        }
        
        res.send(result[1]) 
        

    })
    
}) 


app.get("/api/deptran",(req,res)=>{
    var sqlGetdep = "select Department_name,Project_no,sum(Total_amt_paid)as Totalamt_to_be_paid ,(sum(Total_amt_paid) - Sum(Amount_paid)) as balance from employee_details natural join transaction_dets group by Department_name,Project_no;";
    db.query(sqlGetdep,(err,result)=>
    {
        if(err){
            console.log(err);
        }
        res.send(result) 
    })
}) 

app.get("/api/projectdetails",(req,res)=>{
    
    var sqlGetdep = "SELECT Project_num,Project_name,Project_loc,Project_startdate FROM project";
    db.query(sqlGetdep,(err,result)=>
    {
        if(err){
            console.log(err);
        }
        res.send(result) 
        

    })
    
}) 

app.get("/api/employeedetails",(req,res)=>{
    
    var sqlGetdep = "SELECT * FROM employee_details";
    db.query(sqlGetdep,(err,result)=>
    {
        if(err){
            console.log(err);
        }
        res.send(result) 
        

    })
    
})

app.get("/api/UserDashboard/:E_Id",(req,res)=>{
    const {E_Id} = req.params; 
    const sqlusrget = "SELECT * from employee_details where E_Id = ?";
    db.query(sqlusrget,E_Id,(err,result)=>
    {
        if(err){
            console.log(err);
        }
        res.send(result) 
        

    })
}) 



app.put("/api/update/:E_Id/:Project_no",(req,res)=>{
    const {E_Id,Project_no} = req.params; 
    const{Transaction_Id, Amount_paid,Date_of_Transaction} = req.body;
    const sqlUpdate = "UPDATE employee_db  SET Transaction_Id = ?, Amount_paid = ?,Date_of_Transaction = ?  where E_Id = ? and Project_no =?";
    db.query(sqlUpdate,[Transaction_Id, Amount_paid,Date_of_Transaction,E_Id,Project_no],(err,result)=>
    {
        if(err){
            console.log(err);
        }
        res.send(result)
        

    })})


app.put("/api/updateclienttransac/:Project_num",(req,res)=>{
        const {Project_num} = req.params; 
        const{ Amount_received,Transaction_id,Date_of_transaction} = req.body;
        const sqlUpdate = "UPDATE client_tran_db  SET Amount_received = ?,Transaction_id = ?,Date_of_Transaction = ?  where Project_num =?";
        db.query(sqlUpdate,[Amount_received,Transaction_id,Date_of_transaction,Project_num],(err,result)=>
        {
            if(err){
                console.log(err);
            }
            res.send(result)
            
    
        })})



 

app.get("/api/balance/:E_Id",(req,res)=>{
    const {E_Id} = req.params; 
    const sqlUpdate = "select Project_no, (Total_amt_paid - Sum(Amount_paid)) as balance from transaction_dets where E_Id= ? group by Project_no";
    db.query(sqlUpdate,E_Id,(err,result)=>
    {
        if(err){
            console.log(err);
        }
        res.send(result) 
    })
})

app.get("/api/trans/:E_Id",(req,res)=>{
    const {E_Id} = req.params; 
    const sqlUpdate = "select Project_no,Amount_paid,Date_of_Transaction from transaction_dets where E_Id= ? and Amount_paid>0";
    db.query(sqlUpdate,E_Id,(err,result)=>
    {
        if(err){
            console.log(err);
        }
        res.send(result) 
        

    })
})

app.get("/",(req,res) => {
    // const sqlInsert = "INSERT INTO employee_db (name,email,mobile_no) VALUES('john','john@gmail.com',7678686)";
    // db.query(sqlInsert,(err,result)=>{
    //     console.log("error",err);
    //     console.log("result",result);
    //     res.send("Hello express");
    // })
    
})

app.post("/api/login",(req,res)=>
{
    const {E_Id, email, password} = req.body;
    
    
    const sqllogin = "SELECT * FROM logreg WHERE E_Id = ? AND email = ? AND password = ?";
    db.query(sqllogin,[E_Id,email,password],(err,result)=>{
        if (err)
        {res.send(err)
        }
        else{
        if (result.length>0){
        res.send(result);}
    else{
        res.send({message:"wrong cred"});
    }}})
    })


app.post("/api/register",(req,res)=>
{
    const {E_Id, email, password} = req.body;
    
    const sqlreg = "INSERT INTO logreg (E_Id, email, password) VALUES (? ,? ,?)";
    db.query(sqlreg,[E_Id,email,password],(err,result)=>{
        if (err){console.log(err)
        }
        
    })   
})

app.listen(5000, ()=>{
    console.log("Server is running on port 5000");
})