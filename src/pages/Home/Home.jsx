import "./Home.css";
import Navbar from "../../components/Navbar/Navbar";
import play_icon from '../../assets/play_icon.png'
import info_icon from '../../assets/info_icon.png'
import TitleCards from "../../components/TitleCards/TitleCards";
import Footer from "../../components/Footer/Footer";
import { useEffect, useState } from "react";

const Home = () => {
  const [bannerData, setBannerData] = useState(null);

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmNDgyNjU1NmY5MzYyZjlkYWE2OTA3MTAyODAzOGM4NCIsIm5iZiI6MTc2ODE3MDM3MS40MDgsInN1YiI6IjY5NjQyMzgzY2RmZWI3NDE5OWRiMWRiOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.c9gEdlTe0ut1TTHsTes4_vt8t-NTqaJF-Iy8ahcIQ8I",
    },
  };

  useEffect(() => {
    // Fetch trending movies for the landing banner
    fetch("https://api.themoviedb.org/3/trending/movie/day?language=en-US", options)
      .then((res) => res.json())
      .then((data) => {
        if (data.results && data.results.length > 0) {
          // Select a random movie from top 5 trending
          const randomIndex = Math.floor(Math.random() * Math.min(5, data.results.length));
          setBannerData(data.results[randomIndex]);
        }
      })
      .catch((err) => console.error("Error fetching banner data:", err));
  }, []);

  return (
    <div className="home">
      <Navbar />
      <div className="landing">
        {bannerData ? (
          <img
            src={`https://image.tmdb.org/t/p/original${bannerData.backdrop_path}`}
            alt={bannerData.title}
            className="banner__img"
          />
        ) : (
          <div className="banner__placeholder"></div>
        )}
        <div className="landing__caption">
          <h1 className="banner__title">{bannerData?.title || "Loading..."}</h1>
          <p>{bannerData?.overview || "Discover the latest trending movies..."}</p>
          <div className="landing__btns">
            <button className="btn"><img src={play_icon} alt="" />Play</button>
            <button className="btn dark-btn"><img src={info_icon} alt="" />More Info</button>
          </div>
          <TitleCards />
        </div>
      </div>
      <div className="more__cards">
        <TitleCards title={"Blockbuster Movies"} category={"top_rated"} />
        <TitleCards title={"Only on Netflix"} category={"popular"} />
        <TitleCards title={"Upcoming"} category={"upcoming"} />
        <TitleCards title={"Top Picks for You"} category={"now_playing"} />
      </div>
      <Footer />
    </div>
  );
};

export default Home;
