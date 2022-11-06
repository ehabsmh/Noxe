import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

interface MovieDetailsType {
  title: string;
  backdrop_path: string;
  poster_path: string;
  release_date: string;
  vote_average: number;
  original_language: string;
  overview: string;
  genres: string | any;
}

export default function MovieDetails() {
  // a param that getting the id url after the component url .
  const params = useParams();

  // an object that contains the movie details .
  const [movieDetails, setMovieDetails] = useState<MovieDetailsType | null>(
    null
  );

  // Getting the movie details from the server by passing it the id of the movie which we've got it from the userParams function .
  const getMovieDetails = async function (
    id: string | undefined
  ): Promise<void> {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/movie/${id}?api_key=f1aca93e54807386df3f6972a5c33b50&language=en-US`
    );
    setMovieDetails(data);
  };

  // calling the async function in component did mount whenever the component renders .
  useEffect(() => {
    getMovieDetails(params.id);
  }, []);

  return (
    <>
      {movieDetails ? (
        <section id="movieDetails">
          <div className="cover-image">
            <div className="layer">
              <img
                src={`https://image.tmdb.org/t/p/w500${movieDetails.backdrop_path}`}
                alt="Movie backdrop"
                className="w-100 backdrop"
              />
              <div className="movie-details">
                <div className="container-custom">
                  <div className="row align-items-center">
                    <div className="col-md-2">
                      <img
                        src={`https://image.tmdb.org/t/p/w500${movieDetails.poster_path}`}
                        alt="Movie poster"
                        className="w-100 rounded-3 poster-path"
                      />
                    </div>
                    <div className="col-md-10 movie-desc">
                      <h3>{movieDetails.title}</h3>
                      <div className="d-flex">
                        <h5 className="bg-primary me-4 p-2 rounded-3">
                          {movieDetails.genres[0].name}
                        </h5>
                        {movieDetails.genres[1] ? (
                          <h5 className="bg-primary p-2 rounded-3">
                            {movieDetails.genres[1].name}
                          </h5>
                        ) : (
                          ""
                        )}
                      </div>
                      <div className="row mt-4">
                        <div className="col-4 col-md-3 me-md-3">
                          <h3>
                            <i className="fa-regular fa-calendar me-2"></i>
                            {new Date(movieDetails.release_date).getFullYear()}
                          </h3>
                        </div>
                        <div className="col-4 col-md-2">
                          <h3>
                            <i className="fa-brands fa-imdb p-0 me-2  bg-warning text-black"></i>
                            {movieDetails.vote_average.toFixed(1)}
                          </h3>
                        </div>
                        <div className="col-4 col-md-2">
                          <h3>
                            <i className="fa-solid fa-globe text-secondary me-2"></i>
                            {movieDetails.original_language}
                          </h3>
                        </div>
                      </div>
                      <p className="w-75 mt-md-2 mt-4">
                        {movieDetails.overview}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      ) : (
        <div className="vh-100 d-flex align-items-center justify-content-center">
          <i className="fas fa-spinner fa-spin fa-3x"></i>
        </div>
      )}
    </>
  );
}
