import { useNavigate } from "react-router-dom";
import "./EditProfilePage.css";
import { useEffect, useState } from "react";
import axios from "axios";



const Editprofilepage = () => {

    const authstring = sessionStorage.getItem("Auth");
    const auth = authstring ? JSON.parse(authstring) : "";
    // const loggedin = auth.token;
    const userid = auth.user_id;

    const navigate = useNavigate();

    const [fullName, setname] = useState('');
    const [phoneNumber, setmobilenumber] = useState('');
    const [gender, setgender] = useState('');
    const [emailId, setemail] = useState('');
    const [error, seterror] = useState("");

    const updateprofile = async () => {
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

        const updateurl = `${import.meta.env.VITE_BASE_URL}/users/${userid}`;

        const registerdata = {
            fullName,
            phoneNumber,
            gender,
            emailId,
        };

        axios.put(updateurl, registerdata)
        .then(() => navigate(-1))
        .catch(error => seterror(error.response.data.response.message));
    };

    const getuserdetails = () => {
        const url = `${import.meta.env.VITE_BASE_URL}/users/${userid}`;
        axios.get(url).then((response) => {
            const profile = response.data.response.data[0];
            setname(profile.fullName);
            setmobilenumber(profile.phoneNumber);
            setgender(profile.gender);
            setemail(profile.emailId);
        });
    }

    useEffect(() => {
        getuserdetails();
    },[])



    return(<>
        <div className="popoverlay" onClick={() => navigate(-1)}></div>
        
        <div className="popover">

            <div>
                <label className="silabel" htmlFor="text">Name*</label>
                <input className="siinput" type="text" placeholder="Full Name" defaultValue={fullName} onChange={(e) => setname(e.target.value)}/>
            </div>

            <div>
                <label className="silabel" htmlFor="tel">Mobile Number*</label>
                <input className="siinput" type="tel" placeholder="10 - Digit Mobile Number" maxLength={10} defaultValue={phoneNumber}
                    onInput={(e) => (e.target as HTMLInputElement).value = (e.target as HTMLInputElement).value.replace(/\D/g, '')}
                    onChange={(e) => setmobilenumber(e.target.value.replace(/\D/g, ''))}
                />
            </div>

            <div>
                <label className="silabel">Gender*</label>
                <div className="genderholder">
                    <div className="genderselect">
                        <input type="radio" name="gender" value="Male" checked={gender == "Male"} onChange={(e) => setgender(e.target.value)}/>
                        <label htmlFor="gender">Male</label>
                    </div>
                    <div className="genderselect">
                        <input type="radio" name="gender" value="Female" checked={gender == "Female"} onChange={(e) => setgender(e.target.value)}/>
                        <label htmlFor="gender">Female</label>
                    </div>
                </div>
            </div>

            <div>
                <label className="silabel" htmlFor="email">Email*</label>
                <input className="siinput" type="email" placeholder="Enter Your Email ID" defaultValue={emailId} onChange={(e) => setemail(e.target.value)}/>
            </div>

            <hr className="signupdivider"/>

            {error && <p className="errormsg">{error}</p>}

            <button className="siginbtn" onClick={updateprofile}>Save Changes</button>
            
        </div>
    </>)
}
export default Editprofilepage;