/* eslint-disable @typescript-eslint/no-explicit-any */
import "./OrderRatingPage.css";
import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import Trackpagedata from "../Track Page/TrackPageData";
import axios from "axios";



const Orderratingpage = () => {
    const navigate = useNavigate();
    const orderId = useContext(Trackpagedata);

    const [rating, setrating] = useState<number>();
    const [review, setreview] = useState("");
    const [error, seterror] = useState("");


    const submitrating = () => {
        seterror("");

        if (!rating) {
            seterror("Rating is Required");
            return;
        }

        if (!review) {
            seterror("Feedback is Required");
            return;
        }

        const url = `${import.meta.env.VITE_BASE_URL}/review`
        const reviewdata = {
            orderId,
            rating,
            review
        }
        axios.post(url, reviewdata)
        .catch(error => seterror(error.response.data.response.message));
    }


    return(<>
        <div className="popoverlay" onClick={() => navigate(-1)}></div>
    
        <div className="popover">

            <p className="popheading">Submit Your Review</p>

            <div className="rating">
                <input type="radio" id="star5" name="rate" value={5} onChange={(e) => setrating(Number(e.target.value))}/>
                <label title="Excellent!" htmlFor="star5">
                    <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 576 512" transform="rotate(180 0 0)">
                    <path
                        d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"
                    ></path>
                    </svg>
                </label>

                <input value={4} name="rate" id="star4" type="radio" onChange={(e) => setrating(Number(e.target.value))}/>
                <label title="Great!" htmlFor="star4">
                    <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 576 512" transform="rotate(180 0 0)">
                    <path
                        d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"
                    ></path>
                    </svg>
                </label>

                <input value={3} name="rate" id="star3" type="radio" onChange={(e) => setrating(Number(e.target.value))}/>
                <label title="Good" htmlFor="star3">
                    <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 576 512" transform="rotate(180 0 0)">
                    <path
                        d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"
                    ></path>
                    </svg>
                </label>

                <input value={2} name="rate" id="star2" type="radio" onChange={(e) => setrating(Number(e.target.value))}/>
                <label title="Okay" htmlFor="star2">
                    <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 576 512" transform="rotate(180 0 0)">
                    <path
                        d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"
                    ></path>
                    </svg>
                </label>

                <input value={1} name="rate" id="star1" type="radio" onChange={(e) => setrating(Number(e.target.value))}/>
                <label title="Bad" htmlFor="star1">
                    <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 576 512" transform="rotate(180 0 0)">
                    <path
                        d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"
                    ></path>
                    </svg>
                </label>
            </div>

            <textarea className="reviewbox" name="review" rows={6} placeholder="Leave your feedback or comments here..." onChange={(e) => setreview(e.target.value)}></textarea>
            {error && <p className="errormsg">{error}</p>}
            <button className="ratesubmitbtn" onClick={submitrating}>Submit</button>
            
        </div>
    </>)
}
export default Orderratingpage;