const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();
const Schemas = require('../models/Schema.js');
const jwt = require("jsonwebtoken");
const cookieParser = require('cookie-parser');
const { request, response } = require("express");
let app = express()
app.use(cookieParser());
/*router.get("/login",(request,response) =>{
    const data = {
        name:"raj"
    };
    response.send(data)
});
*/
//set user cookie
router.get('/setuser', (req, res)=>{
    res.cookie('userCookie', 'Random', { expires: new Date(Date.now() + 900000), httpOnly: true, secure: true,sameSite:true });
    res.send({message:'user data added to cookie'});
    });
      
  
//remove user cookie
router.get('/logout', (req, res)=>{
    //it will clear the userData cookie
    res.clearCookie('userCookie');
    res.send('user logout successfully');
    });

// delete customer api
router.delete("/customers",async(request,response) =>{
    const {id} = request.body 
    console.log(id)
    const customers = Schemas.Customers;
    await customers.deleteOne({_id:id})
    
    const resultMsg = {
        message :"Customer deleted successfully"
    }
    response.send(resultMsg)
    response.status(200)
})

// delete employee api
router.delete("/employees",async(request,response) =>{
    const {id} = request.body 
    console.log(id)
    const employees = Schemas.Employees;
    await employees.deleteOne({_id:id})
    
    const resultMsg = {
        message :"Employee deleted successfully"
    }
    response.send(resultMsg)
    response.status(200)
})


// get customers info 
router.get('/customersInfo',async(request,response) =>{
    const customer = Schemas.Customers
    const customersList = await customer.find({}).exec((error,customersData) =>{
        if (error) throw error;
        if (customersData) {
            const data = customersData.map(eachItem =>(eachItem.name))
            const responseData = {
                list : data
            }
           
            response.send(responseData)
            response.status(200);
        }  
    })
});
// get customer data api
router.get("/customer",async(request,response) =>{
    const customer = Schemas.Customers
    const customersList = await customer.find({}).exec((error, customerData) => {
        if (error) throw error;
        if (customerData) {
            response.send(JSON.stringify(customerData));
            response.status(200);
        } 
    });
    
});

//get particular customer
router.get('/customers/:id',  async(request, response) => {
    const {id} = request.params
    // console.log(id)
    const customer = Schemas.Customers;
    const customerDetails = await customer.findById(id).exec((err, customerData) => {
        if (err) throw err;
        if (customerData) {
            response.send(JSON.stringify(customerData));
            response.status(200);
        } 
    });

});

//update customer

router.put("/updateCustomer",async(request,response) =>{
    const {customerName,customerPin,id,customerEmailId} = request.body 
    const customer = Schemas.Customers;
    const customerRequest = await customer.findById(id)
    customerRequest.name = customerName
    customerRequest.pin = customerPin
    customerRequest.emailId = customerEmailId
    await customerRequest.save()
    const resultMsg = {
        message :"Customer data updated successfully"
    }
    response.send(resultMsg)
    response.status(200)
})

// add new customer api
router.post('/addNewCustomer',async(request,response) =>{
    const {customerEmailId,customerPin,customerName} = request.body
    const customer = Schemas.Customers
    const findCustomer = await customer.findOne({emailId:customerEmailId}).exec()
    if(findCustomer === null){
        const newCustomer = new Schemas.Customers({
            emailId: customerEmailId,
            pin:customerPin,
            name:customerName
        });
        try {
            await newCustomer.save((error, newCustomerResults) => {
               
                if (error){
                    const errorMsg = {
                        message : 'Error Saving.'
                    };
                    response.status(500)
                    response.send(errorMsg);
                }else{
                    const responseMsg = {
                        message:"Customer added Successfully"
                    };
                    response.send(responseMsg);
                    response.status(200)
                }
            });
        } catch(error) {
            const errorMsg = {
                message : 'Error Saving data'
            };
            response.status(500)
            response.send(errorMsg);
        }
    }else{
        const message = {
            message:"Customer already exists"
        }
        response.status(401)
        response.send(message)
    }
});




