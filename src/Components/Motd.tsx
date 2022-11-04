import React, { useEffect, useState } from "react";
import axios from "axios";
import unknownImg from "../imgs/scary-face-minimalism-dark-smile-unknown-artist-hd-wallpaper-preview-removebg-preview.png";
import { Link } from "react-router-dom";

//? What is MOTD ? it means Movie of the day and it is a component which randomly choosing a movie for the user to watch .

export default function Motd() {
  const [allMovies, setAllMovies] = useState<[...string[]]>([]);
  const [motd, setMotd] = useState<any>(null);

  const getMovie = async function () {
    const apiKey = "f1aca93e54807386df3f6972a5c33b50";
    const top_rated = await axios.get(
      `https://api.themoviedb.org/3/movie/top_rated?api_key=${apiKey}&language=en-US&page=1`
    );
    const popular = await axios.get(
      `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=1`
    );

    setAllMovies([...top_rated.data.results, ...popular.data.results]);

    const randomMovie = Math.floor(Math.random() * allMovies.length);
    setMotd(allMovies[randomMovie]);
  };

  useEffect(() => {
    getMovie();
  }, []);

  let count = 0;
  // a function that randomizing the movies to a certain time .
  const randomizing = () => {
    const randomizeDuration = setInterval(() => {
      getMovie();
      if (count >= 40) clearInterval(randomizeDuration);
      count++;
    }, 100);
  };

  return (
    <div className="container-custom">
      <div className="d-flex justify-content-center text-center">
        <div>
          {motd ? (
            <>
              <Link to={`/movie-details/${motd.id}`}>
                <img
                  src={"https://image.tmdb.org/t/p/w500" + motd.poster_path}
                  alt={motd.title}
                  className="w-100 rounded-3"
                />
                <p>{motd.title}</p>
                <p>{motd.release_date}</p>
              </Link>
            </>
          ) : !motd ? (
            <>
              <img src={unknownImg} alt="unknown" />
              <p>??</p>
              <button
                className="btn btn-primary"
                onClick={() => {
                  randomizing();
                }}
              >
                Randomize
              </button>
            </>
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
