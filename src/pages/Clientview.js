import React, {useState, useEffect} from 'react';
import {Link} from "react-router-dom";
import "./Home.css";
import {toast} from "react-toastify";
import axios from "axios";
import Navbar from "./Navbar"
import Viewtransaclog from './Viewtransaclog';

const Clientview = () => {
    const [data, setData]= useState([]);

    const loadData = async() => {
        const response = await axios.get("http://localhost:5000/api/clientdetails");
        setData(response.data);

    };
    useEffect(()=>{
        loadData();

    }, [])

    const [cdata, setcData]= useState([]);

    const loadcData = async() => {
        const response = await axios.get("http://localhost:5000/api/clienttranlog");
        setcData(response.data);

    };
    useEffect(()=>{
        loadcData();

    }, [])

    const [bdata, setbData]= useState([]);

    const loadbData = async() => {
        const response = await axios.get("http://localhost:5000/api/clientbalance");
        setbData(response.data);

    };
    useEffect(()=>{
        loadbData();

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
        <div class="header">S B CONSTRUCTIONS</div><div class="clienttitle">
        Client Details</div>
        <Link to="/addclienttransac">
                                    <button className='addclienttransac'>Add Transaction</button>
                                    </Link>
        <button class="clienttransaclog" onClick={handleClick}>View Full Transaction</button>
        <div class="clienttable"><table className="styled-table">
            
            <thead>
                <tr>
                    <th style={{textAlign: "center"}}> Project Number</th>
                    <th style={{textAlign: "center"}}> Project Name</th>
                    <th style={{textAlign: "center"}}> Project Location</th>
                    <th style={{textAlign: "center"}}> Client Name</th>
                    <th style={{textAlign: "center"}}> Balance</th>
                    <th style={{textAlign: "center"}}> Action</th>

                
                </tr>
            </thead>
            <tbody>
                {data.map((item, index)=>{
                    return(
                        
                        <tr>
                                
                                
                                <td>{item.Project_num}</td>
                                <td>{item.Project_name}</td>
                                <td>{item.Project_loc}</td>
                                <td>{item.Client_name}</td>
                                <td>{item.balance}</td>
                                
                                <td>
                                    
                                    <Link to={`/updateclienttransac/${item.Project_num}`}>
                                    <button className='btn btn-edit'>Update Transac</button>
                                    </Link></td>
                                    
                                    
                                
                                
                        </tr>
                        
                    );
                })}
            </tbody>
        </table>
        </div>


       {bdata.map((item,index)=>{
return(
    <div class="totalbalance">
        <p>Total Balance is <i><u>{item.balance}</u></i></p>
    </div>
)

       })}



















        {isShown && <div class="clog">
        <div><table className="styled-table">
        <thead>
            <tr>
                
                <th style={{textAlign: "center"}}> Project Number</th>
                <th style={{textAlign: "center"}}> Amount Paid</th>
                <th style={{textAlign: "center"}}> Transaction ID</th>
                <th style={{textAlign: "center"}}> Date of Transaction</th>
                
                

            
            </tr>
        </thead>
        <tbody>
            {cdata.map((item, index)=>{
                return(
                    
                    <tr>
                            
                            <td>{item.Project_num}</td>
                            <td>{item.Amount_received}</td>
                            <td>{item.Transaction_id}</td>
                            <td>{item.Date_of_transaction}</td>
                            
                            
                            
                            
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

export default Clientview;