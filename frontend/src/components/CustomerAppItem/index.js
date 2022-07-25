import {AiOutlineEdit} from "react-icons/ai"
import {RiDeleteBin6Line} from 'react-icons/ri'
import {Link} from "react-router-dom"


const CustomerAppItem = (props) =>{
    const {customerAppDetails,deleteCustomerApp,count} = props
    const {_id,customerName,appName,appVersion,environmentName,uploadUrl,downloadUrl} = customerAppDetails
    const onDeleteCustomerApp = () =>{
        deleteCustomerApp(_id)
    }  
   
    return(
        
        <tr>
            <td> {count}</td>
            <td>{customerName}</td>
            <td>{appName}</td>
            <td>{environmentName}</td>
            <td>{appVersion}</td>
            <td>{uploadUrl}</td>
            <td>{downloadUrl}</td>
            <td>
                <Link to={`/customer-app/${_id}`}>
                    <AiOutlineEdit size={25} color="#00BFFF"  className="edit" />
                </Link>
            </td>
            <td>
                <RiDeleteBin6Line size={25} color="red" className="delete" onClick={onDeleteCustomerApp}/>
            </td>
        </tr>
       
    )
}
export default CustomerAppItem