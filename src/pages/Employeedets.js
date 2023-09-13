import React ,{useState, useEffect} from 'react';
import {useNavigate, useParams, Link} from 'react-router-dom';
import "./Addedit.css";
import axios from 'axios';
import {toast} from "react-toastify"

const initialState={
   
};


const Department = () => {
    const [state, setState] = useState(initialState)

    const{First_name, Last_name, E_id, Mobile_no,Department_name} = state;
    const navigate = useNavigate();

    // const {E_Id} = useParams();

    // useEffect(()=>{
    //     axios.get(`http://localhost:5000/api/get/${E_Id}`).then((resp)=>setState({...resp.data[0]}))
    // },[E_Id])

    const handleSubmit = (e) =>{
        e.preventDefault();
        if( !First_name || !Last_name || !E_id || !Mobile_no || !Department_name){
            toast.error("Please provide value into each input field")

        }else{
            
            axios.post("http://localhost:5000/api/employeedets", {
                
                First_name,
                Last_name,
                E_id,
                Mobile_no,
                Department_name
                
                   
            }).then(()=>{
                setState({First_name:"", Last_name:"", E_id:"", Mobile_no:"",Department_name:""})
            }).catch((err)=>toast.error(err.response.data));
            toast.success("Record added");
            setTimeout(()=>
            
                navigate("/admindashboard")
            , 500)
            
        } 
    }

    const handleInputChange = (e) =>
    {
        const{name, value} = e.target;
        setState({...state, [name]: value});
    }
  return (
    <div style={{marginTop:"100px"}}>
        <div class="empdet">
        <form style={{margin:"auto",padding:"15px",maxWidth:"400px",alignContent:"center"}}onSubmit={handleSubmit}>
            <label htmlForm="name" style={{fontWeight:'bold',fontFamily:'bookman',fontSize:'25px',lineHeight:'30px'}}>First Name</label>
            <input type="text"
            id="First_name"
            name="First_name"
            placeholder=""
            value={First_name || ""}
            onChange={handleInputChange}/>

            <label htmlForm="number" style={{fontWeight:'bold',fontFamily:'bookman',fontSize:'25px',lineHeight:'30px'}}>Last Name</label>
            <input type="text"
            id="Last_name"
            name="Last_name"
            placeholder=""
            value={Last_name || ""}
            onChange={handleInputChange}/>

            <label htmlForm="number" style={{fontWeight:'bold',fontFamily:'bookman',fontSize:'25px',lineHeight:'30px'}}>Employee Id</label>
            <input type="number"
            id="E_id"
            name="E_id"
            placeholder=""
            value={E_id || ""}
            onChange={handleInputChange}/>

            <label htmlForm="number" style={{fontWeight:'bold',fontFamily:'bookman',fontSize:'25px',lineHeight:'30px'}}>Mobile Number</label>
            <input type="number"
            id="Mobile_no"
            name="Mobile_no"
            placeholder=""
            value={Mobile_no || ""}
            onChange={handleInputChange}/>

            <label htmlForm="text" style={{fontWeight:'bold',fontFamily:'bookman',fontSize:'25px',lineHeight:'30px'}}>Department Name</label>
            <input type="text"
            id="Department_name"
            name="Department_name"
            placeholder=""
            value={Department_name || ""}
            onChange={handleInputChange}/>

            

        <input type="submit" value="Save"/>
        <Link to="/admindashboard">
            <input type="button" value="Go Back"/>        </Link>
        </form>
        </div>
    </div>
  )
}

export default Department