
import { useState,useEffect } from "react";
import logo from "../assets/MyTube_Logo.png";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function CreateChannel() {
  const [channelName, setChannelName] = useState("");
  const [isLoading, setIsLoading] = useState(false); 
  const [errorMessage, setErrorMessage] = useState(""); 
  const [logoUrl,setLogoUrl]=useState("");
  const [userName,setUserName]=useState("")
  const [email,setEmail]=useState("");
  const [phone,setPhone]=useState("")
  const [image,setImage]=useState("")

  const navigate = useNavigate();
useEffect(()=>
    {
        const accessToken=localStorage.getItem("accessToken");
        axios.get("https://mytube-jjn3.onrender.com/user",{
            headers: {
                Authorization: `JWT ${accessToken}`,
            }})
        .then(res=>{
            if(res.data.user)
            {
                // setSignIn(true);
                setUserName(res.data.user.userName);
                setEmail(res.data.user.email);
                setPhone(res.data.user.phone);
            }
        })
    },[])

    function fileHandler(e) {
        setLogoUrl(e.target.files[0]);
        setImage(URL.createObjectURL(e.target.files[0]));
    }
    async function handleFormSubmit(e) {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage(""); 
    const formData=new FormData();
    formData.append("channelName",channelName);
    formData.append("logo",logoUrl)
    const accessToken = localStorage.getItem("accessToken");
    axios.put("https://mytube-jjn3.onrender.com/createChannel",formData ,{
        headers: {
            Authorization: `JWT ${accessToken}`,
        },
        
    })
    .then((res)=>{
        console.log("response kunaal",res)
        setIsLoading(false)
        if(res.data[0].message=="user updated")
        {
            alert("Channel Created")
            setChannelName("")
            setIsLoading(false);
            navigate("/profile/mychannel")
        }
        
        // if(res.data[1].accessToken)
        // {
        //     alert("Login successfully");
        //     localStorage.setItem("accessToken",res.data[1].accessToken)
        //     setChannelName("")
        //     setIsLoading(false);
        //     navigate("/profile")
        // }
    })
    .catch(err=>{
        setIsLoading(false)
        console.log(err)

        // if(err.response.status==404)
        //     {
        //         console.log("user not registered")
        //         alert("user not registered yet");
        //         setIsLoading(false)
        //     }
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
            type="text"
            // placeholder="UserName"
            required
            defaultValue={userName}
          />
          <input
            type="email"
            // placeholder="Email"
            required
            defaultValue={email}
          />
          <input
            type="tel"
            // placeholder="Phone"
            required
            defaultValue={phone}
          />
          
          <input
            type="text"
            placeholder="Channel Name"
            required
            // value={password}
            onChange={(e) => setChannelName(e.target.value)}
          />
          <input
            type="file"
            required
            onChange={(e) => fileHandler(e)}
          />
          {image && <img src={image} alt="Profile Preview" className="Preview_Image" />}
          
          <button type="submit" disabled={isLoading}>
            {isLoading ? "Creating..." : "Create Channel"}
          </button>
        </form>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
      </div>
    </div>
  );
}

export default CreateChannel;
