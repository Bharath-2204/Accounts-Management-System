import React from "react";
import "./Navbar.css";
import Navbar from "./Navbar";
import Landingnavbar from "./Landingnavbar";
import "./Landingpage.css";
import {BrowserRouter, Route, Routes,Link} from "react-router-dom";

const Landingpage =()=>{
    return(
        
<div>
    <Landingnavbar/>
    <div class="header">S B CONSTRUCTIONS</div>
    <div class="reg"><img src="https://i.ibb.co/wdQ7Snf/register.jpg"></img></div>
    <div class="log"><img src="https://i.ibb.co/Nr5zV18/oq4-NHJy-V2-Dcq-JQGG4-Zy-TK-transformed-removebg-preview.jpg"></img></div>
    <div>
        <Link to="/register"><button class="regbtn">REGISTER</button></Link></div>
        <div>
        <Link to="/login"><button class="logbtn">LOG IN</button></Link></div>

{/* //         <div class="topnav">
//            <a class="active" href="#home">Home</a>
//   <a href="http://localhost:3000/register">Register</a>
//   <a href="http://localhost:3000/login">Sign In</a>
//   <a href="#about">About</a> 
//   <img src="https://i.ibb.co/Pg0TDMw/logo-1.png"/>
//   <div class="fixed">
//     <p><b>SB CONSTRUCTIONS</b></p>
//      </div>
//     </div> */}
    
       </div>
    );
};

export default Landingpage