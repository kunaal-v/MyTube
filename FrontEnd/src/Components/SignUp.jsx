// import { useState } from "react"
// import logo from "../assets/MyTube_Logo.png"
// import axios from "axios";
// function SignUp() {
//     const [userName,setUserName]=useState("");
//     const [email,setEmail]=useState("");
//     const [password,setPassword]=useState("");
//     const [phone,setPhone]=useState("");
//     const [image,setImage]=useState("");
//     const [profile,setProfile]=useState(null)
//     function fileHandler(e)
//     {
//         setProfile(e.target.files[0]);
//         setImage(URL.createObjectURL(e.target.files[0]))
//     }
//     function handleFormSubmit(e)
//     {
//         e.preventDefault();
//         const formData=new FormData();
//         formData.append("userName",userName)
//         formData.append("email",email)
//         formData.append("phone",phone)
//         formData.append("profile",profile)
//         formData.append("password",password)

//         axios.post("https://mytube-jjn3.onrender.com/register",formData)
//         .then(res=>console.log(res))
//         .catch(err=>console.log(err))
//     }
//     return (
//     <div className="SignUp_Page">
//         <div className="SignUp_form">
//             <div className="logo">
//                 <img src={logo} alt="" className="Logo_Image"/>
//             </div>
//             <form onSubmit={handleFormSubmit} className="SignUp_FormInputs">
//                 <input type="text" 
//                 placeholder="UserName"
//                 required
//                 onChange={(e)=>setUserName(e.target.value)}
//                 />
//                 <input type="email" 
//                 placeholder="Email"
//                 required
//                 onChange={(e)=>setEmail(e.target.value)}
//                 />
//                 <input type="phone" 
//                 placeholder="Phone Number"
//                 required
//                 onChange={(e)=>setPhone(e.target.value)}
//                 />
//                 <input type="password" 
//                 placeholder="Password"
//                 required
//                 onChange={(e)=>setPassword(e.target.value)}
//                 />
//                 {image&&<img src={image} alt="logoImage" className="Preview_Image"/>}
//                 <input type="file"
//                 required
//                 onChange={(e)=>fileHandler(e)}
//                 />
//                 <button type="submit">Sign Up</button>
//             </form>
//         </div>
//     </div>
//   )
// }

// export default SignUp

// import { useState } from "react";
// import logo from "../assets/MyTube_Logo.png";
// import axios from "axios";

// function SignUp() {
//   const [userName, setUserName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [phone, setPhone] = useState("");
//   const [image, setImage] = useState(""); // For image preview
//   const [profile, setProfile] = useState(null); // For file to upload
//   const [isLoading, setIsLoading] = useState(false); // To handle loading state
//   const [errorMessage, setErrorMessage] = useState(""); // To handle error messages

//   function fileHandler(e) {
//     setProfile(e.target.files[0]);
//     setImage(URL.createObjectURL(e.target.files[0]));
//   }

//   async function handleFormSubmit(e) {
//     e.preventDefault();
//     setIsLoading(true);
//     const formData = new FormData();
//     formData.append("userName", userName);
//     formData.append("email", email);
//     formData.append("phone", phone);
//     formData.append("profile", profile);
//     formData.append("password", password);

//     try {
//       const res = await axios.post("https://mytube-jjn3.onrender.com/register", formData);
//       console.log(res);
//       setIsLoading(false);
//       if (res.status === 200) {
//         alert("Sign Up successful!");
//         // Redirect user or perform other actions
//       }
//     } catch (err) {
//       setIsLoading(false);
//       setErrorMessage("There was an error with your registration. Please try again.");
//       console.error(err);
//     }
//   }

//   return (
//     <div className="SignUp_Page">
//       <div className="SignUp_form">
//         <div className="logo">
//           <img src={logo} alt="Logo" className="Logo_Image" />
//         </div>
//         <form onSubmit={handleFormSubmit} className="SignUp_FormInputs">
//           <input
//             type="text"
//             placeholder="UserName"
//             required
//             onChange={(e) => setUserName(e.target.value)}
//           />
//           <input
//             type="email"
//             placeholder="Email"
//             required
//             onChange={(e) => setEmail(e.target.value)}
//           />
//           <input
//             type="tel" // Using tel for phone numbers
//             placeholder="Phone Number"
//             required
//             onChange={(e) => setPhone(e.target.value)}
//           />
//           <input
//             type="password"
//             placeholder="Password"
//             required
//             onChange={(e) => setPassword(e.target.value)}
//           />
//           {image && <img src={image} alt="Profile Preview" className="Preview_Image" />}
//           <input
//             type="file"
//             required
//             onChange={(e) => fileHandler(e)}
//           />
//           <button type="submit" disabled={isLoading}>
//             {isLoading ? "Signing Up..." : "Sign Up"}
//           </button>
//         </form>
//         {errorMessage && <p className="error-message">{errorMessage}</p>} {/* Display error message */}
//       </div>
//     </div>
//   );
// }

// export default SignUp;



import { useState } from "react";
import logo from "../assets/MyTube_Logo.png";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function SignUp() {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [image, setImage] = useState(""); // For image preview
  const [profile, setProfile] = useState(null); // For file to upload
  const [isLoading, setIsLoading] = useState(false); // To handle loading state
  const [errorMessage, setErrorMessage] = useState(""); // To handle error messages

  const navigate = useNavigate();

  function fileHandler(e) {
    setProfile(e.target.files[0]);
    setImage(URL.createObjectURL(e.target.files[0]));
  }

  async function handleFormSubmit(e) {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage(""); // Reset error message


    const formData = new FormData();
    formData.append("userName", userName);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("profile", profile);
    formData.append("password", password);

    axios.post("https://mytube-jjn3.onrender.com/register", formData)
    .then((res)=>{
        console.log("response kunaal",res)
        if(res.status==201)
        {
            alert("Your registred successfully");
            setIsLoading(false);
            navigate("/logIn")
        }
    })
    .catch(err=>{
        setIsLoading(false)
        if(err.status==409)
        {
            alert("user already exist");
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
            type="text"
            placeholder="UserName"
            required
            onChange={(e) => setUserName(e.target.value)}
          />
          <input
            type="email"
            placeholder="Email"
            required
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="tel"
            placeholder="Phone Number"
            required
            onChange={(e) => setPhone(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            required
            onChange={(e) => setPassword(e.target.value)}
          />
          {image && <img src={image} alt="Profile Preview" className="Preview_Image" />}
          <input
            type="file"
            required
            onChange={(e) => fileHandler(e)}
          />
          <button type="submit" disabled={isLoading}>
            {isLoading ? "Signing Up..." : "Sign Up"}
          </button>
          <Link to="/logIn">Already have account?</Link>
        </form>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
      </div>
    </div>
  );
}

export default SignUp;
