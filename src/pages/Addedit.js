import React ,{useState, useEffect} from 'react';
import {useNavigate, useParams, Link} from 'react-router-dom';
import "./Addedit.css"
import axios from 'axios';
import {toast} from "react-toastify"

const initialState={
    E_Id:"",
    Project_no:"",
    Total_amt_paid:"",
    Transaction_Id:"",
    Amount_paid:"",
   
    Date_of_Transaction:""
};


const Addedit = () => {
    const [state, setState] = useState(initialState)

    const{E_Id,Project_no,Total_amt_paid, Transaction_Id,Amount_paid, Date_of_Transaction} = state;
    const navigate = useNavigate();

    // const {E_Id} = useParams();

    // useEffect(()=>{
    //     axios.get(`http://localhost:5000/api/get/${E_Id}`).then((resp)=>setState({...resp.data[0]}))
    // },[E_Id])

    

    const handleSubmit = (e) =>{
        e.preventDefault();
        if(!Project_no ||!Total_amt_paid || !Amount_paid || !Date_of_Transaction){
            toast.error("Please provide value into each input field")

        }
        
        
        
        else{
            
            axios.post("http://localhost:5000/api/post", {
                E_Id,
                Project_no,
                Total_amt_paid,
                Transaction_Id,
                Amount_paid,
                
                Date_of_Transaction 
            }).then(()=>{
                setState({E_Id:"", Project_no:"",Total_amt_paid:"", Transaction_Id:"", Amount_paid:"",Date_of_Transaction:""})
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
        
            <label htmlForm="number" style={{fontWeight:'bold',fontFamily:'bookman',fontSize:'25px'}}>E Id</label>
            <input type="number"
            id="E_Id"
            name="E_Id"
            placeholder="Employee Id"
            value={E_Id || ""}
            onChange={handleInputChange}/>

            <label htmlForm="number" style={{fontWeight:'bold',fontFamily:'bookman',fontSize:'25px'}}>Project No</label>
            <input type="number"
            id="Project_no"
            name="Project_no"
            placeholder="Project Number"
            value={Project_no || ""}
            onChange={handleInputChange}/>

            <label htmlForm="number" style={{fontWeight:'bold',fontFamily:'bookman',fontSize:'25px'}}> Total Amonut</label>
            <input type="number"
            id="Total_amt_paid"
            name="Total_amt_paid"
            placeholder="Total Amount"
            value={Total_amt_paid || ""}
            onChange={handleInputChange}/>

            <label htmlForm="mobile_no" style={{fontWeight:'bold',fontFamily:'bookman',fontSize:'25px'}}>Transaction Id</label>
            <input type="number"
            id="Transaction_Id"
            name="Transaction_Id"
            placeholder="Transaction ID"
            value={Transaction_Id || ""}
            onChange={handleInputChange}/>

            <label htmlForm="number" style={{fontWeight:'bold',fontFamily:'bookman',fontSize:'25px'}}>Amount Paid</label>
            <input type="number"
            id="Amount_paid"
            name="Amount_paid"
            placeholder="Amount Paid"
            value={Amount_paid || ""}
            onChange={handleInputChange}/>

            

            <label htmlForm="text" style={{fontWeight:'bold',fontFamily:'bookman',fontSize:'25px'}}>Date_of_Transaction</label>
            <input type="text"
            id="Date_of_Transaction"
            name="Date_of_Transaction"
            placeholder="YYYY-MM-DD"
            value={Date_of_Transaction || ""}
            onChange={handleInputChange}/>

        <input type="submit" value="Save"/>
        <Link to="/admindashboard">
            <input type="button" value="Go Back"/>      </Link>
        </form>
     </div>   </div>
    
  )
}

export default Addedit