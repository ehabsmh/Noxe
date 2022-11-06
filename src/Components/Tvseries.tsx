import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { NoxeContext } from "./Context/Store";
import TvSidebar from "./Sidebar/TvSidebar";

interface MovModel {
  id: string;
  name: string;
  backdrop_path: string;
  poster_path: string;
  release_date: string;
  vote_average: number;
  original_language: string;
  bookmarked?: boolean;
  overview: string;
  genres: string;
}

export default function TvSeries() {
  const context = useContext(NoxeContext);

  useEffect(() => {
    context.getData(context.currPage, context.setAllTv, "tv");
  }, []);

  return (
    <>
      <TvSidebar
        getTvGenres={context.getGenres}
        getTvCategories={context.getCategories}
      />
      <main>
        <div className="container-custom">
          <div className="mb-5 mt-5 w-50 m-auto search_input--container">
            <input
              type="search"
              ref={context.searchInput}
              onInput={() => {
                context.userSearch(context.searchInput.current?.value, "tv");
              }}
              className="form-control test"
              id="exampleFormControlInput1"
              placeholder="Search tv name"
            />
          </div>

          {context.searchInput.current?.value ? (
            <div className="row justify-content-center justify-content-md-start gy-5">
              {context.searchResult.map((tv: MovModel, i: number) => (
                <div key={i} className="movie col-md-2">
                  <Link to={`/tv-details/${tv.id}`}>
                    <div className="position-relative">
                      {tv.vote_average < 6 ? (
                        <p className="position-absolute top-0 end-0 bg-danger p-2">
                          {tv.vote_average.toFixed(1)}
                        </p>
                      ) : tv.vote_average >= 6 && tv.vote_average < 7 ? (
                        <p className="position-absolute top-0 end-0 bg-warning p-2">
                          {tv.vote_average.toFixed(1)}
                        </p>
                      ) : tv.vote_average >= 7 ? (
                        <p className="position-absolute top-0 end-0 bg-success p-2">
                          {tv.vote_average.toFixed(1)}
                        </p>
                      ) : (
                        ""
                      )}
                      <img
                        src={"https://image.tmdb.org/t/p/w500" + tv.poster_path}
                        alt=""
                        className="w-100 rounded-2"
                      />
                    </div>
                  </Link>
                  <p className="mt-3">{tv.name}</p>
                </div>
              ))}
            </div>
          ) : !context.searchInput.current?.value ? (
            <>
              <div className="row justify-content-center justify-content-md-start gy-5">
                {context.allTv.map((tv: MovModel, i: number) => (
                  <div key={i} className="movie col-md-2">
                    <div className="position-relative">
                      <div className="bookmark position-absolute start-0 bottom-0 bg-dark d-flex justify-content-center align-items-center">
                        <i
                          onClick={() => context.addToFavorite(tv)}
                          className={`${
                            tv.bookmarked
                              ? "fa-solid text-warning"
                              : "fa-regular"
                          } fa-bookmark fa-2x`}
                        ></i>
                      </div>

                      {tv.vote_average < 6 ? (
                        <p className="position-absolute top-0 end-0 bg-danger p-2">
                          {tv.vote_average.toFixed(1)}
                        </p>
                      ) : tv.vote_average >= 6 && tv.vote_average < 7 ? (
                        <p className="position-absolute top-0 end-0 bg-warning p-2">
                          {tv.vote_average.toFixed(1)}
                        </p>
                      ) : tv.vote_average >= 7 ? (
                        <p className="position-absolute top-0 end-0 bg-success p-2">
                          {tv.vote_average.toFixed(1)}
                        </p>
                      ) : (
                        ""
                      )}
                      <Link to={`/tv-details/${tv.id}`}>
                        <img
                          src={
                            "https://image.tmdb.org/t/p/w500" + tv.poster_path
                          }
                          alt=""
                          className="w-100 rounded-2"
                        />
                      </Link>
                    </div>
                    <p className="mt-3">{tv.name}</p>
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
                          context.setAllTv,
                          "tv"
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
                          context.setAllTv,
                          "tv"
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
}
