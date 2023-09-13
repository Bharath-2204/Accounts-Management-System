import React ,{useState, useEffect} from 'react';
import {useNavigate, useParams, Link} from 'react-router-dom';
import "./Addedit.css";
import axios from 'axios';
import {toast} from "react-toastify"

const initialState={
    E_Id:"",
    Project_num:"",
    Total_amount:"",
    Transaction_id:"",
    Amount_received:"",
    
    Date_of_transaction:""
};


const Addclientran = () => {
    const [state, setState] = useState(initialState)

    const{Project_num,Total_amount,Transaction_id,Amount_received, Amount_balance,Date_of_transaction} = state;
    const navigate = useNavigate();

   
    

    const handleSubmit = (e) =>{
        e.preventDefault();
        if(!Project_num || !Total_amount || !Transaction_id || !Amount_received || !Date_of_transaction){
            toast.error("Please provide value into each input field")

        }
                        
        else{
            axios.post("http://localhost:5000/api/clienttran", {
            
                Project_num,
                Total_amount,
                Transaction_id,
                Amount_received,
                Date_of_transaction
            }).then(()=>{
                setState({Project_num:"",Total_amount:"",Transaction_id:"", Amount_received:"",Date_of_transaction:""})
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

            <label htmlForm="number" style={{fontWeight:'bold',fontFamily:'bookman',fontSize:'25px'}}>Total Amount</label>
            <input type="number"
            id="Total_amount"
            name="Total_amount"
            placeholder=""
            value={Total_amount || ""}
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

        <input type="submit" value="Save"/>
        <Link to="/">
            <input type="button" value="Go Back"/>        </Link>
        </form>
        </div>
    </div>
  )
  } 

export default Addclientran