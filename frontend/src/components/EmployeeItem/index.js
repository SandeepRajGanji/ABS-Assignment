import {AiOutlineEdit} from "react-icons/ai"
import {RiDeleteBin6Line} from 'react-icons/ri'
import {Link} from "react-router-dom"

const EmployeeItem = (props) =>{
    const {employeeDetails,deleteEmployee,count} = props
    const {_id,username,firstName,lastName,customer,emailId} = employeeDetails
      
    // console.log(employeeDetails)
    const onDeleteEmployee = () =>{
        deleteEmployee(_id)
    }  
    return(
        <tr>
            <td>{count}</td>
            <td>{username}</td>
            <td>{firstName}</td>
            <td>{lastName}</td>
            <td>{customer}</td>
            <td>{emailId}</td>
            <td>
                <Link to={`/employees/${_id}`}>
                    <AiOutlineEdit size={25} color="#00BFFF"  className="edit" />
                </Link>
            </td>
            <td>
                <RiDeleteBin6Line size={25} color="red" className="delete" onClick={onDeleteEmployee} />
            </td>
        </tr>
    )
}
export default  EmployeeItem 