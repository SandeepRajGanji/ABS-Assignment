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
import CustomerItem from '../CustomerItem'
import './index.css'
import Header from '../Header';

const Customer = () =>{
    
    let [customerName,setCustomerName] = useState("")
    let [customerPin,setCustomerPin] = useState()
    let [customerEmailId,setCustomerEmailId] = useState("")
    let [customerData, setCustomerData] = useState([]);
    let [activePage,setActivePage] = useState('1')
    let [searchInput,setSearchInput] = useState('')
    let [order,setOrder] = useState('ASC')

    const sorting = (col) =>{
        if(order === "ASC"){
            const sortedCustomerData = [...customerData].sort((a,b) =>
            a[col].toLowerCase() > b[col].toLowerCase() ? 1 : -1);
            setCustomerData(sortedCustomerData)
            setOrder("DSC")
        }else{
            const sortedCustomerData = [...customerData].sort((a,b) =>
            a[col].toLowerCase() < b[col].toLowerCase() ? 1 : -1);
            setCustomerData(sortedCustomerData)
            setOrder("ASC")
        }
    }
    const fetchData = async() =>{
        const response = await fetch(`/customer`);
        const responseData = await response.json();
        setCustomerData(responseData)
    };
    useEffect(()=>{
        fetchData();
    },[])

    
    
    const getPaginatedCustomerList = () =>{
       // console.log(activePage)
       const copyCustomerData =Object.assign([],customerData)
        const startIndex = (activePage-1) * 5
        const endIndex = (activePage*5)
       // console.log(startIndex,endIndex)
        return copyCustomerData.slice(startIndex,endIndex)
        
      }
    const noOfPages  = Math.ceil(customerData.length /5) 
    const paginatedCustomerList = getPaginatedCustomerList()

    const deleteCustomer = async(id) =>{ 
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
        const response = await fetch('/customers',options);
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
    }
   
    const addNewCustomer = async(props) =>{
        if(customerEmailId !== "" && customerPin !== 0 && customerName !== ""){
            const data = {
                customerEmailId:customerEmailId.toLowerCase(),
                customerPin,
                customerName
            }
            const options = {
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify(data)
            }
           

            const response = await fetch("/addNewCustomer",options)
            const responseData = await response.json()
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
                setCustomerEmailId(customerEmailId='')
                setCustomerName(customerName='')
                setCustomerPin(customerPin='')
               
                fetchData();
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
    const  onEnterSearchInput = event => {
        if (event.key === 'Enter') {
            fetchData()
        }
      }
    const resetSearchInput = () =>{
        setSearchInput(searchInput="")
        fetchData()
    }
    let count = 0;
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
                        <h5 className='pb-3'>Add Customer</h5>
                        <input type="text" placeholder='Enter Customer Name' className='mb-2 w-100 input' value={customerName} onChange={(event) =>setCustomerName(event.target.value)}/><br />
                        <input type="number"  placeholder='Enter Customer PIN' className='mb-2 w-100 input'  value={customerPin} onChange={(event) =>setCustomerPin(event.target.value)}/><br />
                        <input type="text"  placeholder='Enter Customer EmailId' className='mb-2 w-100 input' value={customerEmailId} onChange={(event) =>setCustomerEmailId(event.target.value)}/><br />
                        <button className='btn btn-success m-2' type="button" onClick={addNewCustomer}>Submit</button>
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
                    <th  onClick={() =>sorting("name")}>
                        Name {order === "DSC" ? <BsSortAlphaDownAlt /> : <BsSortAlphaUpAlt />}
                    </th>
                    <th>
                        PIN
                    </th>
                    <th  onClick={() =>sorting("emailId")}>
                        EmailID {order === "DSC" ? <BsSortAlphaDownAlt /> : <BsSortAlphaUpAlt />}
                    </th>
                    <th colSpan="2">
                        Actions
                    </th>
                 
                </tr>
            </thead>
            
            {
                <tbody>
                    { paginatedCustomerList.length > 0 ?
                        paginatedCustomerList.map(eachCustomer =>(
                            <CustomerItem key={eachCustomer._id} 
                            customerDetails={eachCustomer}
                            deleteCustomer={deleteCustomer}
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
                 paginatedCustomerList.length > 0 ? 
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
       <ToastContainer />
        
    </div>
    )
    
}
export default Customer