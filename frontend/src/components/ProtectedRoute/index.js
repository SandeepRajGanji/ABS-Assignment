import { Redirect, Route } from "react-router-dom";
import cookies from 'js-cookie'
const ProtectedRoute = (props) =>{
    const jwtToken  = cookies.get('jwt_token');
    if(jwtToken === undefined){
       return <Redirect to="/login" />
    }
    return <Route {...props}/>
}
export default ProtectedRoute