// get employee data api
router.get("/employee",async(request,response) =>{
    const employee = Schemas.Employees
    const employeesList = await employee.find({}).exec((error, employeeData) => {
        if (error) throw error;
        if (employeeData) {
            response.send(JSON.stringify(employeeData));
            response.status(200);
        } 
    });
    
});

//get particular employee
router.get('/employees/:id',  async(request, response) => {
    const {id} = request.params
    // console.log(id)
    const employee = Schemas.Employees;
    const employeeDetails = await employee.findById(id).exec((err, employeeData) => {
        if (err) throw err;
        if (employeeData) {
            response.send(JSON.stringify(employeeData));
            response.status(200);
        } 
    });

});

//update employee

router.put("/updateEmployee",async(request,response) =>{
    const {employeeEmailId,employeeFirstName,employeeLastName,employeeUserName,employeePassword,customer,id} = request.body 
    const employee = Schemas.Employees;
    const employeeRequest = await employee.findById(id)
    employeeRequest.username = employeeUserName
    employeeRequest.firstName = employeeFirstName
    employeeRequest.lastName = employeeLastName
    employeeRequest.emailId = employeeEmailId
    employeeRequest.password = employeePassword
    employeeRequest.customer = customer
    await employeeRequest.save()
    const resultMsg = {
        message :"Employee data updated successfully"
    }
    response.send(resultMsg)
    response.status(200)
})


// add new employee api
router.post('/addNewEmployee',async(request,response) =>{
    const { employeeEmailId,
        employeePassword,
        employeeUserName,
        employeeFirstName,
        employeeLastName,
        customer} = request.body
    const employee = Schemas.Employees
    const findEmployee = await employee.findOne({emailId:employeeEmailId}).exec()
    // console.log(findEmployee)
    if(findEmployee === null){
        const newEmployee = new Schemas.Employees({
            emailId: employeeEmailId,
            password:employeePassword,
            username:employeeUserName,
            firstName:employeeFirstName,
            lastName:employeeLastName,
            customer

        });
        // console.log(newEmployee)
        try {
            await newEmployee.save((error, newEmployeeResults) => {
               
                if (error){
                    const errorMsg = {
                        message : 'Error Saving.'
                    };
                    response.status(500)
                    response.send(errorMsg);
                }else{
                    const responseMsg = {
                        message:"Employee added Successfully"
                    };
                    response.send(responseMsg);
                    response.status(200)
                }
            });
        } catch(error) {
            const errorMsg = {
                message : 'Error Saving data'
            };
            response.status(500)
            response.send(errorMsg);
        }
    }else{
        const message = {
            message:"Employee already exists"
        }
        response.status(401)
        response.send(message)
    }
});

// login request api
router.post("/login",async(request,response) =>{
    const {emailId,password} = request.body
    // console.log(request.body)
    const user = Schemas.Users
    const finduser = await user.findOne({emailId:emailId}).exec()
    console.log(finduser)
    if(finduser !== null){
        console.log(finduser);
        const comparePassword = await bcrypt.compare(password,finduser.password)
        // console.log(comparePassword)
        if(comparePassword){
            const payload = { emailId: emailId };
            const jwt_token = jwt.sign(payload, "secret_key",{expiresIn: "1m" });
            
            response.send({ jwt_token });
            response.status(200)
        }else{
            const message = {
                message:"Incorrect Password"
            }
            response.status(401)
            response.send(message)
        }
    }else{ 
        const errorMsg = {
            message:"User does not exists. Please register"
        };
        response.status(404);
        response.send(errorMsg);
    }
});

