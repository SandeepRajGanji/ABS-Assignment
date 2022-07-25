import {  useState } from 'react'
import {Link} from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import '../Login/index.css'

function Register(props){
    const [emailId ,setEmailId] = useState('');
    const [password,setPassword] = useState('');
    const [confirmPassword,setConfirmPassword] = useState('');

    const registerUser = async() =>{
        if(emailId !== '' && password !== '' && confirmPassword !==''){
            if(password === confirmPassword){
                const data = {
                    emailId:emailId.toLowerCase(),
                    password
                }
    
                const options = {
                    method:"POST",
                    headers:{
                        "Content-Type":"application/json"
                    },
                    body: JSON.stringify(data),
                }
    
                const response = await fetch("/register",options)
                const responseData = await response.json()
                
                console.log(responseData)
                if (response.status === 200) {
                    alert(responseData.message);
                    const {history} = props
                    history.replace('/login')
                } else {
                    alert(responseData.message);
                    const {history} = props
                    history.replace('/register')
                  }
            }else{
                toast.error('Passwords must be same', {
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

    return(
            <div className='login-bg-container'>
                <h1 className='welcome-heading'>Hello There</h1>
                <form className='login-form-container'>
                    <h2 className='login-heading'>Register</h2>
                    <label htmlFor='emailId ' >Enter EmailId</label>
                    <input type="text" id="emailId " className='input' placeholder="EmailId" value={emailId} onChange={(event) =>setEmailId(event.target.value)}/><br />
                    <label htmlFor='password'>Enter Password</label> 
                    <input type="password" id="password" className='input' placeholder="Password"  value={password} onChange={(event) =>setPassword(event.target.value)}/><br />
                    <label htmlFor='confirm-password'>Confirm Password</label> 
                    <input type="password" id="confirm-password" className='input' placeholder="Confirm Password"  value={confirmPassword} onChange={(event) =>setConfirmPassword(event.target.value)}/><br />
                    <button type="button" className='login-button' onClick={registerUser}>Register</button>
                    <Link to='/login'>
                    <button type='button' className='new-user-register'><p>Already a user Login</p></button>
                    </Link>
                </form>
                <ToastContainer />
            </div>
        );
  
    }
export default Register