/* eslint-disable @typescript-eslint/no-explicit-any */
import "./CartPage.css";
import { Outlet, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import React from "react";

import back from "../assets/Source/back.png";




const Cartpage = () => {
    const navigate = useNavigate();

    const authstring = sessionStorage.getItem("Auth");
    const auth = authstring ? JSON.parse(authstring) : "";
    // const loggedin = auth.token;
    const userid = auth.user_id;

    const cartid = sessionStorage.getItem("cartid");

    const [cartitems, setcartitems] = useState<any>([]);
    const [refreshcart, setrefreshcart] = useState<number>(0);
    const [useraddr, setuseraddr] = useState<any>();
    const [addressid, setaddressid] = useState();
    const [refresh, setrefresh] = useState<number>(0);

    useEffect(() => {
        if (userid && cartid) {
            const url = `${import.meta.env.VITE_BASE_URL}/userCart/${cartid}`;
            axios.get(url).then((response) => setcartitems(response.data.response.data[0]));
        }
    },[userid, cartid, refreshcart])

    const opensignin = () => {
        navigate("/login");
    }

    const additem = (productid:any) => {
        if (userid) {
            const url = `${import.meta.env.VITE_BASE_URL}/userCart`;
            const data = {
                "userId": userid,
                "productDetails": productid
            }
            axios.post(url, data).then((response) => {
                // setaddeditems(response.data.response.data);
                setrefreshcart(refreshcart + 1);
                sessionStorage.setItem("cartid", response.data.response.data._id);
            });
        }else{
            opensignin();
        }
    }

    const removeitem = (productid:any) => {
        if (userid) {
            const url = `${import.meta.env.VITE_BASE_URL}/userCart/${cartid}`;
            const data = {
                "userId": userid,
                "productDetails": productid
            }
            axios.put(url, data).then(() => setrefreshcart(refreshcart + 1));
        }
    }

    useEffect(() => {
        const url = `${import.meta.env.VITE_BASE_URL}/usersAddress?userId=${userid}`;
        axios.get(url).then((response:any) => setuseraddr(response.data.response.data));
    },[refresh, userid])

    const makerefresh = () => {
        setrefresh(refresh + 1);
        console.log("refresh")
    };

    useEffect(() => {
        window.addEventListener('popstate', makerefresh);
        return () => {
            window.removeEventListener('popstate', makerefresh);
        };
    }, []);

    const placeorder = () => {
        const url = `${import.meta.env.VITE_BASE_URL}/orders`;
        const orderplacedata = {
            "userId": userid,
            "orderStatus": "placed",
            "cartId": cartid,
            "addressId": addressid
        }
        axios.post(url, orderplacedata)
        .then(() => navigate("/track"))
        .catch(error => alert(error.response.data.response.message))
    }


    return(<>
        <div className="subheader">
            <img src={back} alt="back" width={30} onClick={() => navigate(-1)}/>
        </div>

        {cartitems && cartitems.items && cartitems.items.length > 0 ? <>
            <h1 className="cartexplore">Your Cart Items</h1>
            <div className="cartproductsholder">
                {cartitems.items.map((eachproduct:any) => (
                    <div className="cartproductholder" key={eachproduct.product_id._id}>

                        <div className="cartproductimageholder">
                            <img className="cartproductimage" src={eachproduct.product_id.imageUrl} alt="product"/>
                        </div>

                        <div className="cartproductcontent">

                            <div className="cartbrandrating">
                                <p className="cartbrand">{eachproduct.product_id.brand}</p>
                                {eachproduct.product_id.rating > 0 ? (
                                    <p className="cartrating">
                                        <span className="cartstar">⭐ &nbsp;</span>
                                        {eachproduct.product_id.rating.toFixed(1)}
                                    </p>
                                ) : null}
                            </div>

                            <p className="cartname">{eachproduct.product_id.name}</p>
                            <p className="cartdescription">{eachproduct.product_id.description}</p>
                            <div className="cartpriceholder">
                                <p className="cartscratchprice">₹ {Math.round(eachproduct.product_id.price)}</p>
                                <p className="cartprice">₹ {Math.round(eachproduct.product_id.price - eachproduct.product_id.discount)}</p>
                            </div>

                            <div className="cartcolorsize">
                                {eachproduct.color && <p className="cartcolor"><b>Color: </b>{eachproduct.product_id.color}</p>}
                                {eachproduct.size && <p className="cartsize"><b>Size: </b>{eachproduct.product_id.size}</p>}
                            </div>

                            <div className="wishadd">
                                    
                                <button className="addedbutton">
                                    <p className='addsub' onClick={() => removeitem(eachproduct.product_id._id)}>-</p>
                                    <p>{eachproduct.quantity}</p>
                                    <p className='addsub' onClick={() => additem(eachproduct.product_id._id)}>+</p>
                                </button>
                                
                            </div>

                        </div>

                    </div>
                ))}
            </div>

            <h1 className="cartexplore">Delivery Address</h1>

            {useraddr &&
                <div className="alladdressholder">
                    {useraddr.map((eachaddr:any) => (<React.Fragment key={eachaddr._id}>

                        <input className="addrradiobtn" type="radio" name="address" id={eachaddr._id} onChange={() => setaddressid(eachaddr._id)}/>
                        <label className="addressholder" htmlFor={eachaddr._id}>
                            <p className="addressname ">{eachaddr.homeDetails}</p>
                            <p className="addressfull">{`${eachaddr.addressLine1}, ${eachaddr.addressLine2}, ${eachaddr.state} - ${eachaddr.pinCode}`}</p>
                        </label>

                    </React.Fragment>))}

                    <div className="addressholder" onClick={() => navigate("address")}>
                        <div className="addrbtnholder">
                            <button className="newaddrbtn">Add New Address</button>
                        </div>
                    </div>
                </div>
            }

            <div className="cartfooter">
                <p className="total">Total Payable: ₹{cartitems.cartTotal.toFixed(2)}</p>
                <button className="placebtn" onClick={placeorder}>Place Order</button>
            </div>
        </> :
            <h1 className="cartexplore">Your cart is empty.</h1>
        }
    
        <Outlet/>
    </>)
}
export default Cartpage;