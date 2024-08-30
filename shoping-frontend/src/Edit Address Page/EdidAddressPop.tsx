import { useNavigate } from "react-router-dom";
import "./EditAddressPage.css";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import Addressdata from "./AddressData";




const Editaddresspop = () => {
    const navigate = useNavigate();

    const addressid = useContext(Addressdata);

    const authstring = sessionStorage.getItem("Auth");
    const auth = authstring ? JSON.parse(authstring) : "";
    // const loggedin = auth.token;
    const userid = auth.user_id;

    const [houseno, sethouseno] = useState('');
    const [addr1, setaddr1] = useState('');
    const [addr2, setaddr2] = useState('');
    const [pincode, setpincode] = useState('');
    const [state, setstate] = useState('');
    const [error, seterror] = useState("");


    const updateaddress = async () => {
        seterror("");

        if (!houseno) {
            seterror("House Number is required");
            return;
        }

        if (!addr1) {
            seterror("Address is required");
            return;
        }

        if (!addr2) {
            seterror("locality is required");
            return;
        }

        if (pincode.length < 6) {
            seterror("Pin Code must be 6 digits");
            return;
        }

        if (!state) {
            seterror("State is required");
            return;
        }

        const url = `${import.meta.env.VITE_BASE_URL}/usersAddress/${addressid}`;
        const addressdata = {
            "userId": userid,
            "homeDetails": houseno,
            "addressLine1": addr1,
            "addressLine2": addr2,
            "pinCode": pincode,
            "state": state,
        }

        axios.put(url, addressdata).then(() => navigate(-1));
    }

    const getuseraddress = () => {
        const url = `${import.meta.env.VITE_BASE_URL}/usersAddress/${addressid}`;
        axios.get(url).then((response) => {
            const address = response.data.response.data[0];
            sethouseno(address.homeDetails);
            setaddr1(address.addressLine1);
            setaddr2(address.addressLine2);
            setpincode(address.pinCode);
            setstate(address.state);
        });
    }

    useEffect(() => {
        getuseraddress();
    },[])





    return (<>
        <div className="popoverlay" onClick={() => navigate(-1)}></div>
        
        <div className="popover">

            <div>
                <label className="silabel" htmlFor="text">Address Name*</label>
                <input className="siinput" type="text" placeholder="Save Address As" defaultValue={houseno} onChange={(e) => sethouseno(e.target.value)}/>
            </div>

            <div>
                <label className="silabel" htmlFor="text">Address*</label>
                <input className="siinput" type="text" placeholder="Full Address" defaultValue={addr1} onChange={(e) => setaddr1(e.target.value)}/>
            </div>

            <div>
                <label className="silabel" htmlFor="text">locality*</label>
                <input className="siinput" type="text" placeholder="Area, City" defaultValue={addr2} onChange={(e) => setaddr2(e.target.value)}/>
            </div>

            <div>
                <label className="silabel" htmlFor="tel">Pin Code*</label>
                <input className="siinput" type="tel" placeholder="6 - Digit Pin Code" maxLength={6}
                    onInput={(e) => (e.target as HTMLInputElement).value = (e.target as HTMLInputElement).value.replace(/\D/g, '')}
                    defaultValue={pincode} onChange={(e) => setpincode(e.target.value.replace(/\D/g, ''))}
                />
            </div>

            <div>
                <label className="silabel" htmlFor="text">State*</label>
                <input className="siinput" type="text" placeholder="Your State" defaultValue={state} onChange={(e) => setstate(e.target.value)}/>
            </div>

            <hr className="signupdivider"/>

            {error && <p className="errormsg">{error}</p>}

            <button className="siginbtn" onClick={updateaddress}>Save Changes</button>
            
        </div>
    </>)
}
export default Editaddresspop;