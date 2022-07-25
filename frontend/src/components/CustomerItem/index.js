import {AiOutlineEdit} from "react-icons/ai"
import {RiDeleteBin6Line} from 'react-icons/ri'
import {Link} from "react-router-dom"

const CustomerItem = (props) =>{
    const {customerDetails,deleteCustomer,count} = props
    const {_id,name,pin,emailId} = customerDetails
    const onDeleteCustomer = () =>{
        deleteCustomer(_id)
    }  

    return(
        <tr>
            <td>{count}</td>
            <td>{name}</td>
            <td>{pin}</td>
            <td>{emailId}</td>
            <td>
                <Link to={`/customers/${_id}`}>
                    <AiOutlineEdit size={25} color="#00BFFF"  className="edit" />
                </Link>
            </td>
            <td>
                <RiDeleteBin6Line size={25} color="red" className="delete" onClick={onDeleteCustomer}/>
            </td>
        </tr>
    )
}
export default CustomerItem