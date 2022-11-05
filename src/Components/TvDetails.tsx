import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

interface TvDetail {
  backdrop_path: string;
  poster_path: string;
  name: string;
  last_air_date: string;
  vote_average: number;
  original_language: string;
  overview: string;
  genres: string | any;
}

export default function TvDetails() {
  // a param that getting the id url after the component url .
  const params = useParams();

  // an object that contains the series details .
  const [tvDetails, setTvDetails] = useState<TvDetail | null>(null);

  // Getting the movie details from the server by passing it the id of the tv series which we've got it from the userParams function .
  const getTvDetails = async function (id: string | undefined): Promise<void> {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/tv/${id}?api_key=f1aca93e54807386df3f6972a5c33b50&language=en-US`
    );
    setTvDetails(data);
  };

  // calling the async function in component did mount whenever the component renders .
  useEffect(() => {
    getTvDetails(params.id);
  }, []);

  return (
    <>
      {tvDetails ? (
        <section>
          <div className="cover-image">
            <div className="layer">
              <img
                src={`https://image.tmdb.org/t/p/w500${tvDetails.backdrop_path}`}
                alt=""
                className="w-100 backdrop"
              />
              <div className="movie-details">
                <div className="container-custom">
                  <div className="row align-items-center">
                    <div className="col-md-2">
                      <img
                        src={`https://image.tmdb.org/t/p/w500${tvDetails.poster_path}`}
                        alt=""
                        className="w-100 rounded-3 poster-path"
                      />
                    </div>
                    <div className="col-md-10 movie-desc">
                      <h3>{tvDetails.name}</h3>
                      <div className="d-flex">
                        <h5 className="bg-primary me-4 p-2 rounded-3">
                          {tvDetails.genres[0].name}
                        </h5>
                        {tvDetails.genres[1] ? (
                          <h5 className="bg-primary p-2 rounded-3">
                            {tvDetails.genres[1].name}
                          </h5>
                        ) : (
                          ""
                        )}
                      </div>
                      <div className="row mt-4">
                        <div className="col-4 col-md-3 me-md-3">
                          <h3>
                            <i className="fa-regular fa-calendar me-2"></i>
                            {new Date(tvDetails.last_air_date).getFullYear()}
                          </h3>
                        </div>
                        <div className="col-4 col-md-2">
                          <h3>
                            <i className="fa-brands fa-imdb p-0 me-2  bg-warning text-black"></i>
                            {tvDetails.vote_average.toFixed(1)}
                          </h3>
                        </div>
                        <div className="col-4 col-md-2">
                          <h3>
                            <i className="fa-solid fa-globe text-secondary me-2"></i>
                            {tvDetails.original_language}
                          </h3>
                        </div>
                      </div>
                      <p className="w-75 mt-md-2 mt-4">{tvDetails.overview}</p>
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
