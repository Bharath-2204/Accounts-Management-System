import React ,{useState, useEffect} from 'react';
import {useNavigate, useParams, Link} from 'react-router-dom';
import "./Addedit.css"
import axios from 'axios';
import {toast} from "react-toastify"

const initialState={
    Project_num:"",
    Project_name:"",
    Project_loc:"",
    Client_name:"",
    Start_date:"",

};


const AddClientdets = () => {
    const [state, setState] = useState(initialState)

    const{Project_num,Project_name,Project_loc,Client_name,Start_date} = state;
    const navigate = useNavigate();

    // const {E_Id} = useParams();

    // useEffect(()=>{
    //     axios.get(`http://localhost:5000/api/get/${E_Id}`).then((resp)=>setState({...resp.data[0]}))
    // },[E_Id])

    

    const handleSubmit = (e) =>{
        e.preventDefault();
        if(!Project_num || !Project_name || !Project_loc || !Client_name || !Start_date){
            toast.error("Please provide value into each input field")

        }
        
        
        
        else{
            
            axios.post("http://localhost:5000/api/clientdets", {
                Project_num,
                Project_name,
                Project_loc,
                Client_name,
                Start_date,
                
                
                
            }).then(()=>{
                setState({Project_num:"",Project_name:"",Project_loc:"",Client_name:"",Start_date:""})
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
        <div class="b">
        <form style={{margin:"auto",padding:"15px",maxWidth:"400px",alignContent:"center"}}onSubmit={handleSubmit}>
        
            <label htmlForm="number" style={{fontWeight:'bold',fontFamily:'bookman',fontSize:'25px'}}>Project Number</label>
            <input type="number"
            id="Project_num"
            name="Project_num"
            placeholder=""
            value={Project_num || ""}
            onChange={handleInputChange}/>

            <label htmlForm="text" style={{fontWeight:'bold',fontFamily:'bookman',fontSize:'25px'}}>Project Name</label>
            <input type="text"
            id="Project_name"
            name="Project_name"
            placeholder="Project Name"
            value={Project_name || ""}
            onChange={handleInputChange}/>

            <label htmlForm="text" style={{fontWeight:'bold',fontFamily:'bookman',fontSize:'25px'}}>Project Location</label>
            <input type="text"
            id="Project_loc"
            name="Project_loc"
            placeholder=""
            value={Project_loc || ""}
            onChange={handleInputChange}/>

            <label htmlForm="text" style={{fontWeight:'bold',fontFamily:'bookman',fontSize:'25px'}}>Client Name</label>
            <input type="text"
            id="Client_name"
            name="Client_name"
            placeholder=""
            value={Client_name || ""}
            onChange={handleInputChange}/>

            <label htmlForm="text" style={{fontWeight:'bold',fontFamily:'bookman',fontSize:'25px'}}>Project Start Date</label>
            <input type="text"
            id="Start_date"
            name="Start_date"
            placeholder=""
            value={Start_date || ""}
            onChange={handleInputChange}/>

            

            

        <input type="submit" value="Save"/>
        <Link to="/admindashboard">
            <input type="button" value="Go Back"/>      </Link>
        </form>
     </div>   </div>
    
  )
}

export default AddClientdets