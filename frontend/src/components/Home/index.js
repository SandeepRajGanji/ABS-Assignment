import Cookies from "js-cookie"
import { Redirect} from "react-router-dom"
const Home = () =>{
    const jwtToken = Cookies.get("jwt_token")
    console.log(jwtToken)
    if(jwtToken !== undefined){
        return <Redirect to="/customers" />
    }else{
        return <Redirect to="/login" />
    }
    
}
export default Home