import "./LoginPage.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";





const Loginpage = () => {
    const navigate = useNavigate();

    const [emailId, setemail] = useState('');
    const [password, setpassword] = useState('');
    const [error, seterror] = useState("");

    const login = async () => {
        seterror("");

        const validatemail = emailId.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
        if (validatemail === null || validatemail[0] !== emailId) {
            seterror("Enter a valid email address");
            return;
        }

        if (password.length < 6) {
            seterror("Password Entered is In-Correct");
            return;
        }

        const loginurl = `${import.meta.env.VITE_BASE_URL}/users/login`

        const logindata = {
            emailId,
            password
        };

        axios.post(loginurl, logindata)
        .then(response => sessionStorage.setItem("Auth", JSON.stringify(response.data.response.data)))
        .then(() => navigate(-1))
        .catch(error => seterror(error.response.data.response.message))
    };



    return(<>
        <div className="popoverlay" onClick={() => navigate(-1)}></div>
    
        <div className="popover">

            <div>
                <label className="silabel" htmlFor="email">Email</label>
                <input className="siinput" type="email" placeholder="Enter Your Email ID" onChange={(e) => setemail(e.target.value)}/>
            </div>

            <div>
                <label className="silabel" htmlFor="password">Password</label>
                <input className="siinput" type="password" placeholder="Enter Your Password" onChange={(e) => setpassword(e.target.value)}/>
            </div>

            {error && <p className="errormsg">{error}</p>}

            <p className="forgotpassword">Forgot password?</p>

            <button className="siginbtn" onClick={login}>Sign In</button>

            <div className="siginuplink">
                <p className="sultext">Don't have an account?</p>
                <p className="sulbtn" onClick={() => navigate("/signup")}>Sign Up</p>
            </div>
            
        </div>
    </>)
}
export default Loginpage;