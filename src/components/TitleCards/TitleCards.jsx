import { useEffect, useRef, useState } from "react";
import "./TitleCards.css";
import { Link } from 'react-router-dom'

const TitleCards = ({ title, category }) => {
  const [apiData, setApiData] = useState([]);
  const cardsRef = useRef();

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmNDgyNjU1NmY5MzYyZjlkYWE2OTA3MTAyODAzOGM4NCIsIm5iZiI6MTc2ODE3MDM3MS40MDgsInN1YiI6IjY5NjQyMzgzY2RmZWI3NDE5OWRiMWRiOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.c9gEdlTe0ut1TTHsTes4_vt8t-NTqaJF-Iy8ahcIQ8I",
    },
  };

  const handleWheel = (event) => {
    event.preventDefault();
    cardsRef.current.scrollLeft += event.deltaY;
  };

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/movie/${
        category ? category : "now_playing"
      }?language=en-US&page=1`,
      options
    )
      .then((res) => res.json())
      .then((res) => setApiData(res.results))
      .catch((err) => console.error(err));

    cardsRef.current.addEventListener("wheel", handleWheel);
  }, []);

  return (
    <div className="title__cards">
      <h2>{title ? title : "Popular on Netflix"}</h2>
      <div className="card__list" ref={cardsRef}>
        {apiData.map((card, index) => {
          return (
            <Link to={`/player/${card.id}`} className="card" key={index}>
              <img
                src={`https://image.tmdb.org/t/p/w500` + card.backdrop_path}
                alt=""
              />
              <p>{card.original_title}</p>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default TitleCards;
