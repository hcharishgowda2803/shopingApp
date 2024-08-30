/* eslint-disable react-refresh/only-export-components */
import './index.css';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';

import Homepage from './Home Page/HomePage';
import Loginpage from './Login Page/LoginPage';
import Signuppage from './Signup Page/Signuppage';
import Cartpage from './Cart Page/CartPage';
import Wishlistpage from './Wishlist Page/WishlistPage';
import Profilepage from './Profile Page/ProfilePage';
import Addaddresspage from './Add Address Page/AddAddressPage';
import Trackpage from './Track Page/TrackPage';
import Orderratingpage from './Order Rating Page/OrderRatingPage';
import Editprofilepage from './Edit Profile Page/EditProfilePage';
import Editaddresspage from './Edit Address Page/EditAddressPage';
import Editaddresspop from './Edit Address Page/EdidAddressPop';



const Router = createBrowserRouter([
    {
      path: "",
      element: <Homepage/>,
      errorElement: <div><h1>Wrong URL!</h1></div>,
      children: [
        {
          path: "/login",
          element: <Loginpage/>
        },
        {
          path: "/signup",
          element: <Signuppage/>
        },
        {
          path: "/profile",
          element: <Profilepage/>,
        },
        {
          path: "/profile/edit",
          element: <Editprofilepage/>,
        },
        
      ]
    },
    {
      path: "/cart",
      element: <Cartpage/>,
      children: [
        {
          path: "/cart/address",
          element: <Addaddresspage/>
        }
      ]
    },
    {
      path: "/wishlist",
      element: <Wishlistpage/>,
    },
    {
      path: "/track",
      element: <Trackpage/>,
      children: [
        {
          path: "/track/rate",
          element: <Orderratingpage/>
        }
      ]
    },
    {
      path: "/editaddress",
      element: <Editaddresspage/>,
      children: [
        {
          path: "/editaddress/address",
          element: <Editaddresspop/>
        }
      ]
    },


    
    
    
    
    {
      path: "*",
      element: 
      <div>
        <h1>Click On Home Button!</h1>
        <Link to="/H001"><button>Home</button></Link>
      </div>,
    },
]);


ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  // <React.StrictMode>
    <RouterProvider router={Router}/>
  // </React.StrictMode>,
);