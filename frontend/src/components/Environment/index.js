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

const Environment = () =>{
    let [environmentName,setEnvironmentName] = useState("")
    let [environmentDescription,setEnvironmentDescription] = useState("")
    let [environmentData, setEnvironmentData] = useState([]);
    let [activePage,setActivePage] = useState('1')
    let [searchInput,setSearchInput] = useState('')
    let [order,setOrder] = useState('ASC')

    const sorting = (col) =>{
        if(order === "ASC"){
            const sortedEnvironmentData = [...environmentData].sort((a,b) =>
            a[col].toLowerCase() > b[col].toLowerCase() ? 1 : -1);
            setEnvironmentData(sortedEnvironmentData)
            setOrder("DSC")
        }else{
            const sortedEnvironmentData = [...environmentData].sort((a,b) =>
            a[col].toLowerCase() < b[col].toLowerCase() ? 1 : -1);
            setEnvironmentData(sortedEnvironmentData)
            setOrder("ASC")
        }
    }
    const fetchData = async() =>{
        const response = await fetch(`/environments`);
        const responseData = await response.json();
        console.log(responseData)
        setEnvironmentData(responseData)
    };
    useEffect(()=>{
        fetchData();
    },[])

    const getPaginatedEnvironmentList = () =>{
        // console.log(activePage)
        const copyEnvironmentData =Object.assign([],environmentData)
         const startIndex = (activePage-1) * 5
         const endIndex = (activePage*5)
        // console.log(startIndex,endIndex)
         return copyEnvironmentData.slice(startIndex,endIndex)
         
       }
    const noOfPages  = Math.ceil(environmentData.length /5) 
    const paginatedEnvironmentList = getPaginatedEnvironmentList()
    let count = 0
    

    const addEnvironment = async() =>{
        if(environmentName !=="" && environmentDescription!==""){
            const data = {
                environmentName,
                environmentDescription,
            }
            //console.log(data)
            const options = {
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify(data)
            }
           

            const response = await fetch("/addEnvironment",options)
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
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme:'colored',
                    });
                setEnvironmentName(environmentName="")
                setEnvironmentDescription(environmentDescription="")
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
                        <span className="input-group-text text-light bg-info lighten-2" id="basic-text1"><AiOutlineSearch size={20}  /></span>
                    </div>
                    <input className="form-control my-0 py-1" type="text" onKeyDown={onEnterSearchInput} onChange={(e) =>setSearchInput(e.target.value)} placeholder="Search" aria-label="Search" />
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
                        <h5 className='pb-3'>Add Environment</h5>
                        <input type="text" placeholder='Enter Environment Name' className='mb-2 w-100 input' value={environmentName} onChange={(event) =>setEnvironmentName(event.target.value)}/><br />
                        <input type="text-area"  placeholder='Enter Environment Description' className='mb-2 w-100 input ' value={environmentDescription} onChange={(event) =>setEnvironmentDescription(event.target.value)}/><br />
                        <button className='btn btn-success m-2' type="button" onClick={addEnvironment}>Submit</button>
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
                        <th  onClick={() =>sorting("environmentName")}>
                            Environment Name {order === "DSC" ? <BsSortAlphaDownAlt /> : <BsSortAlphaUpAlt />}
                        </th>
                        <th>
                            Environment Description
                        </th>                    
                    </tr>
                </thead>
                
                {
                   
                    <tbody>{paginatedEnvironmentList.length > 0 ?
                        paginatedEnvironmentList && paginatedEnvironmentList.map((eachApp) =>(
                         <tr key={eachApp._id}  count = {count += 1} >
                            <td> {count}</td>
                            <td>{eachApp.envName}</td>
                            <td>{eachApp.envDescription}</td>
                          </tr>  
                        ))  : <tr >
                        <td colSpan="8"><p className="no-records">No records found</p>    </td>
                        </tr>             
                }
                </tbody>
                
            }
        
            </table>
            </div>
            {
                 paginatedEnvironmentList.length > 0 ? 
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
export default  Environment