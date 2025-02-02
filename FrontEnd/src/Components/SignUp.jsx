import logo from "../assets/MyTube_Fevicon.png"
function SignUp()
{
    return(<>
    <div className="signup_page">
        <div className="signup_container">
            <div >
                <img src={logo} alt="" width="50px" height="50px" style={{borderRadius:"50%" , margin:"5px"}}/>
                <h1>Sign up</h1>
            </div>
            <div style={{display:"flex", flexDirection:"column"}}>
                <label htmlFor="">UserName: </label>
                <input type="text" />
                <label htmlFor="">Email:</label>
                <input type="text" />
                <label htmlFor="">Phone: </label>
                <input type="text" />
                <label htmlFor="">Password:</label>
                <input type="text" />
            </div>
        </div>
    </div>
    </>)
}
export default SignUp