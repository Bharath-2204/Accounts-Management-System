import React ,{useState, useEffect} from 'react';
import {useNavigate, useParams, Link} from 'react-router-dom';
import "./Addedit.css";
import axios from 'axios';
import {toast} from "react-toastify"

const initialState={
    E_Id:"",
    email:"",
    password:"",
    };



const Login = () => {
    //const [state, setState] = useState(initialState)
    const[E_Id, setuserid]=useState("")
    const[email,setemail] = useState("")
    const[password, setpassword] = useState("")
    const[loginstatus, setloginstatus]=useState("")
    const navigate = useNavigate();


    // const [data, setData]= useState([]);

    // const loadData = async() => {
    //     const response = await axios.get("http://localhost:5000/api/get");
    //     setData(response.data);

    // };
    // useEffect(()=>{
    //     loadData();

    // }, [])
    

    // useEffect(()=>{
    //     axios.get(`http://localhost:5000/api/get/${id}`).then((resp)=>setState({...resp.data[0]}))
    // },[id])

    const handleSubmit = (e) =>{
        e.preventDefault();
        if(!E_Id || !email || !password){
            toast.error("Please provide value into each input field")

        }
        else if(E_Id === "88" & email === "admin@gmail.com" )
        {
            navigate("/admindashboard")
        }



        else{
            
            axios.post("http://localhost:5000/api/login", {
                E_Id:E_Id,
                email:email,
                password:password
            
            }).then((response)=>{
                if(response.data.message){
                    setloginstatus(response.data.message)
                }
                else{
                 navigate(`/UserDashboard/${E_Id}`)   
                }

                
            });
        } 
    }

  
  return (
    <div style={{marginTop:"100px"}}>
        <div class="bgimage"></div>
        <div class="login">
        <form style={{margin:"auto",padding:"15px",maxWidth:"400px",alignContent:"center"}}onSubmit={handleSubmit}>
            <label htmlForm="number" style={{fontWeight:'bold',fontFamily:'bookman',fontSize:'25px',lineHeight:'30px'}}>Userid</label>
            <input type="number"
            id="E_Id"
            name="E_Id"
            placeholder="Your user id"
            value={E_Id || ""}
            onChange={(e)=>{setuserid(e.target.value)}}/>

            <label htmlForm="email" style={{fontWeight:'bold',fontFamily:'bookman',fontSize:'25px',lineHeight:'30px'}}>Email</label>
            <input type="email"
            id="email"
            name="email"
            placeholder="Your email"
            value={email || ""}
            onChange={(e)=>{setemail(e.target.value)}}/>

            <label htmlForm="text" style={{fontWeight:'bold',fontFamily:'bookman',fontSize:'25px',lineHeight:'30px'}}>Password</label>
            <input type="password" class="passwordd"
            id="password"
            name="password"
            placeholder=""
            value={password || ""}
            onChange={(e)=>{setpassword(e.target.value)}}/>

            

        
            <div class="submitt">
            <input type="submit" onClick={Login}/>
                   <Link to="/landingpage">
                   <input type="button" value="Go Back"/></Link> </div>
        </form>
        </div>
        <h1>{loginstatus}</h1>
    </div>
  )
  }

export default Login