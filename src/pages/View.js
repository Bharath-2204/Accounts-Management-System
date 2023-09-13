import React, {useState, useEffect} from 'react'
import {useParams, Link} from "react-router-dom"
import axios from 'axios'
import "./View.css";


const View = () => {
    const [user, setUser] = useState({});
const {E_Id} = useParams();


useEffect(()=>{
    axios.get(`http://localhost:5000/api/get/${E_Id}`)
    .then((resp)=>setUser({...resp.data[0]}))
},[E_Id])
 return (
    <div style={{marginTop:"150px"}}>
        <div className='card'>
            <div className='card-holder'>
                <p>User Details</p>
                </div>
                <div className='container'>
                    <strong>Employee ID: </strong>
                    <span>{E_Id}</span>
                    <br />
                    <br />
                    <strong>Project No: </strong>
                    <span>{user.Project_no}</span>
                    <br />
                    <br />
                    <strong>Transaction ID: </strong>
                    <span>{user.Transaction_Id}</span>
                    <br />
                    <br />
                    
                    
                    <strong>Payment Balance: </strong>
                    <span>{user.Amount_balance}</span>
                    <br />
                    <br />
                    <Link to="/">
                    <div className='btn btn-edit'>Go back</div>
                    </Link>
                    </div></div> 
        </div>
  )
}

export default View