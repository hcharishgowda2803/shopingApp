import './SearchBar.css';
import { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';

import search from './Source/search.png';


const Searchbar = () => {

    // const navigate = useNavigate();

    const [boxboarder, setboxboarder] = useState<NodeListOf<HTMLFormElement>>();

    useEffect(() => {
        setboxboarder(document.querySelectorAll("#searchbar"));
    },[]);

    function boarderadd() {
        boxboarder?.forEach((eachboxboarder:HTMLFormElement) => {
            eachboxboarder!.style.outline = "2px solid #7527F5";
        })
    }

    function boarderremove() {
        boxboarder?.forEach((eachboxboarder:HTMLFormElement) => {
            eachboxboarder!.style.outline = "none";
        })
    }

    return (<>

    <div className="searchbarholder">
        <form className="searchbar" id="searchbar">
            <div className='searchlogoholder'>
                <img className="searchlogo" src={search}/>
            </div>
            <input className="searchbox" id="searchbox" type="search" onFocus={boarderadd} onBlur={boarderremove} placeholder="Search for food and restaurants"/>
        </form>
    </div>

    </>)
}
export default Searchbar;