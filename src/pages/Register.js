import React ,{useState} from 'react';
import {useNavigate, Link} from 'react-router-dom';
import "./Register.css";
import axios from 'axios';
import {toast} from "react-toastify"

const initialState={
    E_Id:"",
    email:"",
    password:"",
    };


const Register = () => {
    const [state, setState] = useState(initialState)

    const{E_Id, email, password,conpassword} = state;
    const navigate = useNavigate();

    

    

    const handleSubmit = (e) =>{
        e.preventDefault();
        if(!E_Id || !email || !password ){
            toast.error("Please provide value into each input field")

        }
        else if(password!==conpassword){
            toast.error("Password not matching")
    
        }
        
        
        else{
            
            axios.post("http://localhost:5000/api/register", {
                E_Id,
                email,
                password
            }).then(()=>{
                setState({E_Id:"", email:"", password:""})
            }).catch((err)=>toast.error(err.response.data));
            toast.success("Registered Successfully");
            setTimeout(()=>
            
                navigate("/login")
            , 500)
            
        } 

        }
    

    const handleInputChange = (e) =>
    {
        const{name, value} = e.target;
        setState({...state, [name]: value});

    }

    const handleclick = (e)=>{
        this.setState({color:"red"})
    }
  return (
    
    <div style={{marginTop:"100px"}}>
        
        <div class="bgm"></div>
        
        <div class="bg-image"></div>
        
        <div class="box">
        <div class="register">
        <form style={{padding:"15px",maxWidth:"400px",float:"left"}}onSubmit={handleSubmit}>
            <label htmlForm="number" style={{fontWeight:'bold',fontFamily:'bookman',fontSize:'25px',lineHeight:'30px'}} >Userid</label>
            <input type="number"
            id="E_Id"
            name="E_Id"
            placeholder="Enter your user id"
            value={E_Id || ""}
            onClick={handleclick}
            onChange={handleInputChange}

            />

            <label htmlForm="email" style={{fontWeight:'bold',fontFamily:'bookman',fontSize:'25px',lineHeight:'30px'}}>Email</label>
            <input type="email"
            id="email"
            name="email"
            placeholder="Enter your email"
            value={email || ""}
            onChange={handleInputChange}/>

            <label htmlForm="text" style={{fontWeight:'bold',fontFamily:'bookman',fontSize:'25px',lineHeight:'30px'}}>Password</label>
            <input type="password" class="passwordd"
            id="password"
            name="password"
            placeholder=""
            value={password || ""}
            onChange={handleInputChange}/>
            <div class="cpass">
            <label htmlForm="text" style={{fontWeight:'bold',fontFamily:'bookman',fontSize:'25px',lineHeight:'30px'}}>Confirm Password</label></div>
            <input type="password" class="conpassword"
            id="conpassword"
            name="conpassword"
            placeholder=""
            value={conpassword || ""}
            onChange={handleInputChange}/>

            

        <div class="submit">
        
        <input type="submit" />
       
       <Link to="/landingpage">
       <input type="button" value="Go Back"/>
       </Link></div>
        </form>
        </div>
      </div>  </div>
    
  )
}

export default Register