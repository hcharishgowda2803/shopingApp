/* eslint-disable @typescript-eslint/no-explicit-any */
import "./EditAddressPage.css";
import { Outlet, useNavigate } from "react-router-dom";

import back from "../assets/Source/back.png";
import { useEffect, useState } from "react";
import axios from "axios";
import React from "react";
import Addressdata from "./AddressData";





const Editaddresspage = () => {
    const navigate = useNavigate();

    const authstring = sessionStorage.getItem("Auth");
    const auth = authstring ? JSON.parse(authstring) : "";
    // const loggedin = auth.token;
    const userid = auth.user_id;

    const [useraddr, setuseraddr] = useState<any>();
    const [refresh, setrefresh] = useState<number>(0);
    const [addressid, setaddressid] = useState<any>();

    useEffect(() => {
        const url = `${import.meta.env.VITE_BASE_URL}/usersAddress?userId=${userid}`;
        axios.get(url).then((response:any) => setuseraddr(response.data.response.data));
    },[userid, refresh])

    const makerefresh = () => {
        setrefresh(refresh + 1);
    };

    useEffect(() => {
        window.addEventListener('popstate', makerefresh);
        return () => {
            window.removeEventListener('popstate', makerefresh);
        };
    }, []);

    const deleteaddr = (id:any) => {
        const url = `${import.meta.env.VITE_BASE_URL}/usersAddress/${id}`;
        axios.delete(url)
        .then(() => setrefresh(refresh + 1))
        .catch(error => alert(error.response.data.response.message));
    }



    return(<Addressdata.Provider value={addressid}>
        <div className="subheader">
            <img src={back} alt="back" width={30} onClick={() => navigate(-1)}/>
        </div>

        <h1 className="cartexplore">Delivery Address</h1>

        {useraddr &&
            <div className="alladdressholder">
                {useraddr.map((eachaddr:any) => (<React.Fragment key={eachaddr._id}>

                    <div className="addressholder">
                        <p className="addressname ">{eachaddr.homeDetails}</p>
                        <p className="addressfull">{`${eachaddr.addressLine1}, ${eachaddr.addressLine2}, ${eachaddr.state} - ${eachaddr.pinCode}`}</p>
                        <div className="editdelete">
                            <button className="edit" onClick={() => {setaddressid(eachaddr._id), navigate("address")}}>Edit</button>
                            <button className="delete" onClick={() => deleteaddr(eachaddr._id)}>Delete</button>
                        </div>
                    </div>

                </React.Fragment>))}

                <div className="addressholder" onClick={() => navigate("address")}>
                    <div className="addrbtnholder">
                        <button className="newaddrbtn">Add New Address</button>
                    </div>
                </div>
            </div>
        }

        <Outlet/>
    </Addressdata.Provider>)
}
export default Editaddresspage;