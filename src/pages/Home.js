import React, {useState, useEffect} from 'react';
import {Link} from "react-router-dom";
import "./Home.css";
import {toast} from "react-toastify";
import axios from "axios";

const Home = () => {
    const [data, setData]= useState([]);

    const loadData = async() => {
        const response = await axios.get("http://localhost:5000/api/get");
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
    <div style={{marginTop: "150px"}}>
        <Link to="/addContact">
        <button className='btn btn-contact'>Add contact</button></Link>
        <Link to="/login">
            <button className='btn btn-contact'>Login</button>
        </Link>
        <Link to="/register">
            <button className='btn btn-contact'>Register</button>
        </Link>
        <Link to="/project">
            <button className='btn btn-contact'>Add Project</button>
        </Link>
        <table className="styled-table">
            <thead>
                <tr>
                    <th style={{textAlign: "center"}}> E id</th>
                    <th style={{textAlign: "center"}}> Project No</th>
                    <th style={{textAlign: "center"}}> Transaction ID</th>
                    <th style={{textAlign: "center"}}> Amount Paid</th>
                    <th style={{textAlign: "center"}}> Amount Balance</th>
                    <th style={{textAlign: "center"}}> Action</th>
                </tr>
            </thead>
            <tbody>
                {data.map((item, index)=>{
                    return(
                        <tr key={item.E_Id}>
                                
                                <td>{item.E_Id}</td>
                                <td>{item.Project_no}</td>
                                <td>{item.Transaction_Id}</td>
                                <td>{item.Amount_paid}</td>
                                <td>{item.Amount_balance}</td>
                                <td>
                                    
                                    <Link to={`/update/${item.E_Id}`}>
                                    <button className='btn btn-edit'>Edit</button>
                                    </Link>
                                    <button className='btn btn-delete' onClick={()=> deleteEmployee(item.E_Id)}>Delete</button>
                                    <Link to={`/view/${item.E_Id}`}>
                                    <button className='btn btn-view '>View</button>
                                    </Link>
                                </td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
        
        
</div>
  );
};

export default Home;