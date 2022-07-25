import {  useState } from 'react'
import {Link} from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import cookies from 'js-cookie'
import '../../index.css'

function Login(props){
    const [emailId,setEmailId] = useState('');
    const [password,setPassword] = useState('');
    
    

    const  onEnterLogin = event => {
        if (event.key === 'Enter'  || event.code === "NumpadEnter") {
            loginUser()
        }
      }

    const loginUser = async() =>{
        if(emailId !== '' && password !== '' ){
            const data = {
                emailId:emailId.toLowerCase(),
                password
            }
            
                const responseCookie = await fetch(`/setuser`);
                const responseDataCookie = await responseCookie.json();
                console.log(responseDataCookie)
     

            const options = {
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body: JSON.stringify(data),
            }

            const response = await fetch("/login",options)
            const responseData = await response.json()
            if (response.status === 200) {
                toast.success('Login successful', {
                    position: "top-right",
                    autoClose: 1000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme:'colored',
                    });
                // console.log(responseData)
                
                cookies.set("jwt_token",responseData.jwt_token,{expires :1/96, secure :"true", sameSite: "strict"})
                const {history} = props
                function sleep(ms) {
                    return new Promise(resolve => setTimeout(resolve, ms));
                  }
                await sleep(1000);
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
                this.setState({
                  emailId: '',
                  password: '',
                })
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

    return(
            <div className='login-bg-container'>
                <h1 className='welcome-heading'>Welcome</h1>
                <form className='login-form-container'>
                    <h2 className='login-heading'>Login</h2>
                    <label htmlFor='emailId' >Enter EmailId</label>
                    <input type="text" id="emailId" className='input' placeholder="EmailId" onKeyDown={onEnterLogin}  value={emailId} onChange={(event) =>setEmailId(event.target.value)}/><br />
                    <label htmlFor='password'>Enter Password</label> 
                    <input type="password" id="password" className='input' onKeyDown={onEnterLogin} placeholder="Password"  value={password} onChange={(event) =>setPassword(event.target.value)}/><br />
                    <button type="button" className='login-button'  onClick={loginUser}>Login</button>
                    <Link to='/register'>
                    <button type='button' className='new-user-register'><p>New user Register</p></button>
                    </Link>
                </form>
                <ToastContainer />
            </div>
        );
  
    }
export default Login