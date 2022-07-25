const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    emailId: {type:String, required:true},
    password: {type:String, required:true}
});

const customerSchema = new Schema({
    name:{type:String,required:true},
    emailId: {type:String, required:true},
    pin: {type:String, required:true}
});

const employeeSchema = new Schema({
    username:{type:String,required:true},
    emailId: {type:String, required:true},
    password: {type:String, required:true},
    firstName:{type:String,required:true},
    lastName: {type:String, required:false},
    customer:{type:String,required:true}
});

const appsSchema = new Schema({
    appName: {type:String, required:true},
    appDescription: {type:String, required:true}
});

const environmentsSchema = new Schema({
    envName: {type:String, required:true},
    envDescription: {type:String, required:true}
});

const appVersionSchema = new Schema({
    appName: {type:String, required:true},
    appVersion: {type:String, required:true}
});

const customerEnvSchema = new Schema({
    customerName: {type:String, required:true},
    environmentName: {type:String, required:true}
});

const customerAppSchema = new Schema({
    customerName: {type:String, required:true},
    appName: {type:String, required:true},
    appVersion: {type:String, required:true},
    environmentName: {type:String, required:true},
    uploadUrl:{type:String,required:true},
    downloadUrl:{type:String,required:true}
});

const Users = mongoose.model('user', userSchema, 'user');
const Customers = mongoose.model('customer', customerSchema, 'customer');
const Employees = mongoose.model('employee', employeeSchema, 'employee');
const Apps = mongoose.model('apps', appsSchema, 'apps');
const AppVersions = mongoose.model('appVersion', appVersionSchema, 'appVersion');
const Environments = mongoose.model('environments', environmentsSchema, 'environments');
const CustomerEnv = mongoose.model('customerEnv', customerEnvSchema, 'customerEnv');
const CustomerApp = mongoose.model('customerApp', customerAppSchema, 'customerApp');
const mySchemas = {'Users':Users,'Customers':Customers,'Employees':Employees,'Apps':Apps,'Environments':Environments,"AppVersions":AppVersions,"CustomerEnv":CustomerEnv,"CustomerApp":CustomerApp};

module.exports = mySchemas;