import { useState,useEffect } from "react"
import {Link} from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EditEmployee = (props) =>{
    let [employeeUserName,setEmployeeUserName] = useState("")
    let [employeePassword,setEmployeePassword] = useState("")
    let [employeeFirstName,setEmployeeFirstName] = useState("")
    let [employeeLastName,setEmployeeLastName] = useState("")
    let [employeeEmailId,setEmployeeEmailId] = useState("")
    let [customer,setCustomer] = useState("")
    let [customerData,setCustomerData] = useState()
    
    const fetchData = async() =>{
        const {match}  = props
        const id = match.params.id
        const response = await fetch(`/employees/${id}`);
        const responseData = await response.json();
        const {username,password,customer,firstName,lastName,emailId} = responseData
        setCustomer(customer)
        setEmployeeUserName(username)
        setEmployeePassword(password)
        setEmployeeFirstName(firstName)
        setEmployeeLastName(lastName)
        setEmployeeEmailId(emailId)
        
    };

    useEffect(()=>{
        fetchData();
    },[])

    const fetchCustomers = async() =>{
        const response = await fetch('/customersInfo')
        const responseData = await response.json()
        // console.log(responseData)
        const temp = ["Select Customer",...responseData.list]
        setCustomerData(temp)
    }
    
    useEffect(()=>{
        fetchCustomers();
    },[])

    const updateEmployee = async () =>{
        const {match} = props
        const id = match.params.id
        if(employeeEmailId !== "" && employeePassword !== "" && employeeUserName !== "" && employeeFirstName!=="" && customer !=="" && customer !== "Select Customer")
        {
            const data = {
                employeeUserName,employeeEmailId:employeeEmailId.toLowerCase(),id,employeeFirstName,employeeLastName,employeePassword,customer
            }
            // console.log(data)
            const options = {
                method: 'PUT',
                headers:{
                "Content-Type":"application/json",
                },
                body: JSON.stringify(data),
            }
        
            const response = await fetch('/updateEmployee',options)
            const responseData = await response.json()
            
            if (response.status === 200) {
                toast.success(responseData.message, {
                    position: "top-right",
                    autoClose: 1000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme:'colored',
                    });
                    const {history} = props
                    function sleep(ms) {
                        return new Promise(resolve => setTimeout(resolve, ms));
                      }
                    await sleep(2000);
                    history.replace('/employees')
                    
            } else {
                toast.error(responseData.message, {
                    position: "top-right",
                    autoClose: 1000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme:'colored',
                    });
                
            }
        }else{
            toast.error("Enter valid credentials", {
                position: "top-right",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme:'colored',
                });
            
        }
    }

    return(
        <div className='edit-customer'>
            <div className='add-customer text-primary '>
                        <h5 className='pb-3'>Update Employee</h5>
                        <input type="text" placeholder='Employee Username' className='mb-2 w-100 input' value={employeeUserName} onChange={(event) =>setEmployeeUserName(event.target.value)}/><br />
                        <input type="password"  placeholder='Employee Password' className='mb-2 w-100 input'  value={employeePassword} onChange={(event) =>setEmployeePassword(event.target.value)}/><br />
                        <input type="text" placeholder='Employee First Name' className='mb-2 w-100 input' value={employeeFirstName} onChange={(event) =>setEmployeeFirstName(event.target.value)}/><br />
                        <input type="text" placeholder='Employee Last Name' className='mb-2 w-100 input' value={employeeLastName} onChange={(event) =>setEmployeeLastName(event.target.value)}/><br />
                        <select className='w-100 mb-2 p-1' placeholder='Select Customer' value={customer} onChange={(e) =>setCustomer(e.target.value)}>
                        {customerData && customerData.map(e =>(
                            <option key={e} value={e}>{e}</option>
                        ))}
                        </select>
                        <input type="text"  placeholder='Employee EmailId' className='mb-2  w-100 input'disabled value={employeeEmailId} onChange={(event) =>setEmployeeEmailId(event.target.value)}/><br />
                        <button className='btn btn-danger m-2' type="button" ><Link to="/employees"  className='link'>
                            Cancel
                        </Link></button>
                        <button className='btn btn-success m-2' type="button" onClick={updateEmployee}>Submit</button>
                    </div>
                    <ToastContainer />
        </div>
    )
}
export default EditEmployee