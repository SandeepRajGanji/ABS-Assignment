import { useState,useEffect } from "react"
import {Link} from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import {AiOutlineClose} from 'react-icons/ai'
import {IoSave,IoChevronBackCircleSharp} from 'react-icons/io5'

import 'react-toastify/dist/ReactToastify.css';
import './index.css'
const EditCustomerApp = (props) =>{
    let [customerName,setCustomerName] = useState("")
    let [appName,setAppName] = useState("")
    let [appVersion,setAppVersion] = useState("")
    let [environmentName,setEnvironmentName] = useState("")
    let [uploadUrl,setUploadUrl] = useState("")
    let [downloadUrl,setDownloadUrl] = useState("")

    let [customerNameList,setCustomerNameList] = useState()
    let [environmentNameList,setEnvironmentNameList] = useState()
    let [appNameList,setAppNameList] = useState()
    let [appVersionList,setAppVersionList] = useState()

    const fetchData = async() =>{
        const {match}  = props
        const id = match.params.id
        
        const response = await fetch(`/customer-app/${id}`);
        const responseData = await response.json();
        const {customerName,environmentName,appName,appVersion,uploadUrl,downloadUrl} = responseData
        console.log(responseData)
        setCustomerName(customerName)
        setEnvironmentName(environmentName)
        setAppName(appName)
        setAppVersion(appVersion)
        setUploadUrl(uploadUrl)
        setDownloadUrl(downloadUrl)
        
    };

    useEffect(()=>{
        fetchData();
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

    const fetchCustomers = async() =>{
        const response = await fetch('/customersInfo')
        const responseData = await response.json()
        // console.log(responseData)
        const temp = ["Select Customer",...responseData.list]
        setCustomerNameList(temp)
    }
    
    useEffect(()=>{
        fetchCustomers();
    },[])

    const updateCustomerAppData = async () =>{
        const {match} = props
        const id = match.params.id
        if(customerName !=="" && environmentName!=="" && appName !== "" && appVersion !=="" && uploadUrl !== "" && downloadUrl !== ""){
            const data = {
                customerName,
                environmentName,
                appName,
                appVersion,
                uploadUrl:uploadUrl.toLowerCase(),
                downloadUrl:downloadUrl.toLowerCase(),
                id
            } // console.log(data)
            const options = {
                method: 'PUT',
                headers:{
                "Content-Type":"application/json",
                },
                body: JSON.stringify(data),
            }
        
            const response = await fetch('/updateCustomerApp',options)
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
                    history.replace('/customer-app')
                    
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
        <>
            <tr>
            <td></td>
            <td> 
                <select className='w-100 mb-2 p-1' value={customerName} onChange={(event) =>setCustomerName(event.target.value)}>
                            {customerNameList && customerNameList.map(e =>(
                                <option  key={e} value={e}>{e}</option>
                            ))}
                </select>
            </td>
            <td>
                <select className='w-100 mb-2 p-1' value={appName} onChange={(event) =>setAppName(event.target.value)}>
                            {appNameList && appNameList.map(e =>(
                                <option  key={e} value={e}>{e}</option>
                            ))}
                </select>
            </td>
            <td>
                <select className='w-100 mb-2 p-1' value={environmentName} onChange={(event) =>setEnvironmentName(event.target.value)}>
                            {environmentNameList && environmentNameList.map(e =>(
                                <option  key={e} value={e}>{e}</option>
                            ))}
                </select>
            </td>
            <td>
                <select className='w-100 mb-2 p-1' value={appVersion} onChange={(event) =>setAppVersion(event.target.value)}>
                            {appVersionList && appVersionList.map(e =>(
                                <option  key={e} value={e}>{e}</option>
                            ))}
                </select>
            </td>
            <td>
                <input type="url"  placeholder='Enter Upload URL' className='mb-2 w-100 input'  value={uploadUrl} onChange={(event) =>setUploadUrl(event.target.value)}/><br />
            </td>
            <td><input type="url"  placeholder='Enter Download URL' className='mb-2 w-100 input' value={downloadUrl} onChange={(event) =>setDownloadUrl(event.target.value)}/><br />
            </td>
            <td>
            <IoSave size={25} className="save" onClick={updateCustomerAppData}/>
            </td>
            <td>
            
            <Link to="/customer-app"  className='link'>
                    <IoChevronBackCircleSharp  size={25} className="close"/>
            </Link>
           
            </td>
        </tr>
        <ToastContainer />

        </>
    )
}
export default EditCustomerApp