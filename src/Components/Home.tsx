import React, { useContext } from "react";
import nullImg from "../imgs/no-image-available-icon-photo-camera-flat-vector-illustration-132483141.jpg";
import { Link } from "react-router-dom";
import { NoxeContext } from "./Context/Store";

interface TvTypes {
  id: string;
  title: string;
  backdrop_path: string;
  poster_path: string;
  release_date: string;
  vote_average: number;
  original_language: string;
  overview: string;
  name: string;
  profile_path: string;
}

export default function Home() {
  // lifting the arrays up to show data in the homepage .
  const { trendingMovies, trendingSeries, trendingPeople } =
    useContext(NoxeContext);

  return (
    <main id="home">
      <div className="container-custom">
        <div className="row justify-content-center gy-5">
          <div className="col-md-4 d-flex align-items-center">
            <div className="movies-title">
              <h2 className="mb-4">
                Trending <br /> Movies <br /> to watch now
              </h2>
              <p className="text-secondary">Most watched movies by day</p>
            </div>
          </div>
          {trendingMovies.map((movie: TvTypes, i: number) => (
            <div key={i} className="movie col-md-2">
              <Link to={`/movie-details/${movie.id}`}>
                <div className="position-relative">
                  {movie.vote_average < 6 ? (
                    <p className="position-absolute top-0 end-0 bg-danger p-2">
                      {movie.vote_average.toFixed(1)}
                    </p>
                  ) : movie.vote_average >= 6 && movie.vote_average < 7 ? (
                    <p className="position-absolute top-0 end-0 bg-warning p-2">
                      {movie.vote_average.toFixed(1)}
                    </p>
                  ) : movie.vote_average >= 7 ? (
                    <p className="position-absolute top-0 end-0 bg-success p-2">
                      {movie.vote_average.toFixed(1)}
                    </p>
                  ) : (
                    ""
                  )}
                  <img
                    src={"https://image.tmdb.org/t/p/w500" + movie.poster_path}
                    alt=""
                    className="w-100 rounded-2"
                  />
                </div>
              </Link>
              <p className="mt-3">{movie.title}</p>
            </div>
          ))}
        </div>

        <div className="row gy-5 mt-5 pt-5 ">
          <div className="col-md-4 d-flex align-items-center">
            <div className="movies-title">
              <h2 className="mb-4">
                Trending <br /> Tv <br /> to watch now
              </h2>
              <p className="text-secondary">Most watched tv series by day</p>
            </div>
          </div>

          {trendingSeries.map((series: TvTypes, i: number) => (
            <div key={i} className="movie col-md-2">
              <Link to={`/tv-details/${series.id}`}>
                <div className="position-relative">
                  {series.vote_average < 6 ? (
                    <p className="position-absolute top-0 end-0 bg-danger p-2">
                      {series.vote_average.toFixed(1)}
                    </p>
                  ) : series.vote_average >= 6 && series.vote_average < 7 ? (
                    <p className="position-absolute top-0 end-0 bg-warning p-2">
                      {series.vote_average.toFixed(1)}
                    </p>
                  ) : series.vote_average >= 7 ? (
                    <p className="position-absolute top-0 end-0 bg-success p-2">
                      {series.vote_average.toFixed(1)}
                    </p>
                  ) : (
                    ""
                  )}
                  <img
                    src={"https://image.tmdb.org/t/p/w500" + series.poster_path}
                    alt=""
                    className="w-100 rounded-2"
                  />
                </div>
                <p className="mt-3">{series.name}</p>
              </Link>
            </div>
          ))}
        </div>

        <div className="row gy-5 mt-5 pt-5 ">
          <div className="col-md-4 d-flex align-items-center">
            <div className="movies-title">
              <h2 className="mb-4">
                Trending <br /> People <br />
              </h2>
              <p className="text-secondary">Actors of the month</p>
            </div>
          </div>
          {trendingPeople.map((person: TvTypes, i: number) => (
            <div key={i} className="movie col-md-2">
              <div className="position-relative">
                {person.vote_average < 6 ? (
                  <p className="position-absolute top-0 end-0 bg-danger p-2">
                    {person.vote_average.toFixed(1)}
                  </p>
                ) : person.vote_average >= 6 && person.vote_average < 7 ? (
                  <p className="position-absolute top-0 end-0 bg-warning p-2">
                    {person.vote_average.toFixed(1)}
                  </p>
                ) : person.vote_average >= 7 ? (
                  <p className="position-absolute top-0 end-0 bg-success p-2">
                    {person.vote_average.toFixed(1)}
                  </p>
                ) : (
                  ""
                )}
                {person.profile_path === null ? (
                  <img
                    src={nullImg}
                    alt=""
                    className="w-100 rounded-2 null-img"
                  />
                ) : (
                  <img
                    src={
                      "https://image.tmdb.org/t/p/w500" + person.profile_path
                    }
                    alt=""
                    className="w-100 rounded-2"
                  />
                )}
              </div>
              <p className="mt-3">{person.name}</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
