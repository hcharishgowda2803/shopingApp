import "./ProfilePage.css";
import { useNavigate } from "react-router-dom";
// import axios from "axios";




const Profilepage = () => {
    // const cartid = sessionStorage.getItem("cartid");
    const navigate = useNavigate();


    // const logout = () => {
       
    //     const url = `${import.meta.env.VITE_BASE_URL}/userCart/${cartid}`;
    //     axios.delete(url).then(() => {
    //         sessionStorage.clear();
    //         navigate(-1);
    //         setTimeout(() => location.reload(), 200);
    //     });

    // }

    const logout = () => {
       
        sessionStorage.clear();
        navigate(-1);
        setTimeout(() => location.reload(), 200);
       
    }


    return(<>
        <div className="popoverlay" onClick={() => navigate(-1)}></div>
        <div className="profilepageholder">
            <p className="poptions" onClick={() => navigate("edit")}>Edit Profile</p>
            <p className="poptions" onClick={() => navigate("/editaddress")}>Addresses</p>
            <p className="poptions" onClick={() => navigate("/track")}>Orders</p>
            <p className="plogout" onClick={logout}>Logout</p>
        </div>
    </>)
}
export default Profilepage;