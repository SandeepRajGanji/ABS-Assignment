import Sidebar from "../Sidebar"
import Header from "../Header"
import {AiFillFileAdd,AiOutlineSearch} from 'react-icons/ai'
import {RiFileExcel2Fill} from'react-icons/ri'
import {BiRefresh} from'react-icons/bi'
import {BsSortAlphaDownAlt,BsSortAlphaUpAlt} from 'react-icons/bs'
import {useState,useEffect} from 'react'
import Popup from 'reactjs-popup'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ReactPaginate from 'react-paginate'
import CustomerAppItem from "../CustomerAppItem"

import './index.css'
const CustomerApp = (props) =>{

    let [customerName,setCustomerName] = useState("")
    let [appName,setAppName] = useState("")
    let [appVersion,setAppVersion] = useState("")
    let [environmentName,setEnvironmentName] = useState("")
    let [uploadUrl,setUploadUrl] = useState("")
    let [downloadUrl,setDownloadUrl] = useState("")
    let [activePage,setActivePage] = useState('1')
    let [customerNameList,setCustomerNameList] = useState()
    let [environmentNameList,setEnvironmentNameList] = useState()
    let [appNameList,setAppNameList] = useState()
    let [appVersionList,setAppVersionList] = useState()

    let [customerAppData,setCustomerAppData] = useState([])
    let [searchInput,setSearchInput] = useState('')

    let [order,setOrder] = useState('ASC')

    const sorting = (col) =>{
        if(order === "ASC"){
            const sortedCustomerAppData = [...customerAppData].sort((a,b) =>
            a[col].toLowerCase() > b[col].toLowerCase() ? 1 : -1);
            setCustomerAppData(sortedCustomerAppData)
            setOrder("DSC")
        }else{
            const sortedCustomerAppData = [...customerAppData].sort((a,b) =>
            a[col].toLowerCase() < b[col].toLowerCase() ? 1 : -1);
            setCustomerAppData(sortedCustomerAppData)
            setOrder("ASC")
        }
    }
    
    const fetchData = async() =>{
        const response = await fetch(`/customerApp?search=${searchInput}`);
        const responseData = await response.json();
        // console.log(responseData)
        setCustomerAppData(responseData)
    };
    useEffect(()=>{
        fetchData();
    },[])

    const fetchCustomerNameList = async() =>{
        const response = await fetch('/customersInfo')
        const responseData = await response.json()
        // console.log(responseData)
        const temp = ["Select Customer Name",...responseData.list]
        setCustomerNameList(temp)
    }

    useEffect(()=>{
        fetchCustomerNameList();
    },[])

    const fetchAppNameList = async() =>{
        const response = await fetch('/appsNameList')
        const responseData = await response.json()
        // console.log(responseData)
        const temp = ["Select App Name",...responseData.list]
        setAppNameList(temp)
    }
    
    useEffect(()=>{
        fetchAppNameList();
    },[])

    const fetchEnvironmentNameList = async() =>{
        const response = await fetch('/environmentInfo')
        const responseData = await response.json()
        // console.log(responseData)
        const temp = ["Select Environment Name",...responseData.list]
        setEnvironmentNameList(temp)
    }
    
    useEffect(()=>{
        fetchEnvironmentNameList();
    },[])

    const fetchAppVersionList = async() =>{
        const response = await fetch('/appVersionInfo')
        const responseData = await response.json()
        // console.log(responseData)
        const temp = ["Select App Version",...responseData.list]
        setAppVersionList(temp)
    }
    
    useEffect(()=>{
        fetchAppVersionList();
    },[])

    

    const getPaginatedCustomerAppList = () =>{
        // console.log(activePage)
        const copyCustomerAppData =Object.assign([],customerAppData)
         const startIndex = (activePage-1) * 5
         const endIndex = (activePage*5)
        // console.log(startIndex,endIndex)
         return copyCustomerAppData.slice(startIndex,endIndex)
         
       }
    
    const noOfPages  = Math.ceil(customerAppData.length / 5)
    const paginatedCustomerAppDataList = getPaginatedCustomerAppList()
    let count = 0
    
    const deleteCustomerApp = async(id) =>{ 
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
        const response = await fetch('/customerApp',options);
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

    const addCustomerApp = async() =>{
        if(customerName !=="" && environmentName!=="" && appName !== "" && appVersion !=="" && uploadUrl !== "" && downloadUrl !== ""){
            const data = {
                customerName,
                environmentName,
                appName,
                appVersion,
                uploadUrl:uploadUrl.toLowerCase(),
                downloadUrl:downloadUrl.toLowerCase()
            }
            // console.log(data)
            const options = {
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify(data)
            }
           
        
            const response = await fetch("/addCustomerApp",options)
            const responseData = await response.json()
            if(response.status === 200){
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
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme:'colored',
                    });
                    setCustomerName(customerName="")
                    setEnvironmentName(environmentName="")
                    setAppName(appName="")
                    setAppVersion(appVersion="")
                    setUploadUrl(uploadUrl="")
                    setDownloadUrl(downloadUrl="")
                    setSearchInput(searchInput="")
                    setOrder(order="ASC")

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
    
    return( 
        <div className="home-container">
           <Sidebar />   
           <Header />  
           
           <div className="search-add-record-container">
                <div className="search-container input-group md-form form-sm form-1 pl-0">
                    <div className="input-group-prepend">
                        <span className="input-group-text text-white  bg-info lighten-2" id="basic-text1"><AiOutlineSearch size={20}  onClick={fetchData}/></span>
                    </div>
                    <input className="form-control my-0 py-1" type="text" value={searchInput} onKeyDown={onEnterSearchInput} onChange={(e) =>setSearchInput(e.target.value)} placeholder="Search" aria-label="Search" />
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
                                    <h5 className='pb-3'>Add Customer App</h5>
                                    <select className='w-100 mb-2 p-1' value={customerName} onChange={(event) =>setCustomerName(event.target.value)}>
                                        {customerNameList && customerNameList.map(e =>(
                                            <option  key={e} value={e}>{e}</option>
                                        ))}
                                    </select>
                                    <select className='w-100 mb-2 p-1' value={appName} onChange={(event) =>setAppName(event.target.value)}>
                                        {appNameList && appNameList.map(e =>(
                                            <option  key={e} value={e}>{e}</option>
                                        ))}
                                    </select>
                                    <select className='w-100 mb-2 p-1' value={environmentName} onChange={(event) =>setEnvironmentName(event.target.value)}>
                                        {environmentNameList && environmentNameList.map(e =>(
                                            <option  key={e} value={e}>{e}</option>
                                        ))}
                                    </select>
                                    <select className='w-100 mb-2 p-1' value={appVersion} onChange={(event) =>setAppVersion(event.target.value)}>
                                        {appVersionList && appVersionList.map(e =>(
                                            <option  key={e} value={e}>{e}</option>
                                        ))}
                                    </select>
                                    <input type="url"  placeholder='Enter Upload URL' className='mb-2 w-100 input'  value={uploadUrl} onChange={(event) =>setUploadUrl(event.target.value)}/><br />
                                    <input type="url"  placeholder='Enter Download URL' className='mb-2 w-100 input' value={downloadUrl} onChange={(event) =>setDownloadUrl(event.target.value)}/><br />
                                
                                    <button className='btn btn-success m-2' type="button" onClick={addCustomerApp}>Submit</button>
                                    <button className='btn btn-danger m-2' type="button" onClick={() => close()}>Close</button>
                                </div>
                            </div>
                        )}
                    </Popup>
                    <RiFileExcel2Fill size={25} className="excel-icon"/>
                </div>
            </div>
            <div className="div1">
            <table className="table table-light table-hover">
            <thead>
                <tr>
                    <th>
                        S.No 
                    </th>
                    <th onClick={() =>sorting("customerName")}>
                        Customer Name {order === "DSC" ? <BsSortAlphaDownAlt /> : <BsSortAlphaUpAlt />}
                    </th>
                    <th onClick={() =>sorting("appName")}>
                        App Name {order === "DSC" ? <BsSortAlphaDownAlt /> : <BsSortAlphaUpAlt />}
                    </th>
                    <th onClick={() =>sorting("environmentName")}>
                        Environment Name {order === "DSC" ? <BsSortAlphaDownAlt /> : <BsSortAlphaUpAlt />}
                    </th>        
                    <th>
                        App Version
                    </th>  
                    <th>
                        Upload URL
                    </th>  
                    <th>
                        Download URL
                    </th> 
                    <th colSpan={2}>
                        Actions
                    </th>            
                </tr>
            </thead>
            {
              
                <tbody>{
                    paginatedCustomerAppDataList.length > 0 ? 
                     paginatedCustomerAppDataList && paginatedCustomerAppDataList.map((eachItem) =>(
                        
                        <CustomerAppItem key={eachItem._id} 
                        customerAppDetails={eachItem}
                        deleteCustomerApp={deleteCustomerApp}
                        count = {count+=1}
                        />
                       
                    ))   : <tr >
                        <td colSpan="8"><p className="no-records">No records found</p>    </td>
                        </tr>             
                }
                </tbody>
                
            }
        
            </table>
            </div>
            
            
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
export default CustomerApp