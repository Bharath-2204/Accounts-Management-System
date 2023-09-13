
import "./App.css";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import { ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Home from "./pages/Home";
import Addedit from "./pages/Addedit";
import View from "./pages/View";
import Login from "./pages/Login";
import Register from "./pages/Register";
import UserDashboard from "./pages/UserDashboard";
import Update from "./pages/Update"
import Project from "./pages/Project"
import Landingpage from "./pages/Landingpage";
import Admindashboard from "./pages/Admindashboard";
import Department from "./pages/Department";
import Employeedets from "./pages/Employeedets"
import Departmentview from "./pages/Departmentview"
import Transactionview from "./pages/Transactionview"
import Projectview from "./pages/Projectview";
import Employeeview from "./pages/Employeeview";
import Viewtransaclog from "./pages/Viewtransaclog";
import Balance from "./pages/Balance";
import AddClientdets from "./pages/AddClientdets";
import Clientview from "./pages/Clientview"
import Clientupdate from "./pages/Clientupdate"
import Addclientran from "./pages/Addclientran";


function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <ToastContainer position="top-center"/>
      <Routes>
        <Route path="/" element={<Landingpage />} />
        <Route path="/admindashboard" element={<Admindashboard />} />
        {/* <Route path='/' element={<Home />} /> */}
        <Route path="/addContact" element={<Addedit/>} />
        <Route path="/update/:E_Id/:Project_no" element={<Update/>} />
        <Route path="/balance/:E_Id" element={<Balance/>} />
        <Route path="/view/:E_Id" element={<View/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/project" element={<Project/>} />
        <Route path="/department" element={<Department/>} />
        <Route path="/departmentview" element={<Departmentview/>} />
        <Route path="/transactionview" element={<Transactionview/>} />
        
        <Route path="/employeedets" element={<Employeedets/>} />
        <Route path="/clientdets" element={<AddClientdets/>} />
        <Route path="/clienttransac" element={<Clientview/>} />
        <Route path="/addclienttransac" element={<Addclientran/>}/>
        <Route path="/updateclienttransac/:Project_num" element={<Clientupdate/>} />
        <Route path="/projectview" element={<Projectview/>}/>
        <Route path="/employeeview" element={<Employeeview/>}/>
        <Route path="/UserDashboard/:E_Id" element={<UserDashboard/>}/>
      </Routes>
      
    </div>
    </BrowserRouter>
  );
}

export default App;