// register request api
router.post('/register',  async(request, response) => {
    const {emailId,password} = request.body
    const user = Schemas.Users;
    const findEmailId = await user.findOne({emailId:emailId}).exec();
    console.log(findEmailId)
    if(findEmailId === null){
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new Schemas.Users({
            emailId: emailId,
            password:hashedPassword
        });
        console.log(newUser)
        try {
            await newUser.save((error, newUserResults) => {
               
                if (error){
                    const errorMsg = {
                        message : 'Error Saving.'
                    };
                    response.status(500)
                    response.send(errorMsg);
                }else{
                    const responseMsg = {
                        message:"User Created Successfully"
                    };
                    response.send(responseMsg);
                    response.status(200)
                }
            });
        } catch(error) {
            const errorMsg = {
                message : 'Error Saving data'
            };
            response.status(500)
            response.send(errorMsg);
        }
    }else{
        const errorMsg = {
            message:"User already exists"
        };
        response.send(errorMsg);
        response.status(401)
    }
});

// get apps data into table 
router.get('/apps',async(request,response) =>{
    const apps = Schemas.Apps
    const appsList = await apps.find({}).exec((error,appsData) =>{
        
        if (error) throw error;
        if (appsData) {          
            response.send(appsData)
            response.status(200);
        }  
    })
});

// add app 
router.post('/addApp',async(request,response) =>{
    const { appName, appDescription} = request.body
    console.log(appDescription)
    const appsInfo = Schemas.Apps
    const findApp = await appsInfo.findOne({appName:appName}).exec()
    // console.log(findApp)
    if(findApp === null){
        const newAppData = new Schemas.Apps({
            appName:appName,
            appDescription:appDescription

        });
        // console.log(newAppData)
        try {
            await newAppData.save((error, newAppResults) => {
               
                if (error){
                    const errorMsg = {
                        message : 'Error Saving.'
                    };
                    response.status(500)
                    response.send(errorMsg);
                }else{
                    const responseMsg = {
                        message:"App added Successfully"
                    };
                    response.send(responseMsg);
                    response.status(200)
                }
            });
        } catch(error) {
            const errorMsg = {
                message : 'Error Saving App data'
            };
            response.status(500)
            response.send(errorMsg);
        }
    }else{
        const message = {
            message:"App already exists"
        }
        response.status(401)
        response.send(message)
    }
});

// get app names in app version
router.get('/appsNameList',async(request,response) =>{
    const apps = Schemas.Apps
    const appsList = await apps.find({}).exec((error,appsData) =>{
        if (error) throw error;
        if (appsData) {
            const data = appsData.map(eachItem =>(eachItem.appName))
            const responseData = {
                list : data
            }
            response.send(responseData)
            response.status(200);
        }  
    })
});

// get app version info into table
router.get('/appsVersionData',async(request,response) =>{
    const appVersion = Schemas.AppVersions
    const appsVersion = await appVersion.find({}).exec((error,appsVersionData) =>{
        
        if (error) throw error;
        if (appsVersionData) {          
            response.send(appsVersionData)
            response.status(200);
        }  
    })
});
// // add app version
router.post('/addAppVersion',async(request,response) =>{
    const { appName, appVersion} = request.body
    const appVersionInfo = Schemas.AppVersions
    const findAppVersion = await appVersionInfo.findOne({appVersion:appVersion,appName:appName}).exec()
    console.log(findAppVersion)
    if(findAppVersion === null){
        const newAppVersionData = new Schemas.AppVersions({
            appVersion:appVersion,appName:appName
        });
        // console.log(newEnvironmentData)
        try {
            await newAppVersionData.save((error, newAppVersionDataResults) => {
                if (error){
                    const errorMsg = {
                        message : 'Error Saving App Version data'
                    };
                    response.status(500)
                    response.send(errorMsg);
                }else{
                    const responseMsg = {
                        message:"Data added Successfully"
                    };
                    response.send(responseMsg);
                    response.status(200)
                }
            });
        } catch(error) {
            const errorMsg = {
                message : 'Error Saving App Version data'
            };
            response.status(500)
            response.send(errorMsg);
        }
    }else{
        const message = {
            message:"Record already exists"
        }
        response.status(401)
        response.send(message)
    }
});

