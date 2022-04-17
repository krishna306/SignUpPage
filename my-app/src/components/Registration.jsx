import React, { useState } from "react";
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
function Registration(){
    const [inputField,setInputField] = useState({
        firstname :'',
        lastname :'',
        email :'',
        password:''
    })
    const inputHandler = (e) =>{
        setInputField({...inputField,[e.target.name]:e.target.value })
    }
    const submitButton= async ()=>{
       let url = 'http://localhost:5000/users/add';
       let data = JSON.stringify(inputField);
       let options = {
           method :'POST',
           url : url,
           headers: {
               
           },
           data:data
       }
       try {
           let response = await axios(options)
            if(response.data.response.status === 'error'){
                toast.error(response.data.response.message);
            }
            else{
                toast.success("Registered Successfully");
            }
       }
       catch(e){
            toast.error("Something went wrong");
       }
    }
    return(
    <div className="container differentiate">
        <h3>Register Yourself Here</h3>
        <ToastContainer />
        <form action = "log-in" method="POST" >
            <div className="container">
                <div className="row">
                    <div className="col">
                        <input type="text" className="form-control" placeholder = "First Name" name ="firstname" value={inputField.firstname} onChange={inputHandler}></input>
                    </div>
                    <div className="col">
                        <input type="text" className="form-control" placeholder = "Last Name" name="lastname" value={inputField.lastname} onChange={inputHandler}></input>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <input type="email"  className="form-control" placeholder="Email" name="email" value={inputField.email} onChange={inputHandler}></input>
                    </div>
                    <div className="col">
                        <input type="password" className="form-control" placeholder="Password"  name="password" value={inputField.password} onChange={inputHandler}></input>
                    </div>
                </div>
            
            </div>
            <button type="button" className="btn btn-primary" onClick={submitButton}>Register</button>
        </form>
    </div>

    );
}
export default Registration;