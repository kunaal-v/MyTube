
import { useState } from "react";
import logo from "../assets/MyTube_Logo.png";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function LogIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false); // To handle loading state
  const [errorMessage, setErrorMessage] = useState(""); // To handle error messages

  const navigate = useNavigate();

  async function handleFormSubmit(e) {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage(""); 
    axios.post("https://mytube-jjn3.onrender.com/login", {
        email:email,
        password:password
    })
    .then((res)=>{
        console.log("response kunaal",res.status)
        if(res.data.message=="password Invalid")
        {
            alert("Password Invalid")
            setEmail("");
            setPassword("")
            setIsLoading(false);
        }
        
        if(res.data[1].accessToken)
        {
            alert("Login successfully");
            localStorage.setItem("accessToken",res.data[1].accessToken)
            setEmail("");
            setPassword("")
            setIsLoading(false);
            navigate("/dashboard")
        }
    })
    .catch(err=>{
        setIsLoading(false)
        console.log(err)
        if(err.response.status==404)
            {
                console.log("user not registered")
                alert("user not registered yet");
                setIsLoading(false)
            }
        })
    
  }

  return (
    <div className="SignUp_Page">
      <div className="SignUp_form">
        <div className="logo">
          <img src={logo} alt="Logo" className="Logo_Image" />
        </div>
        <form onSubmit={handleFormSubmit} className="SignUp_FormInputs">
          
          <input
            type="email"
            placeholder="Email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          
          <input
            type="password"
            placeholder="Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Link to="/signUp">Create Your Account</Link>
          
          <button type="submit" disabled={isLoading}>
            {isLoading ? "Logging In..." : "LogIn"}
          </button>
        </form>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
      </div>
    </div>
  );
}

export default LogIn;
