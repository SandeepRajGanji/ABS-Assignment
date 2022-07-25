import { useEffect, useState } from 'react'
import Popup from 'reactjs-popup'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {AiFillFileAdd,AiOutlineSearch} from 'react-icons/ai'
import {BiRefresh} from'react-icons/bi'
import {BsSortAlphaDownAlt,BsSortAlphaUpAlt} from 'react-icons/bs'
import {RiFileExcel2Fill} from'react-icons/ri'
import ReactPaginate from 'react-paginate'
import Sidebar from '../Sidebar'
import EmployeeItem from '../EmployeeItem'
import './index.css'
import Header from '../Header';
const Employee = () =>{
    // let [showEmployee,setAddEmployee] = useState("false")
    let [employeeUserName,setEmployeeUserName] = useState("")
    let [employeePassword,setEmployeePassword] = useState('')
    let [employeeFirstName,setEmployeeFirstName] = useState("")
    let [employeeLastName,setEmployeeLastName] = useState("")
    let [employeeEmailId,setEmployeeEmailId] = useState("")
    let [customer,setCustomer] = useState("")
    let [customerData,setCustomerData] = useState()
    let [employeeData, setEmployeeData] = useState([]);
    let [activePage,setActivePage] = useState('1')
    let [searchInput,setSearchInput] = useState('')
    let [order,setOrder] = useState('ASC')

    const sorting = (col) =>{
        if(order === "ASC"){
            const sortedEmployeeData = [...employeeData].sort((a,b) =>
            a[col].toLowerCase() > b[col].toLowerCase() ? 1 : -1);
            setEmployeeData(sortedEmployeeData)
            setOrder("DSC")
        }else{
            const sortedEmployeeData = [...employeeData].sort((a,b) =>
            a[col].toLowerCase() < b[col].toLowerCase() ? 1 : -1);
            setEmployeeData(sortedEmployeeData)
            setOrder("ASC")
        }
    }
    const fetchData = async() =>{
        const response = await fetch(`/employee`);
        const responseData = await response.json();
        setEmployeeData(responseData)
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
   
    const getPaginatedEmployeeList = () =>{
        // console.log(activePage)
        const copyEmployeeData =Object.assign([],employeeData)
         const startIndex = (activePage-1) * 5
         const endIndex = (activePage*5)
        // console.log(startIndex,endIndex)
         return copyEmployeeData.slice(startIndex,endIndex)
         
       }
     const noOfPages  = Math.ceil(employeeData.length /5) 
     const paginatedEmployeeList =getPaginatedEmployeeList()

    const deleteEmployee = async(id) =>{
        const removeId = id
        const data = {
            id:removeId
        }
        const options = {
            method:"DELETE",
            headers:{
                "Content-Type":"application/json",
            },
            body:JSON.stringify(data)
        }
        const response = await fetch('/employees',options);
        const responseData  = await response.json()
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
        fetchData()
        fetchCustomers()
    }

    const addNewEmployee = async() =>{
        if(employeeEmailId !== "" && employeePassword !== "" && employeeUserName !== "" && employeeFirstName!=="" && customer !=="" && customer !== "Select Customer"){
            const data = {
                employeeEmailId:employeeEmailId.toLowerCase(),
                employeePassword,
                employeeUserName,
                employeeFirstName,
                employeeLastName,
                customer
            }
            const options = {
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify(data)
            }
           

            const response = await fetch("/addNewEmployee",options)
            const responseData = await response.json()
            console.log(responseData)
            if(response.ok === true){
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
                    function sleep(ms) {
                        return new Promise(resolve => setTimeout(resolve, ms));
                      }
                    await sleep(2000);
                toast.info("Click on close", {
                        position: "top-center",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme:'colored',
                        });
                setEmployeeEmailId(employeeEmailId='')
                setEmployeeUserName(employeeUserName='')
                setEmployeeFirstName(employeeFirstName='')
                setEmployeeLastName(employeeLastName='')
                setEmployeePassword(employeePassword='')
                
                // setAddEmployee(!showEmployee)
                fetchData();
                return 
            }else{
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
            toast.error('Enter valid credentials', {
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
    // console.log(employeeData)
    let count = 0;
    const  onEnterSearchInput = event => {
        if (event.key === 'Enter') {
            fetchData()
        }
      }
    const resetSearchInput = () =>{
        setSearchInput(searchInput="")
        fetchData()
    }
    return(
        
        <div className="home-container">
        <Sidebar />
        <Header />
        <div className="search-add-record-container">
                <div className="search-container input-group md-form form-sm form-1 pl-0">
                    <div className="input-group-prepend">
                        <span className="input-group-text text-light bg-info lighten-2" id="basic-text1"><AiOutlineSearch size={20}  /></span>
                    </div>
                    <input className="form-control my-0 py-1" type="search" onKeyDown={onEnterSearchInput} onChange={(e) =>setSearchInput(e.target.value)} placeholder="Search" aria-label="Search" />
                    <div className="input-group-prepend">
                        <span className="input-group-text text-light bg-success lighten-2" id="basic-text1"><BiRefresh size={20}  onClick={resetSearchInput}/></span>
                    </div>
                </div>
                
                <div className="icons-container">
                <Popup
              modal
              trigger={
                <div className="add-icon-container">
                <AiFillFileAdd size={25} className="add-icon"/>
                
            </div>
              }
            >
              {close => (
                <div className='popup-bg'>
                    <div className='add-customer text-primary '>
                        <h5 className='pb-3'>Add Employee</h5>
                        <input type="text" placeholder='Employee Username' className='mb-2 w-100 input' value={employeeUserName} onChange={(event) =>setEmployeeUserName(event.target.value)}/><br />
                        <input type="password"  placeholder='Employee Password' className='mb-2 w-100 input'  value={employeePassword} onChange={(event) =>setEmployeePassword(event.target.value)}/><br />
                        <input type="text" placeholder='Employee First Name' className='mb-2 w-100 input' value={employeeFirstName} onChange={(event) =>setEmployeeFirstName(event.target.value)}/><br />
                        <input type="text" placeholder='Employee Last Name' className='mb-2 w-100 input' value={employeeLastName} onChange={(event) =>setEmployeeLastName(event.target.value)}/><br />
                        <select className='w-100 mb-2 p-1' placeholder='Select Customer' onChange={(e) =>setCustomer(e.target.value)}>
                        {customerData && customerData.map(e =>(
                            <option  key={e} value={e}>{e}</option>
                        ))}
                        </select>
                        <input type="text"  placeholder='Employee EmailId' className='mb-2  w-100 input' value={employeeEmailId} onChange={(event) =>setEmployeeEmailId(event.target.value)}/><br />
                        
                        <button className='btn btn-success m-2' type="button" onClick={addNewEmployee}>Submit</button>
                        <button className='btn btn-danger m-2' type="button" onClick={() => close()}>Close</button>
                    </div>
                </div>
              )}
        </Popup>
                    <RiFileExcel2Fill size={25} className="excel-icon"/>
                </div>
        </div>
        <div className='div1'>
        <table className="table table-light table-hover">
            <thead>
                <tr>
                    <th>
                        S.No
                    </th>
                    <th onClick={() =>sorting("username")}>
                        Username {order === "DSC" ? <BsSortAlphaDownAlt /> : <BsSortAlphaUpAlt />}
                    </th>
                    <th onClick={() =>sorting("firstName")}>
                        FirstName {order === "DSC" ? <BsSortAlphaDownAlt /> : <BsSortAlphaUpAlt />}
                    </th>
                    <th onClick={() =>sorting("lastName")}>
                        LastName {order === "DSC" ? <BsSortAlphaDownAlt /> : <BsSortAlphaUpAlt />}
                    </th>
                    <th onClick={() =>sorting("customer")}>
                        Customer {order === "DSC" ? <BsSortAlphaDownAlt /> : <BsSortAlphaUpAlt />}
                    </th>
                    <th onClick={() =>sorting("emailId")}>
                        EmailID {order === "DSC" ? <BsSortAlphaDownAlt /> : <BsSortAlphaUpAlt />}
                    </th>
                    <th colSpan="2">
                        Actions
                    </th>
                </tr>
            </thead>
           
           {
                <tbody>
                    {   paginatedEmployeeList.length>0?
                        paginatedEmployeeList && paginatedEmployeeList.map(eachEmployee =>(
                            <EmployeeItem key={eachEmployee._id} 
                            employeeDetails={eachEmployee}
                            deleteEmployee={deleteEmployee}
                            count = {count+=1}
                            />
                        )): <tr >
                        <td colSpan="8"><p className="no-records">No records found</p>    </td>
                        </tr> 
                    }
                    </tbody>
                }
            
            </table>
        </div>
            {
                 paginatedEmployeeList.length > 0 ? 
                <p className='records-message'>Showing {`${(activePage-1)*5 + 1}`} to {`${activePage*5}`}  records </p>: null
            }
       
        <ReactPaginate  previousLabel={'Previous'}
                        nextLabel={'Next'}
                        breakLabel={'...'}
                        pageCount={noOfPages}
                        marginPagesDisplayed={2}
                        pageRangeDisplayed={3}
                        onPageChange={(number)=>{setActivePage(number.selected+1)}}
                        containerClassName={'pagination justify-content-center pagination-container'}
                        pageClassName={'page-item'}
                        pageLinkClassName={'page-link'}
                        previousClassName={'page-item'}
                        previousLinkClassName={'page-link'}
                        nextClassName={'page-item'}
                        nextLinkClassName={'page-link'}
                        breakClassName={'page-item'}
                        breakLinkClassName={'page-link'}
                        activeClassName={'active'}
       />
        <ToastContainer
            position="top-right"
            autoClose={1000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            />
        
    </div>
    )
    
}
export default Employee