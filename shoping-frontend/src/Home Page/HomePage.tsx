/* eslint-disable @typescript-eslint/no-explicit-any */
import "./HomePage.css";
import Searchbar from "../assets/Components/Search_Bar/SearchBar";
import cart from "../assets/Source/cart.png";
import user from "../assets/Source/user.png";
import bgimage from "../assets/Source/bg.jpg";
import heart from "../assets/Source/heart.png";
import heartselected from "../assets/Source/heart_selected.png";


import { useEffect, useState } from "react";
import axios from "axios";
import { Outlet, useNavigate } from "react-router-dom";

const Homepage = () => {

    const navigate = useNavigate();

    const authstring = sessionStorage.getItem("Auth");
    const auth = authstring ? JSON.parse(authstring) : "";
    const loggedin = auth.token;
    const userid = auth.user_id;

    const cartid = sessionStorage.getItem("cartid");

    const [sbar, setsbar] = useState<HTMLDivElement>();
    const [position, setposition] = useState<number>();
    const [products, setproducts] = useState([]);
    const [wishlists, setwishlists] = useState([]);
    const [refresh, setrefresh] = useState<number>(0);
    const [addeditems, setaddeditems] = useState<any>();
    const [refreshcart, setrefreshcart] = useState<number>(0);

    useEffect(() => {
        setsbar (document.getElementById("sbar") as HTMLDivElement);
        if (sbar) {
            setposition(sbar.getBoundingClientRect().top - 25);
        }
    }, [sbar]);

    const sbarfix = () => {
        const logo = document.getElementById('hbl');
        const sbar = document.getElementById('hsbar');

        if (logo && sbar) {
            if (window.scrollY > position!) {
                logo!.style.display = "flex";
                sbar!.style.display = "flex";
            } else {
                logo!.style.display = "none";
                sbar!.style.display = "none";
            }
        }
    }

    window.onscroll = () => {
        sbarfix();
    };

    useEffect(() => {
        const url = `${import.meta.env.VITE_BASE_URL}/products`;

        axios.get(url)
        .then(response => setproducts(response.data.response.data))
        .catch(error => console.error('Error fetching data:', error));
    },[])

    useEffect(() => {
        if (userid) {
            const url = `${import.meta.env.VITE_BASE_URL}/wishList`;

            axios.get(url, {
                params:{
                    userId:userid
                }
            })
            .then(response => setwishlists(response.data.response.data))
            .catch(error => console.error('Error fetching data:', error));
        }
    },[userid, refresh])

    const opensignin = () => {
        navigate("/login");
    }

    const addwishlist = (productid:any) => {
        if (userid) {
            const url = `${import.meta.env.VITE_BASE_URL}/wishList`;

            const wishitemdata = {
                "userId": userid,
                "productDetails": productid
            }

            axios.post(url, wishitemdata).then(() => setrefresh(refresh + 1));
        }else{
            opensignin();
        }
    }

    const removewishlist = (productid:any) => {
        if (userid) {
            const wishlistItem:any = wishlists.find((item: any) => item.productDetails._id === productid);
            const wishlistid = wishlistItem ? wishlistItem._id : null;

            const url = `${import.meta.env.VITE_BASE_URL}/wishList/${wishlistid}`;
            axios.delete(url).then(() => setrefresh(refresh + 1));
        }
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
        if (userid && cartid) {
            const url = `${import.meta.env.VITE_BASE_URL}/userCart/${cartid}`;
            axios.get(url).then((response) => setaddeditems(response.data.response.data[0]));
        }
    },[userid, cartid, refreshcart])









    return(<>

        <div className="header">
            <p className="brandlogo" id="hbl">Shoop</p>
            <div className="searchbarmainholder" id="hsbar">
                <Searchbar/>
            </div>
            <div className="profileholder">
                <img src={heart} alt="wishlist" height={30} onClick={() => navigate("wishlist")}/>
                <img src={cart} alt="cart" height={30} onClick={() => navigate("cart")}/>
                {loggedin && <img src={user} alt="user" height={30} onClick={() => navigate("profile")}/>}
                {!loggedin &&
                    <div className="signholder" onClick={opensignin}>
                        <p className="signtext">Sign In</p>
                    </div>
                }
            </div>
        </div>

        <div className='centersearch' style={{backgroundImage: `url(${bgimage})`}}>
            <div className="mainsearchholder">
                <p className="brandlogomain">Shoop</p>
                <div className="searchbarmainholdercenter" id="sbar">
                    <Searchbar/>
                </div>
            </div>
        </div>

        {products.length > 0 && <>
            <h1 className="explore">Find What Inspires You</h1>
            
            <div className="productsholder">
                {products.map((eachproduct:any) => (
                    <div className="productholder" key={eachproduct._id}>

                        <div className="productimageholder">
                            <img className="productimage" src={eachproduct.imageUrl} alt="product"/>
                        </div>

                        <div className="productcontent">

                            <div className="brandrating">
                                <p className="brand">{eachproduct.brand}</p>
                                {eachproduct.rating > 0 ? (
                                    <p className="hrating">
                                        <span className="star">⭐ &nbsp;</span>
                                        {eachproduct.rating.toFixed(1)}
                                    </p>
                                ) : null}
                            </div>

                            <p className="name">{eachproduct.name}</p>
                            <p className="description">{eachproduct.description}</p>
                            <div className="priceholder">
                                <p className="scratchprice">₹ {Math.round(eachproduct.price)}</p>
                                <p className="price">₹ {Math.round(eachproduct.price - eachproduct.discount)}</p>
                            </div>

                            <div className="colorsize">
                                {eachproduct.color && <p className="color"><b>Color: </b>{eachproduct.color}</p>}
                                {eachproduct.size && <p className="size"><b>Size: </b>{eachproduct.size}</p>}
                            </div>

                            <div className="wishadd">

                                {wishlists.some((item:any) => item.productDetails._id === eachproduct._id)
                                    ?   <button className="wish">
                                            <img src={heartselected} alt="selected" width={20} onClick={() => removewishlist(eachproduct._id)}/>
                                        </button>
                                    :   <button className="wish" onClick={() => addwishlist(eachproduct._id)}>
                                            <img src={heart} alt="notselected" width={20}/>
                                        </button>
                                }

                                {addeditems && addeditems.items && addeditems.items.length > 0 && addeditems.items.some((item:any) => item.product_id._id === eachproduct._id)
                                    ?   <button className="addedbutton">
                                            <p className='addsub' onClick={() => removeitem(eachproduct._id)}>-</p>
                                            <p>{addeditems.items.map((item:any) => item.product_id._id === eachproduct._id && item.quantity)}</p>
                                            <p className='addsub' onClick={() => additem(eachproduct._id)}>+</p>
                                        </button>
                                    
                                    :   <button className="addbutton" onClick={() => additem(eachproduct._id)}>ADD</button>
                                }

                            </div>

                        </div>

                    </div>
                ))}
            </div>
        </>}

        <div className="footerholder">

            <footer className="site-footer">
                <div className="footer-container">
                    <div className="footer-section">
                        <h4>About Us</h4>
                        <p>We are a company dedicated to providing top-notch products and services. Learn more about our mission and values.</p>
                    </div>
                    <div className="footer-section">
                        <h4>Contact Us</h4>
                        <ul>
                            <li><a href="mailto:info@example.com">info@shoop.com</a></li>
                            <li><a href="tel:+123456789">+91 9876543210</a></li>
                            <li><address>123 Example Street, City, Country</address></li>
                        </ul>
                    </div>
                    <div className="footer-section">
                        <h4>Follow Us</h4>
                        <div className="social-links">
                            <a href="https://facebook.com" target="_blank" aria-label="Facebook"><i className="fab fa-facebook-f"></i></a>
                            <a href="https://twitter.com" target="_blank" aria-label="Twitter"><i className="fab fa-twitter"></i></a>
                            <a href="https://instagram.com" target="_blank" aria-label="Instagram"><i className="fab fa-instagram"></i></a>
                        </div>
                    </div>
                </div>
                <div className="footer-bottom">
                    <p>&copy; 2024, Shoop Technologies pvt ltd. All rights reserved.</p>
                </div>
            </footer>

        </div>
        <Outlet/>
    </>)
}
export default Homepage;