import React , { useState }from "react";
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function Login(){
    const [inputField,setInputField] = useState({
        email :'',
        password:''
    });
    const inputHandler = (e) =>{
        setInputField({...inputField,[e.target.name]:e.target.value })
    }
    const submitButton= async ()=>{
        let url = 'http://localhost:5000/users/login';
        console.log(inputField);
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
            console.log(response.data.statusCode);
            if(response.data.statusCode === 100){
                toast.success(response.data.text);
            }
             else {
                 toast.error(response.data.text);
             }
        }
        catch(e){
            toast.error("Something went wrong");
             console.log(e);
        }
     }
    return(
        <div className="container differentiate">
            <ToastContainer />
            <h3>LogIn</h3>
           <form action = "log-in" method="POST" >
            <input type="email" className="form-control" placeholder="Email" name="email" value={inputField.email} onChange={inputHandler}></input>
            <input type="password"  className="form-control" placeholder="Password"  name="password" value={inputField.password} onChange={inputHandler}></input>
            <button type="button" className="btn btn-primary" onClick={submitButton}>Login</button>
        </form>
        </div>
    );
}
export default Login;