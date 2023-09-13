import React, {useState, useEffect} from 'react';
import {Link,useParams} from "react-router-dom";
import "./Home.css";
import {toast} from "react-toastify";
import axios from "axios";
import Navbar from "./Navbar"

const Balance = () => {
    const [tdata, settData]= useState([]);
    const {E_Id} = useParams();
    const loadtData = async() => {
        const response = await axios.get(`http://localhost:5000/api/balance/${E_Id}`);
        settData(response.data);

    };
    useEffect(()=>{
        loadtData();

    }, [])

    const [trdata, settrData]=useState([]);
    const loadtrdata=async()=>{
        const response = await axios.get(`http://localhost:5000/api/trans/${E_Id}`);
        settrData(response.data);
    }
    useEffect(()=>{
        loadtrdata();

    }, [])


  return (
    
    <div>
        <Navbar/>
        <div class="header">S B CONSTRUCTIONS</div>
        <div class="balanceheader">Balance Details</div>
        <div class="transacheader">Transaction History</div>
        <div class="balancetable">
        <div class="table"><table className="styled-table">
            <thead>
                <tr>
                    <th style={{textAlign: "center"}}> Project No</th>
                    <th style={{textAlign: "center"}}> BALANCE AMOUNT</th>
                </tr>
            </thead>
            <tbody>
                {tdata.map((item, index)=>{
                    return(
                        
                        <tr>
                                <td>{item.Project_no}</td>
                                <td>{item.balance}</td>
                        </tr>
                        
                    );
                })}
            </tbody>
        </table></div></div>
        <div class="transactable">
        <div><table className="styled-table">
            <thead>
                <tr>
                <th style={{textAlign: "center"}}>Project Number</th>
                    <th style={{textAlign: "center"}}>AMOUNT Received</th>
                    <th style={{textAlign: "center"}}>Transaction date</th>
                </tr>
            </thead>
            <tbody>
                {trdata.map((item, index)=>{
                    return(
                        
                        <tr>
                                <td>{item.Project_no}</td>
                                <td>{item.Amount_paid}</td>
                                <td>{item.Date_of_Transaction}</td>
                        </tr>
                        
                    );
                })}
            </tbody>
        </table></div>
        </div>
        
</div>
  );
};

export default Balance;