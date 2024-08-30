import "./Signuppage.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";





const Signuppage = () => {
    const navigate = useNavigate();

    const [fullName, setname] = useState('');
    const [phoneNumber, setmobilenumber] = useState('');
    const [gender, setgender] = useState('');
    const [emailId, setemail] = useState('');
    const [password, setpassword] = useState('');
    const [error, seterror] = useState("");

    const register = async () => {
        seterror("");

        if (!fullName) {
            seterror("Full Name is required");
            return;
        }

        if (phoneNumber.length < 10) {
            seterror("Phone Number must be 10 digits");
            return;
        }

        if (!gender) {
            seterror("Please select a gender");
            return;
        }

        const validatemail = emailId.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
        if (validatemail === null || validatemail[0] !== emailId) {
            seterror("Enter a valid email address");
            return;
        }

        if (password.length < 6) {
            seterror("Password must be at least 6 characters long");
            return;
        }

        const signupurl = `${import.meta.env.VITE_BASE_URL}/users`;
        const loginurl = `${import.meta.env.VITE_BASE_URL}/users/login`

        const registerdata = {
            fullName,
            phoneNumber,
            gender,
            emailId,
            password
        };

        const logindata = {
            emailId,
            password
        };

        axios.post(signupurl, registerdata)
        .then(() => {
            axios.post(loginurl, logindata)
            .then(response => sessionStorage.setItem("Auth", JSON.stringify(response.data.response.data)))
            .then(() => navigate(-2))
            .catch(error => seterror(error.response.data.response.message))
        })
        .catch(error => seterror(error.response.data.response.message))
    }



    return(<>
        <div className="popoverlay" onClick={() => navigate(-1)}></div>
        
        <div className="popover">

            <div>
                <label className="silabel" htmlFor="text">Name*</label>
                <input className="siinput" type="text" placeholder="Full Name" onChange={(e) => setname(e.target.value)}/>
            </div>

            <div>
                <label className="silabel" htmlFor="tel">Mobile Number*</label>
                <input className="siinput" type="tel" placeholder="10 - Digit Mobile Number" maxLength={10}
                    onInput={(e) => (e.target as HTMLInputElement).value = (e.target as HTMLInputElement).value.replace(/\D/g, '')}
                    onChange={(e) => setmobilenumber(e.target.value.replace(/\D/g, ''))}
                />
            </div>

            <div>
                <label className="silabel">Gender*</label>
                <div className="genderholder">
                    <div className="genderselect">
                        <input type="radio" name="gender" value="Male" onChange={(e) => setgender(e.target.value)}/>
                        <label htmlFor="gender">Male</label>
                    </div>
                    <div className="genderselect">
                        <input type="radio" name="gender" value="Female" onChange={(e) => setgender(e.target.value)}/>
                        <label htmlFor="gender">Female</label>
                    </div>
                </div>
            </div>

            <div>
                <label className="silabel" htmlFor="email">Email*</label>
                <input className="siinput" type="email" placeholder="Enter Your Email ID" onChange={(e) => setemail(e.target.value)}/>
            </div>

            <div>
                <label className="silabel" htmlFor="password">Password*</label>
                <input className="siinput" type="password" placeholder="Create Your Password" onChange={(e) => setpassword(e.target.value)}/>
            </div>

            <hr className="signupdivider"/>

            {error && <p className="errormsg">{error}</p>}

            <button className="siginbtn" onClick={register}>Submit</button>
            
        </div>
    </>)
}
export default Signuppage;