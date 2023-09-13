import React, {useState, useEffect} from 'react';
import {Link} from "react-router-dom";
import "./Home.css";
import {toast} from "react-toastify";
import axios from "axios";
import Navbar from './Navbar';

const Employeeview = () => {
    const [data, setData]= useState([]);

    const loadData = async() => {
        const response = await axios.get("http://localhost:5000/api/employeedetails");
        setData(response.data);

    };
    useEffect(()=>{
        loadData();

    }, [])
    const deleteEmployee= (E_Id) =>{
        if(window.confirm("Are you sure that you wan to delete?")){
            axios.delete(`http://localhost:5000/api/remove/${E_Id}`); 
            toast.success("Employee deleted");
            setTimeout(()=>loadData(), 100);
        } 
    }

    
  return (
    <div>
        <Navbar/>
        <div class="titleempdb">Employee Details</div>
        <div class="emptab">
                    <table className="styled-table">
            
            <thead>
                <tr>
                    <th style={{textAlign: "center"}}> First Name</th>
                    <th style={{textAlign: "center"}}> Last Name</th>
                    <th style={{textAlign: "center"}}> Employee ID</th>
                    <th style={{textAlign: "center"}}> Department Name</th>
                    <th style={{textAlign: "center"}}> Mobile Number</th>
                    <th style={{textAlign: "center"}}> ACTION</th>
                
                </tr>
            </thead>
            <tbody>
                {data.map((item, index)=>{
                    return(
                        <tr>
                                
                                <td>{item.First_name}</td>
                                <td>{item.Last_name}</td>
                                <td>{item.E_Id}</td>
                                <td>{item.Department_name}</td>
                                <td>{item.Mobile_no}</td>
                                <td>
                                <Link to={`/balance/${item.E_Id}`}>
                                        <button className='btn btn-edit'>View Transaction</button>
                                    </Link>
                                <button className='btn btn-delete' onClick={()=> deleteEmployee(item.E_Id)}>Delete</button>
                                </td>
                                
                        </tr>
                    );
                })}
            </tbody>
        </table></div>
        
        
</div>
  );
};

export default Employeeview;