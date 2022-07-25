import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './index.css'
const EditCustomer = (props) =>{
    
    let [customerName,setCustomerName] = useState("")
    let [customerPin,setCustomerPin] = useState()
    let [customerEmailId,setCustomerEmailId] = useState("")

    const fetchData = async() =>{
        const {match}  = props
        const id = match.params.id
        const response = await fetch(`/customers/${id}`);
        const responseData = await response.json();
        const {name,emailId,pin} = responseData
        
        setCustomerName(name)
        setCustomerPin(pin)
        setCustomerEmailId(emailId)

        
    };
    useEffect(()=>{
        fetchData();
    },[])
    
    const updateCustomer = async() =>{
        const {match} = props
        const id = match.params.id  


        if(customerEmailId !== "" && customerPin !== 0 && customerName !== ""){
            const data = {
                customerName,customerEmailId:customerEmailId.toLowerCase(),customerPin,id
            }
            console.log(data)
            const options = {
                method: 'PUT',
                headers:{
                "Content-Type":"application/json",
                },
                body: JSON.stringify(data),
            }
        
            const response = await fetch('/updateCustomer',options)
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
                history.replace('/customers')
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
                        <h5 className='pb-3'>Update Customer</h5>
                        <input type="text" placeholder='Enter Customer Name' className='mb-2 w-100 input' value={customerName} onChange={(event) =>setCustomerName(event.target.value)}/><br />
                        <input type="number"  placeholder='Enter Customer PIN' className='mb-2 w-100 input'  value={customerPin} onChange={(event) =>setCustomerPin(event.target.value)}/><br />
                        <input type="text"  placeholder='Enter Customer EmailId' className='mb-2 w-100 input' disabled value={customerEmailId} onChange={(event) =>setCustomerEmailId(event.target.value)}/><br />
                        <button className='btn btn-danger m-2' type="button"><Link to="/customers"  className='link'>
                            Cancel
                        </Link>
                        </button>
                        <button className='btn btn-success m-2' type="button" onClick={updateCustomer}>Submit</button>
                    </div>
                    <ToastContainer />
        </div>
    )
}
export default EditCustomer