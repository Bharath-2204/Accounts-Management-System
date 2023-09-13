import React, {useState, useEffect} from 'react';
import {Link} from "react-router-dom";
import "./Home.css";
import {toast} from "react-toastify";
import axios from "axios";
import Navbar from "./Navbar"

const Viewtransaclog = () => {
    const [tdata, settData]= useState([]);

    const loadData = async() => {
        const response = await axios.get("http://localhost:5000/api/transactionlog");
        settData(response.data);

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
        <div class="header">S B CONSTRUCTIONS</div>
        <button onClick={handleClick}>Project</button>
        <div class="table"><table className="styled-table">
            <thead>
                <tr>
                    <th style={{textAlign: "center"}}> Employee ID</th>
                    <th style={{textAlign: "center"}}> Project Number</th>
                    <th style={{textAlign: "center"}}> Transaction ID</th>
                    <th style={{textAlign: "center"}}> Amount Paid</th>
                    <th style={{textAlign: "center"}}> Amount Balance</th>
                    

                
                </tr>
            </thead>
            <tbody>
                {tdata.map((item, index)=>{
                    return(
                        
                        <tr>
                                
                                <td>{item.E_Id}</td>
                                <td>{item.Project_no}</td>
                                <td>{item.Transaction_Id}</td>
                                <td>{item.Amount_paid}</td>
                                <td>{item.Amount_balance}</td>
                                
                                
                                
                        </tr>
                        
                    );
                })}
            </tbody>
        </table></div>
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

export default Viewtransaclog;