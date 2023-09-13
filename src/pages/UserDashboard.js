import React, {useState, useEffect} from 'react'
import {useParams, Link} from "react-router-dom"
import axios from 'axios'
import "./View.css";
import Usernav from './Usernav';


const UserDashboard = () => {
    
    
const [user, setUser] = useState({});
const {E_Id} = useParams();

useEffect(()=>{
    axios.get(`http://localhost:5000/api/UserDashboard/${E_Id}`)
    .then((resp)=> setUser({...resp.data[0]}))
},[E_Id]);


const [pdata, setpData]= useState([]);

    const loadpData = async() => {
        const response = await axios.get(`http://localhost:5000/api/usrproj/${E_Id}`);
        setpData(response.data);

    };
    useEffect(()=>{
        loadpData();

    }, [])

    const [tdata, settData]= useState([]);

    const loadtData = async() => {
        const response = await axios.get(`http://localhost:5000/api/usrtransac/${E_Id}`);
        settData(response.data);

    };
    useEffect(()=>{
        loadtData();

    }, [])

    const [bdata, setbData]= useState([]);

    const loadbData = async() => {
        const response = await axios.get(`http://localhost:5000/api/usrbal/${E_Id}`);
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

      const [istShown, settIsShown] = useState(false);
    const handletClick = event => {
        // 👇️ toggle shown state
        settIsShown(current => !current);
    
        // 👇️ or simply set it to true
        // setIsShown(true);
      };

      const [isbShown, setbIsShown] = useState(false);
    const handlebClick = event => {
        // 👇️ toggle shown state
        setbIsShown(current => !current);
    
        // 👇️ or simply set it to true
        // setIsShown(true);
      };


 return (
    
    <div>
        
        <Usernav/>
        <h1>Welcome {user.First_name}</h1>
        <button  onClick={handleClick} class="usrproject">View Projects</button>
        <button  onClick={handletClick} class="usrtransaction">View Transactions</button>
        <button  onClick={handlebClick} class="usrbalance">View Balance</button>
        {isShown &&
        <div class="usrptab"><table className="styled-table">
            <thead>
                <tr>
                    <th style={{textAlign: "center"}}> Project Number</th>
                    <th style={{textAlign: "center"}}> Project Name</th>
                </tr>
            </thead>
            <tbody>
                {pdata.map((item, index)=>{
                    return(
                        
                        <tr>
                                <td>{item.project_no}</td>
                                <td>{item.project_name}</td>
                        </tr>
                        
                    );
                })}
            </tbody>
        </table></div>}
        {istShown && 
        <div class="usrttab"><table className="styled-table">
        <thead>
            <tr>
                <th style={{textAlign: "center"}}> Project Number</th>
                <th style={{textAlign: "center"}}> Transaction ID</th>
                <th style={{textAlign:"center"}}>Amount Received</th>
                <th style={{textAlign:"center"}}>Date of Transaction</th>
            </tr>
        </thead>
        <tbody>
            {tdata.map((item, index)=>{
                return(
                    
                    <tr>
                            <td>{item.Project_no}</td>
                            <td>{item.Transaction_Id}</td>
                            <td>{item.Amount_paid}</td>
                            <td>{item.Date_of_Transaction}</td>
                    </tr>
                    
                );
            })}
        </tbody>
    </table></div>

        }

{isbShown && 
        <div class="usrbtab"><table className="styled-table">
        <thead>
            <tr>
                <th style={{textAlign: "center"}}> Project Number</th>
                
                <th style={{textAlign:"center"}}>Balance</th>
                
            </tr>
        </thead>
        <tbody>
            {bdata.map((item, index)=>{
                return(
                    
                    <tr>
                            <td>{item.project_no}</td>
                            <td>{item.balance}</td>
                            
                    </tr>
                    
                );
            })}
        </tbody>
    </table></div>

        }
                    

                
                    
                    
                    
                    
                    <h1>{user.procount}</h1>
        </div>
  )
}

export default UserDashboard