import React, {useState, useEffect} from 'react';
import {Link} from "react-router-dom";
import "./Home.css";
import {toast} from "react-toastify";
import axios from "axios";
import Navbar from './Navbar';


const Departmentview = () => {
    const [data, setData]= useState([]);

    const loadData = async() => {
        const response = await axios.get("http://localhost:5000/api/departmentdetails");
        setData(response.data);

    };
    useEffect(()=>{
        loadData();

    }, [])


    const [depdata, setdepData]= useState([]);

    const loaddepData = async() => {
        const response = await axios.get("http://localhost:5000/api/deplog");
        setdepData(response.data);

    };
    useEffect(()=>{
        loaddepData();

    }, [])


    const [deptrandata, setdeptranData]= useState([]);

    const loaddeptranData = async() => {
        const response = await axios.get("http://localhost:5000/api/deptran");
        setdeptranData(response.data);

    };
    useEffect(()=>{
        loaddeptranData();

    }, [])


    const [isShown, setIsShown] = useState(false);

  const handleClick = event => {
    // 👇️ toggle shown state
    setIsShown(current => !current);

    // 👇️ or simply set it to true
    // setIsShown(true);
  };


    
  return (
    
    <div>
       <Navbar/> 
       <button onClick={handleClick} class="proview">Employee Count</button>
       <button onClick={handleClick} class="deptranview">Department Transaction</button>
       <div class="depdetails">DEPARTMENTS</div>
       <div class="depvw">
        <table className="styled-table">
            <thead>
                <tr>
                    <th style={{textAlign: "center"}}> Department Number</th>
                    <th style={{textAlign: "center"}}> Department Name</th>
                    
                
                </tr>
            </thead>
            <tbody>
                {data.map((item, index)=>{
                    return(
                        <tr key={item.Department_num}>
                                
                                <td>{item.Department_num}</td>
                                <td>{item.Department_name}</td>
                                
                                
                        </tr>
                    );
                })}
            </tbody>
        </table></div>
        {isShown &&
        <div class="dtab"><table className="styled-table">
            <thead>
                <tr>
                    <th style={{textAlign: "center"}}>Department Name</th>
                    <th style={{textAlign: "center"}}> Number of Employees</th>
                </tr>
            </thead>
            <tbody>
                {depdata.map((item, index)=>{
                    return(
                        
                        <tr>
                                <td>{item.department_name}</td>
                                <td>{item.number}</td>
                        </tr>
                        
                    );
                })}
            </tbody>
        </table></div>}
        <div class="deptrans">
        <table className="styled-table">
            <thead>
                <tr>
                    <th style={{textAlign: "center"}}> Department Name</th>
                    <th style={{textAlign: "center"}}> Project number</th>
                    <th style={{textAlign: "center"}}> Total Amount to be paid</th>
                    <th style={{textAlign: "center"}}> Balance</th>
                
                </tr>
            </thead>
            <tbody>
                {deptrandata.map((item, index)=>{
                    return(
                        <tr key={item.Department_num}>
                                
                                <td>{item.Department_name}</td>
                                <td>{item.Project_no}</td>
                                <td>{item.Totalamt_to_be_paid}</td>
                                <td>{item.balance}</td>
                                
                                
                        </tr>
                    );
                })}
            </tbody>
        </table></div>  
        
</div>
  );
};

export default Departmentview;