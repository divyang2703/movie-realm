/* eslint-disable no-unused-vars */
import { Link, useNavigate } from "react-router-dom"
import  { useState } from "react"
import {  createUserWithEmailAndPassword, updateProfile } from "firebase/auth"
import { auth } from "../../firebase/firebase"
// import {Cookies} from 'js-cookie'
import './Style.scss'


 function Signup (props) {
 
  const navigate = useNavigate();
  const [value, setValue] = useState({
    name: "",
    email:"",
    password: "",
  })


  const [error, setError] = useState("");
  const [submitButtonDisabled, setSubmitButtonDisabled] = useState(false);


  const handleSubmit = (event) => {
    event.preventDefault();
    if(value.name === "" )
    {
      setError("Please fill all the fields");
      return;
    }
    else if(value.email === ""){
        setError("Please enter eamil address");
        return;
    }
    else if(value.password === ""){
        setError("Please enter password");
        return;
    }
    else{
        setError("");
    }
    if(value.password.length < 8){
        setError("Password must be at least 8 characters long");
        return;
    }
    if(!value.email.includes("@" && ".com")){
        setError("Please enter a valid email address");
        return;
    }

    setSubmitButtonDisabled(true);
    createUserWithEmailAndPassword(auth, value.email, value.password).then(async(res)=>{
        setSubmitButtonDisabled(false);
        const user = res.user;
        await updateProfile(user,{
            displayName: value.name,  
          });
        
        navigate("/");
        
        console.log(user);
    }).catch((error)=>{
        setSubmitButtonDisabled(false);
        setError(error.message);
    })
    console.log(value)
    localStorage.setItem('email', value.email)
    // Cookies.setItem('email', value.email)
    
  }

  

  

  return (
    <div className="Authformcontainer">
      <form className="Authform">
        <div className="Authformcontent">
          <h3 className="Authformtitle" >Sign UP</h3>
          <div className="textcenter">
           <p><Link to='/login'>Already have account?</Link></p>
          </div>
          <div className="form-group mt-3">
            <label>Full Name</label>
            <input
              type="text"
              className="form-control mt-1"
              placeholder="abc xyz"
              onChange={(event)=>setValue((prev)=>({...prev, name: event.target.value}))}
            />
          </div>
          
          <div className="form-group mt-3">
            <label>Email address</label>
            <input
              type="email"
              className="form-control mt-1"
              placeholder="Email Address"
              onChange={(event)=>setValue((prev)=>({...prev, email: event.target.value}))}
            />
          </div>
          
          <div className="form-group mt-3">
            <label>Password</label>
            <input
              type="password"
              className="form-control mt-1"
              placeholder="Password"
              onChange={(event)=>setValue((prev)=>({...prev, password: event.target.value}))}
            />
          </div>
          <b id="e1">{error}</b>
          <div className="d-grid gap-2 mt-3">
            <button type="submit" id="b1" onClick={handleSubmit} className="btn btn-primary" disabled={submitButtonDisabled}>
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}
export default Signup;