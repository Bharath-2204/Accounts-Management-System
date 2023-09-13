import React ,{useState, useEffect} from 'react';
import {useNavigate, useParams, Link} from 'react-router-dom';
import "./Addedit.css";
import axios from 'axios';
import {toast} from "react-toastify"

const initialState={
   Project_num:"",
   Project_name:""
};


const Department = () => {
    const [state, setState] = useState(initialState)

    const{Department_num, Department_name} = state;
    const navigate = useNavigate();

    // const {E_Id} = useParams();

    // useEffect(()=>{
    //     axios.get(`http://localhost:5000/api/get/${E_Id}`).then((resp)=>setState({...resp.data[0]}))
    // },[E_Id])

    const handleSubmit = (e) =>{
        e.preventDefault();
        if( !Department_num || !Department_name){
            toast.error("Please provide value into each input field")

        }else{
            
            axios.post("http://localhost:5000/api/department", {
                
                Department_num,
                Department_name
                
                   
            }).then(()=>{
                setState({Department_num:"", Department_name:""})
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
    <div><div class="bgc">
        <div class="dept">
        <form style={{margin:"auto",padding:"15px",maxWidth:"400px",alignContent:"center"}}onSubmit={handleSubmit}>
            <label htmlForm="number" style={{fontWeight:'bold',fontFamily:'bookman',fontSize:'25px',lineHeight:'30px'}}>Department Number</label>
            <input type="number"
            id="Department_num"
            name="Department_num"
            placeholder="Department Number"
            value={Department_num || ""}
            onChange={handleInputChange}/>

            <label htmlForm="number" style={{fontWeight:'bold',fontFamily:'bookman',fontSize:'25px',lineHeight:'30px'}}>Department Name</label>
            <input type="text"
            id="Department_name"
            name="Department_name"
            placeholder="Department Name"
            value={Department_name || ""}
            onChange={handleInputChange}/>

            

        <input type="submit" value="Save"/>
        <Link to="/admindashboard">
            <input type="button" value="Go Back"/>        </Link>
        </form>
        </div>
    </div>
    </div>
  )
}

export default Department