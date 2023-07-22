import axios from "axios";
import { useEffect, useState } from "react";
import { BACKEND_BASE_URL } from "../utils/constants";
import { Link } from "react-router-dom";

const SearchResultComponent = () => {
    const [searchItems, setSearchItems] = useState([]);
    const [searchInput, setSearchInput] = useState('');
    const [isFocused, setIsFocused] = useState(false);

    useEffect(() => {
        const getData = setTimeout(getSearchResults, 500);
        return () => clearTimeout(getData);
    }, [searchInput])
    
    function setFocused() {
        setIsFocused(true);
    }

    function unSetFocused() {
        setIsFocused(false);
    }

    async function getSearchResults() {
        try {
            const response = await axios({
                method: 'GET',
                url: `${BACKEND_BASE_URL}/productsByName?productName=${searchInput}`,
            })
            setSearchItems(response?.data?.data);
        }
        catch(error) {
            console.log(error);
            console.log("Something went wrong in SearchResult Component(Couldn't fetch search results");
        }
    }

    function searchHandler(event) {
        try {
            event.preventDefault();
            setSearchInput(event.target.value);
        }
        catch(error) {
            console.log(error);
            console.log("Something went wrong in SearchResult Component");
        }
    }

    return (
        <div onMouseLeave = {unSetFocused} onChange = {setFocused} onClick = {setFocused} className = "h-full">
            <div className = "h-full">
                <input type="search" className = "border-x px-2 w-full h-full outline-none" 
                placeholder = "Search.." onChange = {searchHandler}/>
            </div>
            <div>
                {
                    searchItems && isFocused &&
                    <ul className = "rounded-md shadow-md bg-white text-emerald-700 relative z-20">
                        {
                            searchItems.map((item) => {
                                return ( 
                                    <Link to = {`/products/${item.id}`} key = {item.id}>
                                        <li className = "px-1 border-x w-full border-t py-1 hover:text-white hover:bg-emerald-700 hover:cursor-pointer">{item.name}</li>
                                    </Link>
                                );
                            })
                        }
                    </ul>
                }
            </div>
        </div>
    );
}

export default SearchResultComponent;