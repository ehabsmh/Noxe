import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

//? What is MOTD ? ( Movie of the day ) and it is a component which randomly suggest a top rated or popular movie for the user to watch .

export default function Motd() {
  // an array to gather all the data inside it .. then randomly choose a movie in an object .
  const [allMovies, setAllMovies] = useState<[...string[]]>([]);
  const [motd, setMotd] = useState<any>(null);

  const getMovie = async function () {
    const apiKey = "f1aca93e54807386df3f6972a5c33b50";
    const randomMovie = Math.floor(Math.random() * 4) + 1;
    const top_rated = await axios.get(
      `https://api.themoviedb.org/3/movie/top_rated?api_key=${apiKey}&language=en-US&page=${randomMovie}`
    );
    const popular = await axios.get(
      `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=${randomMovie}`
    );

    setAllMovies(
      [...top_rated.data.results, ...popular.data.results].filter(
        (mov) => mov.release_date >= "2015"
      )
    );
    getRandomMovie();
  };

  function getRandomMovie() {
    const randomMovie = Math.floor(Math.random() * allMovies.length);
    setMotd(allMovies[randomMovie]);
  }

  useEffect(() => {
    getMovie();
  }, []);

  // a function that handle the randomizing action for a certain time .
  const randomSelectionInterval = () => {
    let count = 0;
    const durationOfRandomizing = setInterval(() => {
      getMovie();
      if (count === 80) clearInterval(durationOfRandomizing);
      count++;
    }, 50);
  };

  return (
    <div className="container-custom">
      <div className="d-flex justify-content-center text-center">
        <div>
          {motd ? (
            <div>
              <Link to={`/movie-details/${motd.id}`}>
                <img
                  src={"https://image.tmdb.org/t/p/w500" + motd.poster_path}
                  alt={motd.title}
                  className="w-100 rounded-3"
                />
                <p>{motd.title}</p>
                <p>{motd.release_date}</p>
              </Link>
            </div>
          ) : !motd ? (
            <div className="box-icon d-flex justify-content-center align-items-center vh-100">
              <div>
                <i className="fa-solid fa-shuffle fa-bounce w-75 h-100"></i>
                {/* <p>??</p> */}
                <button
                  className="btn btn-primary"
                  onClick={() => {
                    randomSelectionInterval();
                  }}
                >
                  Randomize
                </button>
              </div>
            </div>
          ) : (
            <div className="vh-100 d-flex align-items-center justify-content-center">
              <i className="fas fa-spinner fa-spin fa-3x"></i>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
