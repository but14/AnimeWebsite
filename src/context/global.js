import React, {createContext, useContext, useReducer} from "react";

const GlobalContext = React.createContext();

const baseUrl = "https://api.jikan.moe/v4";

const LOADING = "LOADING";
const SEARCH = "SEARCH";
const GET_POPULAR_ANIME = "GET_POPULAR_ANIME";
const GET_UPCOMING_ANIME = "GET_UPCOMING_ANIME";
const GET_AIRING_ANIME = "GET_AIRING_ANIME";


const reducer = (state, action) => {
    return state;
}

export const GlobalContextProvider = ({children}) => {
    //intial state
    const intialState ={
        popularAnime : [],
        upcomingAnime : [],
        airingAnime: [],
        pictures: [],
        isSearch: false,
        searchResult: [],
        loading: false,
    }
    
    const [state, dispatch] = useReducer(reducer, intialState);

    const getPopularAnime = async()=>{
        dispatch({type: LOADING});
        const response = await fetch(`${baseUrl}/top/anime?filter=bypopularity`);
        const data = await response.json();
        dispatch({type: GET_POPULAR_ANIME, payload: data.data});
    }

    //initial render

    React.useEffect(() =>{
        getPopularAnime();
    }, [])


    return(
        <GlobalContext.Provider value={{
            ...state,
        }}>
            {children}
        </GlobalContext.Provider>
    )
}

export const useGlobalContext = ()=>{
    return useContext(GlobalContext); 
}