import React , { useState }from "react";
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function Emailforotp(){
    const [inputField,setInputField] = useState({
        email :'',
    })
    const inputHandler = (e) =>{
        setInputField({...inputField,[e.target.name]:e.target.value })
    }
    const submitButton= async ()=>{
        let url = 'http://localhost:5000/users/emailsend';
        let data = JSON.stringify(inputField)
        var success =0;
        let options = {
            method :'POST',
            url : url,
            headers: {

            },
            data:data
        }
        try {
            let response = await axios(options)
            if(response.data.statusText === "Success"){
                toast.success(response.data.message);
                success =1;
            }
            else {
                toast.error(response.data.message);
            }
        }
        catch(e){
            toast.error("Something went wrong");
        }
        if(success===1){
            window.location.href = "/submitotp";
        }
        
     }
    return(
        <div className="container differentiate">
            <ToastContainer />
            <h3>Verify Your Email ID</h3>
            <form action = "log-in" method="POST" >
                <input type="email" className="form-control" placeholder="Email" name="email" value={inputField.email} onChange={inputHandler}></input>
                <button type="button" className="btn btn-primary"  onClick={submitButton}>Send OTP</button>
            </form>
        </div>
    );
}
export default Emailforotp;