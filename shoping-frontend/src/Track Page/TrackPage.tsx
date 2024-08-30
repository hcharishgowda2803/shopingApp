/* eslint-disable @typescript-eslint/no-explicit-any */
import "./TrackPage.css";
import back from "../assets/Source/back.png";
import { Outlet, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Trackpagedata from "./TrackPageData";




const Trackpage = () => {

    const navigate = useNavigate();

    const authstring = sessionStorage.getItem("Auth");
    const auth = authstring ? JSON.parse(authstring) : "";
    // const loggedin = auth.token;
    const userid = auth.user_id;

    const [orders, setorders] = useState<any>();
    const [orderid, setorderid] = useState<string>("");

    useEffect(() => {
        const url = `${import.meta.env.VITE_BASE_URL}/orders?userId=${userid}`;
        axios.get(url).then((response) => {
            setorders(response.data.response.data);
        });
    },[])

    const formatTimestamp = (timestamp: string | number | Date) => {
        const date = new Date(timestamp);
    
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        let hours = date.getHours();
        const minutes = String(date.getMinutes()).padStart(2, '0');
    
        const ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        hours = hours ? hours : 12;

        return `${day}/${month}/${year}, ${String(hours).padStart(2, '0')}:${minutes} ${ampm}`;
    }

    const navtorate = (oid:any) => {
        setorderid(oid);
        navigate("rate");
    }


    return(<Trackpagedata.Provider value={orderid}>
        <div className="subheader">
            <img src={back} alt="back" width={30} onClick={() => navigate(-1)}/>
        </div>

        <h1 className="explore">Your Orders</h1>

        {orders ? orders.map((eachorder:any) => (
            <div className="orderholder" key={eachorder._id}>
                <p className="orderid">{"# "+eachorder._id}</p>
                <p className="orderdate">{formatTimestamp(eachorder.orderDate)}</p>
                {eachorder.orderStatus === "cancelled"
                    ? <p className="orderstatuscancelled">{eachorder.orderStatus}</p>
                    : <p className="orderstatus">{eachorder.orderStatus}</p>
                }
                <p className="ordertotal">{"Order Total: ₹ "+eachorder.cartId.cartTotal.toFixed(2)}</p>
                <p className="orderaddr">{"Delivery Address: "+eachorder.addressId.homeDetails}</p>
                {eachorder.orderStatus === "delivered" && eachorder.orderReviewed === 0 &&
                    <button className="rateorder" onClick={() => navtorate(eachorder._id)}>Rate Your Order</button>
                }
            </div>
        
        )):<h1 className="explore" style={{color: "#787878"}}>No Orders Found</h1>}
    
        <Outlet/>
    </Trackpagedata.Provider>)
}
export default Trackpage;