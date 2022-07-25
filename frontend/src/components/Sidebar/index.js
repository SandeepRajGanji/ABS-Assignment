import React from 'react';
import {Link } from "react-router-dom"
import {VscOrganization} from 'react-icons/vsc'
import {MdPerson} from 'react-icons/md'
import {GoVersions} from 'react-icons/go'
import SideNav, {  NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';
import {IoAppsSharp} from 'react-icons/io5'
import {IoLogoAppleAr} from 'react-icons/io5'
import{DiAppstore} from 'react-icons/di'
import {FaEnvira}from 'react-icons/fa'
// Be sure to include styles at some point, probably during your bootstraping
import '@trendmicro/react-sidenav/dist/react-sidenav.css';

import './index.css'

let activeClass={
    selected:"customers"
}

const Sidebar = () =>{
   // console.log(activeClass)
    return(
        <>
            <SideNav
                onSelect={(selected) => {
                    activeClass={selected}
                }}
            >
            <SideNav.Toggle />
             {
                
             }
                <SideNav.Nav selected={activeClass.selected}>
                    <NavItem eventKey="customers">
                        <NavIcon>
                            <Link to="/customers" className='link'>
                                <VscOrganization size={20} className="icon" />
                            </Link>
                        </NavIcon>
                        <NavText>
                            <Link to="/customers" className='link'>
                                Customer
                            </Link>
                        </NavText>    
                    </NavItem>
                    
                    <NavItem eventKey="employees">   
                        <NavIcon>
                            <Link to="/employees" className='link'>
                                <MdPerson size={20} className="icon"/>
                            </Link>
                        </NavIcon>
                        <NavText>
                            <Link to="/employees" className='link'>
                                Employee
                                </Link>
                        </NavText>
                    </NavItem>
                    <NavItem eventKey="app">
                        <NavIcon>
                            <Link to="/app" className='link'>
                                <IoAppsSharp size={20} className="icon" />
                            </Link>
                        </NavIcon>
                        <NavText>
                            <Link to="/app" className='link'>
                                App
                            </Link>
                        </NavText>    
                    </NavItem>
                    <NavItem eventKey="app-version">
                        <NavIcon>
                            <Link to="/app-version" className='link'>
                                <GoVersions size={20} className="icon" />
                            </Link>
                        </NavIcon>
                        <NavText>
                            <Link to="/app-version" className='link'>
                                App Version
                            </Link>
                        </NavText>    
                    </NavItem>
                    <NavItem eventKey="environment">
                        <NavIcon>
                            <Link to="/environment" className='link'>
                                <FaEnvira size={20} className="icon" />
                            </Link>
                        </NavIcon>
                        <NavText>
                            <Link to="/environment" className='link'>
                                Environment
                            </Link>
                        </NavText>    
                    </NavItem>
                    <NavItem eventKey="customer-environment">
                        <NavIcon>
                            <Link to="/customer-environment" className='link'>
                                <IoLogoAppleAr size={20} className="icon" />
                            </Link>
                        </NavIcon>
                        <NavText>
                            <Link to="/customer-environment" className='link'>
                                Customer-Environment
                            </Link>
                        </NavText>    
                    </NavItem>
                    <NavItem eventKey="customer-app">
                        <NavIcon>
                            <Link to="/customer-app" className='link'>
                                <DiAppstore size={20} className="icon" />
                            </Link>
                        </NavIcon>
                        <NavText>
                            <Link to="/customer-app" className='link'>
                                Customer App
                            </Link>
                        </NavText>    
                    </NavItem>
                
                
                </SideNav.Nav>
            </SideNav>
          
        
      </>
    )
}

export default Sidebar