// get environment info 
router.get('/appVersionInfo',async(request,response) =>{
    const appVersions = Schemas.AppVersions
    const appVersionsList = await appVersions.find({}).exec((error,appVersionsData) =>{
        if (error) throw error;
        if (appVersionsData) {
            const data = appVersionsData.map(eachItem =>(eachItem.appVersion))
            const responseData = {
                list : data
            }
            response.send(responseData)
            response.status(200);
        }  
    })
});
// get environments info into table
router.get('/environments',async(request,response) =>{
    const environments = Schemas.Environments
    const environmentsList = await environments.find({}).exec((error,environmentsData) =>{
        
        if (error) throw error;
        if (environmentsData) {          
            response.send(environmentsData)
            response.status(200);
        }  
    })
});

// add environment
router.post('/addEnvironment',async(request,response) =>{
    const { environmentName, environmentDescription} = request.body
    
    const environmentsInfo = Schemas.Environments
    const findEnvironment = await environmentsInfo.findOne({envName:environmentName}).exec()
    //console.log(findEnvironment)
    if(findEnvironment === null){
        const newEnvironmentData = new Schemas.Environments({
            envName:environmentName,
            envDescription:environmentDescription

        });
        // console.log(newEnvironmentData)
        try {
            await newEnvironmentData.save((error, newEnvironmentResults) => {
               
                if (error){
                    const errorMsg = {
                        message : 'Error Saving.'
                    };
                    response.status(500)
                    response.send(errorMsg);
                }else{
                    const responseMsg = {
                        message:"Environment added Successfully"
                    };
                    response.send(responseMsg);
                    response.status(200)
                }
            });
        } catch(error) {
            const errorMsg = {
                message : 'Error Saving Environment data'
            };
            response.status(500)
            response.send(errorMsg);
        }
    }else{
        const message = {
            message:"Environment already exists"
        }
        response.status(401)
        response.send(message)
    }
});

// get environment info 
router.get('/environmentInfo',async(request,response) =>{
    const environment = Schemas.Environments
    const environmentList = await environment.find({}).exec((error,environmentData) =>{
        if (error) throw error;
        if (environmentData) {
            const data = environmentData.map(eachItem =>(eachItem.envName))
            const responseData = {
                list : data
            }
            response.send(responseData)
            response.status(200);
        }  
    })
});

// get customer environments info into table
router.get('/customerEnv',async(request,response) =>{
    const customerEnvData = Schemas.CustomerEnv
    const customerEnvList = await customerEnvData.find({}).exec((error,customerEnvDataList) =>{
        
        if (error) throw error;
        if (customerEnvDataList) {          
            response.send(customerEnvDataList)
            response.status(200);
        }  
    })
});

// add customer environment
router.post('/addCustomerEnv',async(request,response) =>{
    const { customerName, customerEnvironment} = request.body
    
    const customerEnvironmentsInfo = Schemas.CustomerEnv
    const findCustomerEnvironment = await customerEnvironmentsInfo.findOne({customerName:customerName,environmentName:customerEnvironment}).exec()
    // console.log(findCustomerEnvironment)
    if(findCustomerEnvironment === null){
        const newCustomerEnvironmentData = new Schemas.CustomerEnv({
            customerName :customerName,
            environmentName:customerEnvironment
        });
        // console.log(newCustomerEnvironmentData)
        try {
            await newCustomerEnvironmentData.save((error, newCustomerEnvironmentDataResults) => {
               
                if (error){
                    const errorMsg = {
                        message : 'Error Saving.'
                    };
                    response.status(500)
                    response.send(errorMsg);
                }else{
                    const responseMsg = {
                        message:"Record added Successfully"
                    };
                    response.send(responseMsg);
                    response.status(200)
                }
            });
        } catch(error) {
            const errorMsg = {
                message : 'Error Saving data'
            };
            response.status(500)
            response.send(errorMsg);
        }
    }else{
        const message = {
            message:"Record already exists"
        }
        response.status(401)
        response.send(message)
    }
});

