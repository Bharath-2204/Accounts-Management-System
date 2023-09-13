import React, {useState, useEffect} from 'react';
import {Link} from "react-router-dom";
import "./Home.css";
import {toast} from "react-toastify";
import axios from "axios";
import Navbar from './Navbar';

const Projectview = () => {
    const [data, setData]= useState([]);

    const loadData = async() => {
        const response = await axios.get("http://localhost:5000/api/projectdetails");
        setData(response.data);

    };
    useEffect(()=>{
        loadData();

    }, [])

    const [pdata, setpData]= useState([]);

    const loadpData = async() => {
        const response = await axios.get("http://localhost:5000/api/projlog");
        setpData(response.data);

    };
    useEffect(()=>{
        loadpData();

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
        <button onClick={handleClick} class="proview">Project</button>
        <div class="pheader">PROJECT DETAILS</div>
        <div class="pv">
        <table className="styled-table">
            <thead>
                <tr>
                    <th style={{textAlign: "center"}}> Project Number</th>
                    <th style={{textAlign: "center"}}> Project Name</th>
                    <th style={{textAlign: "center"}}> Project Location</th>
                    <th style={{textAlign: "center"}}> Project Start Date</th>
                    
                
                </tr>
            </thead>
            <tbody>
                {data.map((item, index)=>{
                    return(
                        <tr>
                                
                                <td>{item.Project_num}</td>
                                <td>{item.Project_name}</td>
                                <td>{item.Project_loc}</td>
                                <td>{item.Project_startdate}</td>
                                
                                
                        </tr>
                    );
                })}
            </tbody>
        </table>
        
        </div>
        {isShown &&
        <div class="ptab"><table className="styled-table">
            <thead>
                <tr>
                    <th style={{textAlign: "center"}}> Project Number</th>
                    <th style={{textAlign: "center"}}> Number of Employees</th>
                </tr>
            </thead>
            <tbody>
                {pdata.map((item, index)=>{
                    return(
                        
                        <tr>
                                <td>{item.Project_no}</td>
                                <td>{item.number}</td>
                        </tr>
                        
                    );
                })}
            </tbody>
        </table></div>}
</div>
  );
};

export default Projectview;