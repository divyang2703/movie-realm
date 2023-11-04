import { useEffect, useState } from "react";
import toast, { Toaster } from 'react-hot-toast';
import Img from "../../../components/lazyloadimage/Img";
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./Style.scss";
import useFetch from "../../../../src/hooks/useFetch";

const HeroBanner = () => {
  const [background, setBackground] = useState("");
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const { url } = useSelector((state) => state.home);
  const { data, loading } = useFetch("/movie/upcoming");

  useEffect(() => {
    const bg =
      url.backdrop +
      data?.results?.[Math.floor(Math.random() * 20)]?.backdrop_path;
    setBackground(bg);
  }, [data, url.backdrop]);

  
  const searchQueryHandler = (event) => {
    if (event.key === "Enter" && query.length > 0) {
      
      navigate(`/search/${query}`);
    }
  };
  const searchButtonHandler = () => {
    if (query.length > 0){
        navigate(`/search/${query}`);
    }else{
       toast.error('Please enter a search query');
    }
        
}

  return (
    <div className="heroBanner">
    {!loading && (
        <div className="backdrop-img">
            <Img src={background} />
        </div>
    )}

    <div className="opacity-layer"></div>
    <ContentWrapper>
        <div className="heroBannerContent">
            <span className="title">Welcome</span>
            <span className="subTitle">
                Millions of movies, TV shows and people to discover. Explore now.
            </span>
            <div className="searchInput">
                <input
                    type="text"
                    placeholder="Search for a movie or tv show...."
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyUp={searchQueryHandler}
                />
                <button onClick={searchButtonHandler}>Search</button>
                <Toaster onClick={searchButtonHandler} />
            </div>
        </div>
    </ContentWrapper>
</div>
  );
};

export default HeroBanner;
