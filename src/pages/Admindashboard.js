import React from "react";

import Navbar from "./Navbar";
import "./Admindashboard.css"
import {useParams, Link} from "react-router-dom"

const Admindashboard =()=>{
    return(
         
<div >
    
    

    
    
    <div class="content">
    <div class="bimage"></div>
    <div class="clibox">
        <h1>CLIENT</h1>
    <Link to ="/clientdets">
            <button class="cli">ADD CLIENT</button>
        </Link>
    
        <Link to ="/clienttransac">
            <button class="clitran">TRANSACTION</button>
        </Link></div>
    <div class="addbox">
        <h1>ADD</h1>
        <Link to ="/addcontact">
            <button class="adc">TRANSACTION</button>
        </Link>
        <Link to ="/project">
            <button class="adp">PROJECT</button>
        </Link>
        <Link to="/department">
            <button class="add">DEPARTMENT</button>
        </Link>
        <Link to="/employeedets">
            <button class="empd">EMPLOYEE</button>
        </Link>
        
        </div>
        <div class="viewbox">
            <h1>VIEW</h1>
        <Link to ="/transactionview">
            <button class="vdc">TRANSACTION</button>
        </Link>
        <Link to ="/projectview">
            <button class="vdp">PROJECT</button>
        </Link>
        <Link to="/departmentview">
            <button class="vdd" >DEPARTMENT</button>
        </Link>
        <Link to="/employeeview">
            <button class="vempd">EMPLOYEE</button>
        </Link>
        
        </div>
        
        <div class="header">S B CONSTRUCTIONS</div>
        <Navbar/>
        </div>
        
        </div>
        
        
        
// {/* //         <div class="topnav">
// //            <a class="active" href="#home">Home</a>
// //   <a href="http://localhost:3000/register">Register</a>
// //   <a href="http://localhost:3000/login">Sign In</a>
// //   <a href="#about">About</a> 
// //   <img src="https://i.ibb.co/Pg0TDMw/logo-1.png"/>
// //   <div class="fixed">
// //     <p><b>SB CONSTRUCTIONS</b></p>
// //      </div>
// //     </div> */}
    
       
    );
};

export default Admindashboard