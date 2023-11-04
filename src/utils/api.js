import axios from "axios";

const BASE_URL = "https://api.themoviedb.org/3/";

const TMDB_TOKEN = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5MjE3Y2UzNTA4M2M2NzU0N2Y0M2Q5NThhYTQyNDYyOCIsInN1YiI6IjY1NDE0YmI1ZWVjNWI1MDEzYjIxYmFhOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.5x8cCEXdbsMdCwWI34rTWuUU3uE-8fJXabhhApz66eM"
// const TMDB_API = import.meta.env.VITE_TMDB_API;
const headers = {
    Authorization: "bearer " + TMDB_TOKEN,
    // Authorization: "Bearer " + TMDB_API,
};

export const fetchDataFromApi = async (url, params) => {
    try{
        const {data} = await axios.get(BASE_URL + url, {
            headers,
            params,
        });
        return data;

    }catch(error){
        console.log(error);
    }
}

