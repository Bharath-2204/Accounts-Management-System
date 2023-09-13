import React, {useState, useEffect} from 'react';
import {Link} from "react-router-dom";
import "./Home.css";
import {toast} from "react-toastify";
import axios from "axios";
import Navbar from "./Navbar"
import Viewtransaclog from './Viewtransaclog';

const Transactionview = () => {
    const [data, setData]= useState([]);

    const loadData = async() => {
        const response = await axios.get("http://localhost:5000/api/transactiondetails");
        setData(response.data);

    };
    useEffect(()=>{
        loadData();

    }, [])

    const [tdata, settData]= useState([]);

    const loadtData = async() => {
        const response = await axios.get("http://localhost:5000/api/transactionlog");
        settData(response.data);

    };
    useEffect(()=>{
        loadtData();

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
        <div class="header">S B CONSTRUCTIONS</div><div class="title">
        Latest Transactions</div>
        
        <button class="transaclog" onClick={handleClick}>View Full Transaction</button>
        <div class="table"><table className="styled-table">
            
            <thead>
                <tr>
                    <th style={{textAlign: "center"}}> Employee ID</th>
                    <th style={{textAlign: "center"}}> Project Number</th>
                    <th style={{textAlign: "center"}}> Transaction ID</th>
                    <th style={{textAlign: "center"}}> Amount Paid</th>
                    
                    <th style={{textAlign: "center"}}> Action</th>

                
                </tr>
            </thead>
            <tbody>
                {data.map((item, index)=>{
                    return(
                        
                        <tr>
                                
                                <td>{item.E_Id}</td>
                                <td>{item.Project_no}</td>
                                <td>{item.Transaction_Id}</td>
                                <td>{item.Amount_paid}</td>
                                
                                <td>
                                    
                                    <Link to={`/update/${item.E_Id}/${item.Project_no}`}>
                                    <button className='btn btn-edit'>UPDATE</button>
                                    </Link></td>
                                    
                                    
                                
                                
                        </tr>
                        
                    );
                })}
            </tbody>
        </table></div>
        {isShown && <div class="trlog">
        <div><table className="styled-table">
        <thead>
            <tr>
                <th style={{textAlign: "center"}}> Employee ID</th>
                <th style={{textAlign: "center"}}> Project Number</th>
                <th style={{textAlign: "center"}}> Transaction ID</th>
                <th style={{textAlign: "center"}}> Amount Paid</th>
                
                

            
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
                            
                            
                            
                            
                    </tr>
                    
                );
            })}
        </tbody>
    </table></div>
</div>

        }
        
        
</div>
  );
};

export default Transactionview;