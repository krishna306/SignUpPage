import React , { useState }from "react";
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function Submitotp(){
    const [inputField,setInputField] = useState({
        email :'',
        code:''
    })
    const inputHandler = (e) =>{
        setInputField({...inputField,[e.target.name]:e.target.value })
    }
    const submitButton= async ()=>{
        let url = 'http://localhost:5000/users/getotp';
        let data = JSON.stringify(inputField);
        let options = {
            method :'POST',
            url : url,
            headers: {'Authorization': 'Bearer ...'},
            data:data
        }
        try {
            let response = await axios(options)
            if(response.data.status === "ok"){
                toast.success(response.data.message);
            }
            else if(response.data.status === "Error"){
                toast.error(response.data.message);
            }
            
        }
        catch(e){
            toast.error("Something went wrong");
        }
     }
    return(
        <div className="container differentiate">
            <ToastContainer />
            <h3>Enter OTP Here</h3>
           <form action = "log-in" method="POST" >
                <input type="email"className="form-control" placeholder="Email" name="email" value={inputField.email} onChange={inputHandler}></input>
                <input type="code" className="form-control"placeholder="OTP"  name="code" value={inputField.code} onChange={inputHandler}></input>
                <button type="button" className="btn btn-primary" onClick={submitButton}>Verify</button>
            </form>
        </div>
    );
}
export default Submitotp;