// get customer app info into table
router.get('/customerApp',async(request,response) =>{
    const {search} = request.query
    const customerAppData = Schemas.CustomerApp
    const customerAppList = await customerAppData.find({}).exec((error,customerAppDataList) =>{
    // console.log(customerAppDataList)
        if (error) throw error;
        if (customerAppDataList) {
            const data = customerAppDataList.filter(eachItem=>{
                if(eachItem.appName.toLowerCase().includes(search.toLowerCase())){
                    return eachItem
                }
                return null
            })
            
            response.send(data)
            response.status(200);
        }  
    })
});

// delete customer app
router.delete("/customerApp",async(request,response) =>{
    const {id} = request.body 
    //console.log(id)
    const customerAppdetails = Schemas.CustomerApp;
    await customerAppdetails.deleteOne({_id:id})
    
    const resultMsg = {
        message :"Record deleted successfully"
    }
    response.send(resultMsg)
    response.status(200)
})

// add customer app
router.post('/addCustomerApp',async(request,response) =>{
    const { customerName,environmentName,appName,appVersion,uploadUrl,downloadUrl} = request.body
    
    const customerAppInfo = Schemas.CustomerApp
    const findCustomerApp = await customerAppInfo.findOne({customerName:customerName,environmentName:environmentName,appName:appName,appVersion:appVersion}).exec()
    // console.log(findCustomerEnvironment)
    if(findCustomerApp === null){
        const newCustomerAppData = new Schemas.CustomerApp({
            customerName:customerName,
            environmentName:environmentName,
            appName:appName,
            appVersion:appVersion,
            uploadUrl:uploadUrl,
            downloadUrl:downloadUrl
        });
        // console.log(newCustomerEnvironmentData)
        try {
            await newCustomerAppData.save((error, newCustomerAppDataResults) => {
               
                if (error){
                    const errorMsg = {
                        message : 'Error Saving.'
                    };
                    response.status(500)
                    response.send(errorMsg);
                }else{
                    const responseMsg = {
                        message:"Record added Successfully"
                    };
                    response.send(responseMsg);
                    response.status(200)
                }
            });
        } catch(error) {
            const errorMsg = {
                message : 'Error Saving data'
            };
            response.status(500)
            response.send(errorMsg);
        }
    }else{
        const message = {
            message:"Record already exists"
        }
        response.status(401)
        response.send(message)
    }
});

//get particular customerApp
router.get('/customer-app/:id',  async(request, response) => {
    const {id} = request.params
    //console.log(id)
    const customerApp = Schemas.CustomerApp;
    const customerAppDetails = await customerApp.findById(id).exec((err, customerAppData) => {
        if (err) throw err;
        if (customerAppData) {
            response.send(JSON.stringify(customerAppData));
            response.status(200);
        } 
    });

});

//update customer app

router.put("/updateCustomerApp",async(request,response) =>{
    const { customerName, environmentName, appName, appVersion, uploadUrl,downloadUrl,id} = request.body 
    const customerAppDataRequest = Schemas.CustomerApp;
    const customerAppRequest = await customerAppDataRequest.findById(id)
    customerAppRequest.customerName = customerName
    customerAppRequest.appName = appName
    customerAppRequest.appVersion = appVersion
    customerAppRequest.environmentName = environmentName
    customerAppRequest.uploadUrl = uploadUrl
    customerAppRequest.downloadUrl = downloadUrl
    await customerAppRequest.save()
    const resultMsg = {
        message :"Customer app updated successfully"
    }
    response.send(resultMsg)
    response.status(200)
    
})

module.exports = router ;

