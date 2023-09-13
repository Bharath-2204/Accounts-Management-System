import React ,{useState, useEffect} from 'react';
import {useNavigate, useParams, Link} from 'react-router-dom';
import "./Addedit.css";
import axios from 'axios';
import {toast} from "react-toastify"

const initialState={
    E_Id:"",
    Project_no:"",
    Transaction_Id:"",
    Amount_paid:"",
    
    Date_of_Transaction:""
};


const Update = () => {
    const [state, setState] = useState(initialState)

    const{Transaction_Id,Amount_paid, Amount_balance,Date_of_Transaction} = state;
    const navigate = useNavigate();

    const {E_Id,Project_no} = useParams();

     useEffect(()=>{
        axios.get(`http://localhost:5000/api/get/${E_Id}`).then((resp)=>setState({...resp.data[0]}))
    },[E_Id])
    

    const handleSubmit = (e) =>{
        e.preventDefault();
        if(!Transaction_Id || !Amount_paid || !Date_of_Transaction){
            toast.error("Please provide value into each input field")

        }
                        
        else if(E_Id){
            axios.put(`http://localhost:5000/api/update/${E_Id}/${Project_no}`, {
            
                
                Transaction_Id,
                Amount_paid,
            
                Date_of_Transaction
            }).then(()=>{
                setState({Transaction_Id:"", Amount_paid:"",Date_of_Transaction:""})
            }).catch((err)=>toast.error(err.response.data));
            toast.success("Record updated");
            setTimeout(()=>
            
                navigate("/transactionview")
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
            
        <label htmlForm="number" style={{fontWeight:'bold',fontFamily:'bookman',fontSize:'25px',lineHeight:'30px'}}>E ID</label>
            <input type="number"
            id="E_Id"
            name="E_Id"
            placeholder="employee Number"
            value={E_Id || ""}
            onChange={handleInputChange}/>


            <label htmlForm="number" style={{fontWeight:'bold',fontFamily:'bookman',fontSize:'25px',lineHeight:'30px'}}>Project No</label>
            <input type="number"
            id="Project_no"
            name="Project_no"
            placeholder="Project Number"
            value={Project_no || ""}
            onChange={handleInputChange}/>

            <label htmlForm="number" style={{fontWeight:'bold',fontFamily:'bookman',fontSize:'25px',lineHeight:'30px'}}>Transaction Id</label>
            <input type="number"
            id="Transaction_Id"
            name="Transaction_Id"
            placeholder="Transaction ID"
            value={Transaction_Id || ""}
            onChange={handleInputChange}/>

            <label htmlForm="number" style={{fontWeight:'bold',fontFamily:'bookman',fontSize:'25px',lineHeight:'30px'}}>Amount Paid</label>
            <input type="number"
            id="Amount_paid"
            name="Amount_paid"
            placeholder="Amount Paid"
            value={Amount_paid || ""}
            onChange={handleInputChange}/>

            

            <label htmlForm="number" style={{fontWeight:'bold',fontFamily:'bookman',fontSize:'25px',lineHeight:'30px'}}>Transaction date</label>
            <input type="text"
            id="Date_of_Transaction"
            name="Date_of_Transaction"
            placeholder="YYYY-MM-DD"
            value={Date_of_Transaction || ""}
            onChange={handleInputChange}/>

        <input type="submit" value="Update"/>
        <Link to="/">
            <input type="button" value="Go Back"/>        </Link>
        </form>
        </div>
    </div>
  )
  } 

export default Update