import React from 'react';
import { withRouter } from "react-router-dom"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import cookies from 'js-cookie'
import './index.css'

const Header = (props) =>{
    const logout = async() =>{
        const {history} = props
        const response = await fetch('/logout')
        console.log(response.json())
        toast.info("Logging out!", {
            position: "top-center",
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
        await sleep(1000);
        cookies.remove("jwt_token")
        history.replace("/login")
    }
    return(
        <>
            <div className='nav-header'>   
                    <button type="button" className="btn btn-success logout" onClick={logout}>Logout</button>   
            </div>
        <ToastContainer />
      </>
    )
}

export default withRouter(Header)