import React ,{useState, useEffect} from 'react';
import {useNavigate, useParams, Link} from 'react-router-dom';
import "./Addedit.css";
import axios from 'axios';
import {toast} from "react-toastify"

const initialState={
    E_Id:"",
    Project_num:"",
    Transaction_id:"",
    Amount_received:"",
    
    Date_of_transaction:""
};


const Clientupdate = () => {
    const [state, setState] = useState(initialState)

    const{Transaction_id,Amount_received, Amount_balance,Date_of_transaction} = state;
    const navigate = useNavigate();

    const {Project_num} = useParams();

     useEffect(()=>{
        axios.get(`http://localhost:5000/api/get/${Project_num}`).then((resp)=>setState({...resp.data[0]}))
    },[Project_num])
    

    const handleSubmit = (e) =>{
        e.preventDefault();
        if(!Transaction_id || !Amount_received || !Date_of_transaction){
            toast.error("Please provide value into each input field")

        }
                        
        else if(Project_num){
            axios.put(`http://localhost:5000/api/updateclienttransac/${Project_num}`, {
            
                
                Transaction_id,
                Amount_received,
            
                Date_of_transaction
            }).then(()=>{
                setState({Transaction_id:"", Amount_received:"",Date_of_transaction:""})
            }).catch((err)=>toast.error(err.response.data));
            toast.success("Record updated");
            setTimeout(()=>
            
                navigate("/clienttransac")
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
        <div class="up">
        <form style={{margin:"auto",padding:"15px",maxWidth:"400px",alignContent:"center"}}onSubmit={handleSubmit}>
            
        


            <label htmlForm="number" style={{fontWeight:'bold',fontFamily:'bookman',fontSize:'25px',lineHeight:'30px'}}>Project No</label>
            <input type="number"
            id="Project_num"
            name="Project_num"
            placeholder="Project Number"
            value={Project_num || ""}
            onChange={handleInputChange}/>

            <label htmlForm="number" style={{fontWeight:'bold',fontFamily:'bookman',fontSize:'25px',lineHeight:'30px'}}>Transaction Id</label>
            <input type="number"
            id="Transaction_id"
            name="Transaction_id"
            placeholder="Transaction ID"
            value={Transaction_id || ""}
            onChange={handleInputChange}/>

            <label htmlForm="number" style={{fontWeight:'bold',fontFamily:'bookman',fontSize:'25px',lineHeight:'30px'}}>Amount Received</label>
            <input type="number"
            id="Amount_received"
            name="Amount_received"
            placeholder="Amount Received"
            value={Amount_received || ""}
            onChange={handleInputChange}/>

            

            <label htmlForm="number" style={{fontWeight:'bold',fontFamily:'bookman',fontSize:'25px',lineHeight:'30px'}}>Transaction date</label>
            <input type="text"
            id="Date_of_transaction"
            name="Date_of_transaction"
            placeholder="YYYY-MM-DD"
            value={Date_of_transaction || ""}
            onChange={handleInputChange}/>

        <input type="submit" value="Update"/>
        <Link to="/clienttransac">
            <input type="button" value="Go Back"/>        </Link>
        </form>
        </div>
    </div>
  )
  } 

export default Clientupdate