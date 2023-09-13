import React ,{useState, useEffect} from 'react';
import {useNavigate, useParams, Link} from 'react-router-dom';
import "./Addedit.css";
import axios from 'axios';
import {toast} from "react-toastify"

const initialState={
   Project_num:"",
   Project_name:"",
   Project_loc:"",
   Project_startdate:""
};


const Project = () => {
    const [state, setState] = useState(initialState)

    const{Project_num, Project_name,Project_loc,Project_startdate} = state;
    const navigate = useNavigate();

    // const {E_Id} = useParams();

    // useEffect(()=>{
    //     axios.get(`http://localhost:5000/api/get/${E_Id}`).then((resp)=>setState({...resp.data[0]}))
    // },[E_Id])

    const handleSubmit = (e) =>{
        e.preventDefault();
        if( !Project_num || !Project_name || !Project_loc || !Project_startdate){
            toast.error("Please provide value into each input field")

        }else{
            
            axios.post("http://localhost:5000/api/project", {
                
                Project_num,
                Project_name,
                Project_loc,
                Project_startdate
                
                   
            }).then(()=>{
                setState({Project_num:"", Project_name:"", Project_loc:"", Project_startdate:""})
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
        <div class="proj">
        <form style={{margin:"auto",padding:"15px",maxWidth:"400px",alignContent:"center"}}onSubmit={handleSubmit}>
            <label htmlForm="number" style={{fontWeight:'bold',fontFamily:'bookman',fontSize:'25px',lineHeight:'30px'}}>Project Number</label>
            <input type="number"
            id="Project_num"
            name="Project_num"
            placeholder="Project Number"
            value={Project_num || ""}
            onChange={handleInputChange}/>

            <label htmlForm="number" style={{fontWeight:'bold',fontFamily:'bookman',fontSize:'25px',lineHeight:'30px'}}>Project Name</label>
            <input type="text"
            id="Project_name"
            name="Project_name"
            placeholder="Project Name"
            value={Project_name || ""}
            onChange={handleInputChange}/>

            <label htmlForm="text" style={{fontWeight:'bold',fontFamily:'bookman',fontSize:'25px',lineHeight:'30px'}}>Project Location</label>
            <input type="text"
            id="Project_loc"
            name="Project_loc"
            placeholder="Project Location"
            value={Project_loc || ""}
            onChange={handleInputChange}/>

            <label htmlForm="text" style={{fontWeight:'bold',fontFamily:'bookman',fontSize:'25px',lineHeight:'30px'}}>Project Start Date</label>
            <input type="text"
            id="Project_startdate"
            name="Project_startdate"
            placeholder="Project Start Date"
            value={Project_startdate || ""}
            onChange={handleInputChange}/>

            

        <input type="submit" value="Save"/>
        <Link to="/admindashboard">
            <input type="button" value="Go Back"/>        </Link>
        </form>
        </div>
    </div>
  )
}

export default Project