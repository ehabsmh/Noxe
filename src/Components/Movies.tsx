import React, { useContext, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { NoxeContext } from "./Context/Store";
import MoviesSidebar from "./Sidebar/MoviesSidebar";

interface MovModel {
  id: string;
  title: string;
  backdrop_path: string;
  poster_path: string;
  release_date: string;
  vote_average: number;
  original_language: string;
  bookmarked?: boolean;
  overview: string;
  genres: string | any;
}

const Movies = () => {
  const context = useContext(NoxeContext);

  // bookmark icon Ref
  const bookMarkIcon = useRef<HTMLElement | null>(null);

  /*  component did mount here is to check if the user already has a localStorage or not, 
  if he has then get the saved data for him, if not then create a new array to start saving the data .
  */
  useEffect(() => {
    context.getData(context.currPage, context.setAllMovies, "movie");
  }, []);


  return (
    <>
      <MoviesSidebar
        getMovieGenres={context.getGenres}
        getMovieCategories={context.getCategories}
      />
      <main>
        <div className="container-custom">
          <div className="mb-5 mt-5 w-50 m-auto search_input--container">
            <input
              type="search"
              ref={context.searchInput}
              onChange={() => {
                context.userSearch(context.searchInput.current?.value, "movie");
              }}
              className="form-control "
              id="exampleFormControlInput1"
              placeholder="Search by movie name"
            />
          </div>

          {context.searchInput.current?.value ? (
            <div className="row justify-content-center justify-content-md-start gy-5">
              {context.searchResult.map((movie: MovModel, i: number) => (
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
                        src={
                          "https://image.tmdb.org/t/p/w500" + movie.poster_path
                        }
                        alt=""
                        className="w-100 rounded-2"
                      />
                    </div>
                  </Link>
                  <p className="mt-3">{movie.title}</p>
                </div>
              ))}
            </div>
          ) : !context.searchInput.current?.value ? (
            <>
              <div className="row justify-content-center justify-content-md-start gy-5">
                {context.allMovies.map((movie: MovModel, i: number) => (
                  <div key={i} className="movie col-md-2">
                    <div className="position-relative">
                      <div
                        className="bookmark position-absolute start-0 bottom-0 bg-dark d-flex justify-content-center align-items-center"
                        onClick={(e: any) => {
                          if (movie.bookmarked) {
                            e.target.classList.replace(
                              "fa-regular",
                              "fa-solid"
                            );
                            e.target.classList.add("text-warning");
                          }
                          context.addToFavorite(movie);
                        }}
                      >
                        <i
                          className={`${movie.bookmarked ? "fa-solid" : "fa-regular"} fa-bookmark fa-2x`}
                          ref={bookMarkIcon}
                        ></i>
                      </div>
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
                      <Link to={`/movie-details/${movie.id}`}>
                        <img
                          src={
                            "https://image.tmdb.org/t/p/w500" +
                            movie.poster_path
                          }
                          alt=""
                          className="w-100 rounded-2"
                        />
                      </Link>
                    </div>
                    <p className="mt-3">{movie.title}</p>
                  </div>
                ))}
              </div>
              <nav aria-label="Page  navigation example">
                <ul className="pagination justify-content-center">
                  <li
                    className="page-item disabled prevBtn"
                    ref={context.btnPrev}
                  >
                    <span
                      className="page-link cursor"
                      onClick={() => {
                        context.getData(
                          context.currPage - 1,
                          context.setAllMovies,
                          "movie"
                        );
                      }}
                    >
                      Previous
                    </span>
                  </li>
                  <li className="page-item">
                    <p className="page-link text-black">{context.currPage}</p>
                  </li>
                  <li className="page-item" ref={context.btnNext}>
                    <span
                      className="page-link cursor"
                      onClick={() => {
                        context.getData(
                          context.currPage + 1,
                          context.setAllMovies,
                          "movie"
                        );
                      }}
                    >
                      Next
                    </span>
                  </li>
                </ul>
              </nav>
            </>
          ) : (
            <div className="vh-100 d-flex align-items-center justify-content-center">
              <i className="fas fa-spinner fa-spin fa-3x"></i>
            </div>
          )}
        </div>
      </main>
    </>
  );
};
export default Movies;
